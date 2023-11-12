import { PopperRectType } from '../components/Guide'
import { RectResult, smoothScroll } from '../utils'
import { ScrollOptionsType } from '../utils/smoothScroll'
import { debounce } from 'lodash'
import { useCallback, useEffect } from 'react'

type Args = {
    scrollOptions: ScrollOptionsType
    popperRect: PopperRectType
    sizes: RectResult
}

export const useScroll = ({ scrollOptions, popperRect, sizes }: Args) => {
    const debounceScrollToElem = useCallback(
        debounce(
            ({
                scrollOptions,
                sizes,
                popperRect,
            }: {
                popperRect: PopperRectType
                sizes: RectResult
                scrollOptions: ScrollOptionsType
            }) => {
                const { top, left, right, bottom } = {
                    top: Math.min(popperRect.top, sizes.top),
                    left: Math.min(popperRect.left, sizes.left),
                    right: Math.max(popperRect.right, sizes.right),
                    bottom: Math.max(popperRect.bottom, sizes.bottom),
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
            sizes,
            popperRect,
        })
    }, [
        scrollOptions,
        sizes.top,
        sizes.left,
        sizes.right,
        sizes.bottom,
        popperRect.top,
        popperRect.left,
        popperRect.right,
        popperRect.bottom,
        debounceScrollToElem,
    ])
}
