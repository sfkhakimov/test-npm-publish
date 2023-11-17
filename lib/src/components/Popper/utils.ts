import { VoyagerPopperPlacement } from './types'

type Coordinates = {
    x: number
    y: number
}

type Result = {
    coordinates: Coordinates
    placement: VoyagerPopperPlacement
}

type Args = {
    sizes: {
        x: number
        y: number
        width: number
        height: number
    }
    popperSizes: {
        width: number
        height: number
    }
    windowSize: {
        width: number
        height: number
    }
    placement: VoyagerPopperPlacement
    popperPadding: [number, number]
    maskPadding: [number, number]
}

const DEFAULT_PADDING = 16
export const calculatePopperPosition = ({
    sizes,
    popperSizes: { width: popperWidth, height: popperHeight },
    windowSize: { width: windowWidth, height: windowHeight },
    placement,
    popperPadding,
    maskPadding,
}: Args): Result => {
    const paddingX = popperPadding[0] + DEFAULT_PADDING
    const paddingY = popperPadding[1] + DEFAULT_PADDING

    const x = sizes.x - maskPadding[0]
    const y = sizes.y - maskPadding[1]
    const width = sizes.width + maskPadding[0] * 2
    const height = sizes.height + maskPadding[1] * 2

    const placements: Record<VoyagerPopperPlacement, Coordinates> = {
        left: {
            x: x - popperWidth - paddingX,
            y: y + (height - popperHeight) / 2,
        },
        'left-start': { x: x - popperWidth - paddingX, y: y },
        'left-end': {
            x: x - popperWidth - paddingX,
            y: y + (height - popperHeight),
        },
        right: { x: x + width + paddingX, y: y + (height - popperHeight) / 2 },
        'right-start': { x: x + width + paddingX, y: y },
        'right-end': {
            x: x + width + paddingX,
            y: y + (height - popperHeight),
        },
        top: {
            x: x + (width - popperWidth) / 2,
            y: y - popperHeight - paddingY,
        },
        'top-start': { x: x, y: y - popperHeight - paddingY },
        'top-end': {
            x: x + (width - popperWidth),
            y: y - popperHeight - paddingY,
        },
        bottom: { x: x + (width - popperWidth) / 2, y: y + height + paddingY },
        'bottom-start': { x: x, y: y + height + paddingY },
        'bottom-end': {
            x: x + (width - popperWidth),
            y: y + height + paddingY,
        },
    }

    const preferredPlacement = placements[placement]
    if (preferredPlacement) {
        if (
            preferredPlacement.x >= 0 &&
            preferredPlacement.y >= 0 &&
            preferredPlacement.x + popperWidth <= windowWidth &&
            preferredPlacement.y + popperHeight <= windowHeight
        ) {
            return { coordinates: preferredPlacement, placement }
        }
    }

    for (const altPlacement in placements) {
        const placement = altPlacement as VoyagerPopperPlacement
        if (
            placements[placement].x >= 0 &&
            placements[placement].y >= 0 &&
            placements[placement].x + popperWidth <= windowWidth &&
            placements[placement].y + popperHeight <= windowHeight
        ) {
            return { coordinates: placements[placement], placement }
        }
    }

    return { coordinates: preferredPlacement, placement }
}
