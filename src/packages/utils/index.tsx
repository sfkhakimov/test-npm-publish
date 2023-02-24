import { getRect } from './getRect'
import {
    getInViewThreshold,
    getWindow,
    isHoriz,
    isOutsideX,
    isOutsideY,
    bestPositionOf,
    getPadding,
    getByKey,
    saveByKey,
    removeByKey,
    updateByKey,
} from './helpers'
import { smoothScroll } from './smoothScroll'
import {
    PositionsType,
    PositionsObjectType,
    CoordType,
    CoordsObjectType,
    RectResult,
    InViewArgs,
} from './types'

export {
    getRect,
    smoothScroll,
    getInViewThreshold,
    getWindow,
    isHoriz,
    isOutsideX,
    isOutsideY,
    bestPositionOf,
    getPadding,
    getByKey,
    saveByKey,
    removeByKey,
    updateByKey,
}

export type {
    PositionsType,
    PositionsObjectType,
    CoordType,
    CoordsObjectType,
    RectResult,
    InViewArgs,
}
