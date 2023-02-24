import { PopoverRectType } from '../tour/types'
import {
    isHoriz,
    bestPositionOf,
    isOutsideX,
    isOutsideY,
    PositionsObjectType,
    CoordsObjectType,
    CoordType,
    getWindow,
    getPadding,
    RectResult,
} from '../utils'
import { stylesMatcher } from './styles'
import React, {
    CSSProperties,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
} from 'react'

const Popover: React.FC<PopoverProps> = ({
    setPopoverRect,
    children,
    position = 'bottom',
    maskPadding = 0,
    popoverPadding = 16,
    styles = {},
    sizes,
    ...props
}) => {
    const helperRef = useRef<HTMLDivElement | null>(null)
    const positionRef = useRef('')
    const verticalAlignRef = useRef('')
    const horizontalAlignRef = useRef('')
    const { w: windowWidth, h: windowHeight } = getWindow()
    const getStyles = stylesMatcher()

    const { helperWidth, helperHeight } = {
        helperWidth: helperRef.current?.clientWidth || 0,
        helperHeight: helperRef.current?.clientHeight || 0,
    }

    const targetLeft = sizes?.left
    const targetTop = sizes?.top
    const targetRight = sizes?.right
    const targetBottom = sizes?.bottom

    const available: PositionsObjectType = {
        left: targetLeft,
        right: windowWidth - targetRight,
        top: targetTop,
        bottom: windowHeight - targetBottom,
    }

    const [maskPx, maskPy] = getPadding(maskPadding)
    const [popoverPx, popoverPy] = getPadding(popoverPadding)

    const couldPositionAt = (position: string) => {
        return (
            available[position] >
            (isHoriz(position)
                ? helperWidth + maskPx * 2
                : helperHeight + maskPy * 2)
        )
    }

    const autoPosition = (coords: CoordsObjectType): CoordType => {
        const positionsOrder: string[] = bestPositionOf(available)
        for (let j = 0; j < positionsOrder.length; j++) {
            if (couldPositionAt(positionsOrder[j])) {
                positionRef.current = positionsOrder[j]
                return coords[positionsOrder[j]]
            }
        }
        positionRef.current = 'center'
        return coords.center
    }

    const differenceWidth = windowWidth / 2 - helperWidth / 2
    const differenceHeight = windowHeight / 2 - helperHeight / 2

    const pos = (helperPosition: Position) => {
        if (Array.isArray(helperPosition)) {
            const isOutX = isOutsideX(helperPosition[0], windowWidth)
            const isOutY = isOutsideY(helperPosition[1], windowHeight)

            positionRef.current = 'custom'
            return [
                isOutX ? differenceWidth : helperPosition[0],
                isOutY ? differenceHeight : helperPosition[1],
            ]
        }

        const isOutsideWindowX = isOutsideX(
            targetLeft + helperWidth,
            windowWidth
        )
        const isOutsideWindowY = isOutsideY(
            targetTop + helperHeight,
            windowHeight
        )

        const hX = isOutsideWindowX
            ? targetRight - helperWidth + maskPx
            : targetLeft - maskPx
        const hY = isOutsideWindowY
            ? targetBottom - helperHeight + maskPy
            : targetTop - maskPy

        const x = hX > maskPx ? hX : maskPx
        const y = hY > maskPy ? hY : maskPy

        if (isOutsideWindowY) {
            verticalAlignRef.current = 'bottom'
        } else {
            verticalAlignRef.current = 'top'
        }
        if (isOutsideWindowX) {
            horizontalAlignRef.current = 'left'
        } else {
            horizontalAlignRef.current = 'right'
        }

        const coords = {
            top: [x, targetTop - helperHeight - maskPy - popoverPy * 2],
            right: [targetRight + maskPx + popoverPx * 2, y],
            bottom: [x, targetBottom + maskPy + popoverPy * 2],
            left: [targetLeft - helperWidth - maskPx - popoverPx * 2, y],
            center: [differenceWidth, differenceHeight],
        }

        if (helperPosition === 'center' || couldPositionAt(helperPosition)) {
            positionRef.current = helperPosition
            return coords[helperPosition]
        }

        return autoPosition(coords)
    }

    const [posX, posY] = pos(position) as [number, number]

    useEffect(() => {
        setPopoverRect({
            top: posY,
            left: posX,
            right: posX + helperWidth,
            bottom: posY + helperHeight,
        })
    }, [posX, posY, helperHeight, helperWidth])

    return (
        <div
            style={{
                ...getStyles('popover', {
                    position: positionRef.current,
                    verticalAlign: verticalAlignRef.current,
                    horizontalAlign: horizontalAlignRef.current,
                }),
                transform: `translate(${Math.round(posX)}px, ${Math.round(
                    posY
                )}px)`,
                ...styles,
            }}
            ref={helperRef}
            {...props}>
            {children}
        </div>
    )
}

export default Popover

export type PopoverProps = {
    sizes: RectResult
    children?: React.ReactNode
    position?: Position
    maskPadding?: number | [number, number]
    popoverPadding?: number | [number, number]
    styles?: CSSProperties
    className?: string
    setPopoverRect: Dispatch<SetStateAction<PopoverRectType>>
}

export type PositionProps = RectResult & {
    windowWidth: number
    windowHeight: number
}

export type Position =
    | 'top'
    | 'right'
    | 'bottom'
    | 'left'
    | 'center'
    | [number, number]
