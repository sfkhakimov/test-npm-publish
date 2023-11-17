import { getDocumentSizes, RectResult, getPadding } from '../../utils'
import { ComponentPadding } from '../Voyager'
import { VoyagerPopperPlacement } from './types'
import { calculatePopperPosition } from './utils'
import { useState, useEffect, RefObject } from 'react'

type UsePopperArgs = {
    target: Element | null
    popperRef: RefObject<HTMLDivElement | null>
    placement: VoyagerPopperPlacement
    popperPadding: number | [number, number]
    sizes: RectResult
    maskPadding?: ComponentPadding
}
export const usePopper = ({
    target,
    popperRef,
    placement = 'bottom',
    popperPadding,
    sizes,
    maskPadding,
}: UsePopperArgs) => {
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })
    const [popperPlacement, setPopperPlacement] =
        useState<VoyagerPopperPlacement>(placement)

    const popperSizes = {
        width: popperRef.current?.clientWidth || 0,
        height: popperRef.current?.clientHeight || 0,
    }

    useEffect(() => {
        const styles = target && window.getComputedStyle(target)
        const pos = styles?.getPropertyValue('position')

        const windowSize =
            pos === 'fixed'
                ? {
                      width: window.innerWidth + window.scrollX,
                      height: window.innerHeight + window.scrollY,
                  }
                : getDocumentSizes()

        const { coordinates: newCoordinates, placement: newPlacement } =
            calculatePopperPosition({
                sizes,
                popperSizes,
                windowSize,
                placement,
                popperPadding: getPadding(popperPadding),
                maskPadding: getPadding(maskPadding),
            })

        setCoordinates(newCoordinates)
        setPopperPlacement(newPlacement)
    }, [
        sizes.width,
        sizes.height,
        sizes.top,
        sizes.bottom,
        sizes.left,
        sizes.right,
        popperSizes.width,
        popperSizes.height,
        placement,
        maskPadding,
    ])

    return { coordinates, placement: popperPlacement }
}
