import { ComponentPadding, PopperRectType } from '../components/Voyager'
import { RectResult } from '../utils'
import { debounce, isArray } from 'lodash'
import { useCallback, useEffect } from 'react'
import { VoyagerStatusesEnum } from '../constants/constants'

type ScrollOptionsType = {
    padding?: ComponentPadding
} & ScrollIntoViewOptions

type Args = {
    scrollOptions: ScrollOptionsType
    popperRect: PopperRectType
    sizes: RectResult
    status: VoyagerStatusesEnum
}

const DEFAULT_INDENT = 10

export const useScroll = ({
    scrollOptions,
    popperRect,
    sizes,
    status,
}: Args) => {
    const debounceScrollToElem = useCallback(
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
        []
    )

    useEffect(() => {
        if (status !== VoyagerStatusesEnum.Active) return

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
        status,
    ])
}
