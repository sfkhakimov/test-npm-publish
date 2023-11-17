import { ComponentPadding, PopperRectType } from '../components/Voyager'
import { RectResult } from '../utils'
import { debounce, isArray } from 'lodash'
import { useCallback, useEffect } from 'react'

type ScrollOptionsType = {
    padding?: ComponentPadding
} & ScrollIntoViewOptions

type Args = {
    scrollOptions: ScrollOptionsType
    popperRect: PopperRectType
    sizes: RectResult
}

const DEFAULT_INDENT = 10

// TODO добавить проверку что если элемент имееет fixed то скролл не делать
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

                const { padding = [0, 0], ...other } = scrollOptions

                const [px, py] = isArray(padding) ? padding : [padding, padding]

                window.scrollTo({
                    top: top - py - DEFAULT_INDENT,
                    left: left - px - DEFAULT_INDENT,
                    ...other,
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
