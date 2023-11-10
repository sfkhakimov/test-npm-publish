import { PopperRectType } from '../components/Tour'
import { RectResult, smoothScroll } from '../utils'
import { ScrollOptionsType } from '../utils/smoothScroll'
import { debounce } from 'lodash'
import { useCallback, useEffect } from 'react'

type Args = {
    scrollOptions: ScrollOptionsType
    popoverRect: PopperRectType
    sizes: RectResult
}

export const useScroll = ({ scrollOptions, popoverRect, sizes }: Args) => {
    const debounceScrollToElem = useCallback(
        debounce(
            ({
                scrollOptions,
                sizes,
                popoverRect,
            }: {
                popoverRect: PopperRectType
                sizes: RectResult
                scrollOptions: ScrollOptionsType
            }) => {
                const { top, left, right, bottom } = {
                    top: Math.min(popoverRect.top, sizes.top),
                    left: Math.min(popoverRect.left, sizes.left),
                    right: Math.max(popoverRect.right, sizes.right),
                    bottom: Math.max(popoverRect.bottom, sizes.bottom),
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
            popoverRect,
        })
    }, [
        scrollOptions,
        sizes.top,
        sizes.left,
        sizes.right,
        sizes.bottom,
        popoverRect.top,
        popoverRect.left,
        popoverRect.right,
        popoverRect.bottom,
        debounceScrollToElem,
    ])
}
