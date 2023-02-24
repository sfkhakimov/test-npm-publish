import { smoothScroll, getWindow, getRect, RectResult } from '../../utils'
import { ComponentPadding, PopoverRectType, StepType } from '../types'
import { debounce } from 'lodash'
import { useEffect, useCallback, useState, useRef } from 'react'

const initialState = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    windowWidth: 0,
    windowHeight: 0,
    x: 0,
    y: 0,
}

type ScrollLogicalPosition = 'center' | 'end' | 'nearest' | 'start'
type ScrollBehavior = 'auto' | 'smooth'

type ScrollIntoViewOptions = {
    behavior?: ScrollBehavior
    block?: ScrollLogicalPosition
    inline?: ScrollLogicalPosition
}

export type ScrollOptionsType = {
    padding?: ComponentPadding
} & ScrollIntoViewOptions

type Args = {
    step: StepType
    scrollOptions: ScrollOptionsType
    popoverRect: PopoverRectType
}

export function useSizes({
    step,
    scrollOptions = {
        block: 'start',
        behavior: 'smooth',
    },
    popoverRect,
}: Args) {
    const [dimensions, setDimensions] = useState<RectResult>(initialState)

    const [target, setTarget] = useState(
        step?.selector instanceof Element
            ? step?.selector
            : document.querySelector(step?.selector)
    )

    const targetRef = useRef<Element | null>(null)
    const dimensionsRef = useRef<RectResult>(initialState)

    useEffect(() => {
        setTarget(
            step?.selector instanceof Element
                ? step?.selector
                : document.querySelector(step?.selector)
        )
    }, [step?.selector])

    useEffect(() => {
        targetRef.current = target
    }, [target])

    useEffect(() => {
        dimensionsRef.current = dimensions
    }, [dimensions])

    const handleResize = useCallback(() => {
        const { hasHighligtedElems, ...newDimensions } = getHighlightedRect(
            targetRef.current,
            step?.highlightedSelectors,
            step?.bypassElem
        )

        if (
            Object.entries(dimensionsRef.current).some(
                ([key, value]) =>
                    newDimensions[key as keyof typeof initialState] !== value
            )
        ) {
            setDimensions(newDimensions)
        }
    }, [step?.highlightedSelectors, step?.bypassElem])

    useEffect(() => {
        handleResize()

        window.addEventListener('resize', handleResize)
        window.addEventListener('scroll', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
            window.removeEventListener('scroll', handleResize)
        }
    }, [target, step?.highlightedSelectors])

    const debounceScrollToElem = useCallback(
        debounce(
            ({
                scrollOptions,
                dimensions,
                popoverRect,
            }: {
                popoverRect: PopoverRectType
                dimensions: RectResult
                scrollOptions: ScrollOptionsType
            }) => {
                const { top, left, right, bottom } = {
                    top: Math.min(popoverRect.top, dimensions.top),
                    left: Math.min(popoverRect.left, dimensions.left),
                    right: Math.max(popoverRect.right, dimensions.right),
                    bottom: Math.max(popoverRect.bottom, dimensions.bottom),
                }

                void smoothScroll({
                    options: scrollOptions,
                    top,
                    left,
                    right,
                    bottom,
                })
            },
            100
        ),
        []
    )

    useEffect(() => {
        debounceScrollToElem({
            scrollOptions,
            dimensions,
            popoverRect,
        })
    }, [
        scrollOptions,
        target,
        dimensions.top,
        dimensions.left,
        dimensions.right,
        dimensions.bottom,
        popoverRect.top,
        popoverRect.left,
        popoverRect.right,
        popoverRect.bottom,
        debounceScrollToElem,
    ])

    const observableRefresher = useCallback(() => {
        const { hasHighligtedElems, ...dimesions } = getHighlightedRect(
            targetRef.current,
            step?.highlightedSelectors,
            step?.bypassElem
        )
        setDimensions(dimesions)
    }, [step?.highlightedSelectors])

    useEffect(() => {
        if (!target) return
        target.addEventListener('transitionend', observableRefresher)

        return () => {
            target.removeEventListener('transitionend', observableRefresher)
        }
    }, [target, observableRefresher])

    return {
        sizes: dimensions,
        target,
        targetRef,
        observableRefresher,
        setTarget,
    }
}

function getHighlightedRect(
    node: Element | null,
    highlightedSelectors: string[] = [],
    bypassElem = true
) {
    let hasHighligtedElems = false
    const { w: windowWidth, h: windowHeight } = getWindow()

    const attrs = getRect(node)
    const altAttrs = {
        bottom: 0,
        height: 0,
        left: windowWidth,
        right: 0,
        top: windowHeight,
        width: 0,
    }

    for (const selector of highlightedSelectors) {
        const element = document.querySelector(selector) as HTMLElement
        if (
            !element ||
            element.style.display === 'none' ||
            element.style.visibility === 'hidden'
        ) {
            continue
        }

        const rect = getRect(element)
        hasHighligtedElems = true
        if (bypassElem || !node) {
            if (rect.top < altAttrs.top) {
                altAttrs.top = rect.top
            }

            if (rect.right > altAttrs.right) {
                altAttrs.right = rect.right
            }

            if (rect.bottom > altAttrs.bottom) {
                altAttrs.bottom = rect.bottom
            }

            if (rect.left < altAttrs.left) {
                altAttrs.left = rect.left
            }

            altAttrs.width = altAttrs.right - altAttrs.left
            altAttrs.height = altAttrs.bottom - altAttrs.top
        } else {
            if (rect.top < attrs.top) {
                attrs.top = rect.top
            }

            if (rect.right > attrs.right) {
                attrs.right = rect.right
            }

            if (rect.bottom > attrs.bottom) {
                attrs.bottom = rect.bottom
            }

            if (rect.left < attrs.left) {
                attrs.left = rect.left
            }

            attrs.width = attrs.right - attrs.left
            attrs.height = attrs.bottom - attrs.top
        }
    }

    const bypassable =
        bypassElem || !node ? altAttrs.width > 0 && altAttrs.height > 0 : false

    return {
        left: (bypassable ? altAttrs : attrs).left,
        top: (bypassable ? altAttrs : attrs).top,
        right: (bypassable ? altAttrs : attrs).right,
        bottom: (bypassable ? altAttrs : attrs).bottom,
        width: (bypassable ? altAttrs : attrs).width,
        height: (bypassable ? altAttrs : attrs).height,
        windowWidth,
        windowHeight,
        hasHighligtedElems,
        x: attrs.x,
        y: attrs.y,
    }
}
