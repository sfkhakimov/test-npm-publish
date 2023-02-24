import { ScrollOptionsType } from '../tour/hooks'
import { isArray } from 'lodash'

const DEFAULT_INDENT = 10

export function smoothScroll({
    top,
    left,
    right,
    bottom,
    options,
}: {
    top: number
    left: number
    right: number
    bottom: number
    options: ScrollOptionsType
}) {
    const viewPortTop = window.scrollY
    const viewPortLeft = window.scrollX
    const viewPortBottom = window.scrollY + window.innerHeight
    const viewPortRight = window.scrollX + window.innerWidth

    if (
        top > viewPortTop &&
        bottom < viewPortBottom &&
        left > viewPortLeft &&
        right < viewPortRight
    ) {
        return
    }

    const { padding = [0, 0], ...other } = options

    const [px, py] = isArray(padding) ? padding : [padding, padding]

    window.scrollTo({
        top: top - py - DEFAULT_INDENT,
        left: left - px - DEFAULT_INDENT,
        ...other,
    })
}
