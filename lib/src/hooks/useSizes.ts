import { StepType } from '../components/Voyager'
import { getRect, RectResult } from '../utils'
import useObserver from './useObserver'
import { useEffect, useCallback, useState, useRef } from 'react'

const initialState = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
}

type Args = {
    step: StepType
}

export const useSizes = ({ step }: Args) => {
    const [sizes, setSizes] = useState<RectResult>(initialState)

    const [target, setTarget] = useState(
        step?.selector ? document.querySelector(step.selector) : null
    )
    const [overlayHeight, setOverlayHeight] = useState(
        document.body.clientHeight
    )

    const targetRef = useRef<Element | null>(null)
    const stepRef = useRef(step)

    targetRef.current = target
    stepRef.current = step

    const updateSizes = useCallback(() => {
        const newSizes = getRect(targetRef.current)
        setSizes(newSizes)
    }, [])

    const overlayUpdate = useCallback(() => {
        setOverlayHeight((prev) => {
            const docHeight = document.body.clientHeight
            return docHeight !== prev ? docHeight : prev
        })
    }, [])

    useObserver({
        target,
        setTarget,
        domObserver: overlayUpdate,
        elObserver: updateSizes,
        stepRef,
    })

    useEffect(() => {
        if (!step?.selector) return
        setTarget(document.querySelector(step.selector))
    }, [step?.selector])

    useEffect(() => {
        window.addEventListener('resize', updateSizes)
        window.addEventListener('scroll', updateSizes)
        return () => {
            window.removeEventListener('resize', updateSizes)
            window.removeEventListener('scroll', updateSizes)
        }
    }, [updateSizes])

    useEffect(() => {
        if (!target) return
        target.addEventListener('transitionend', updateSizes)

        return () => {
            target.removeEventListener('transitionend', updateSizes)
        }
    }, [target, updateSizes])

    return {
        sizes,
        target,
        targetRef,
        overlayHeight,
    }
}
