import { StepType } from '../tour'
import { InViewArgs, PositionsObjectType } from './types'

export function getInViewThreshold(threshold: InViewArgs['threshold']) {
    if (typeof threshold === 'object' && threshold !== null) {
        return {
            thresholdX: threshold.x || 0,
            thresholdY: threshold.y || 0,
        }
    }
    return {
        thresholdX: threshold || 0,
        thresholdY: threshold || 0,
    }
}

export function getWindow(): { w: number; h: number } {
    const w = document.documentElement.clientWidth
    const h = document.documentElement.clientHeight
    return { w, h }
}

export const isHoriz = (pos: string) => /(left|right)/.test(pos)
export const isOutsideX = (val: number, windowWidth: number): boolean => {
    return val > windowWidth
}
export const isOutsideY = (val: number, windowHeight: number): boolean => {
    return val > windowHeight
}

export function bestPositionOf(positions: PositionsObjectType): string[] {
    return Object.keys(positions)
        .map(p => {
            return {
                position: p,
                value: positions[p],
            }
        })
        .sort((a, b) => b.value - a.value)
        .map(p => p.position)
}

const defaultPadding = 10

export function getPadding(
    padding: number | [number, number] = defaultPadding
) {
    if (Array.isArray(padding)) {
        return padding[0]
            ? [padding[0], padding[1] ? padding[1] : padding[0]]
            : [defaultPadding, defaultPadding]
    }
    return [padding, padding]
}

export const getByKey = <T extends Record<string, unknown>>(key: string): T => {
    const data = localStorage.getItem(key) || '{}'
    try {
        return JSON.parse(data) as T
    } catch (err) {
        removeByKey(key)
        return {} as T
    }
}

export const saveByKey = (key: string, value: unknown): void => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const updateByKey = (
    key: string,
    value: Record<string, unknown>
): void => {
    const data = getByKey(key)
    saveByKey(key, { ...data, ...value })
}

export const removeByKey = (key: string): void => {
    localStorage.removeItem(key)
}

export const getStepToDisplayAfterReloadPage = (
    steps: StepType[],
    currentStep: number
) => {
    let i = currentStep

    while (i >= 0) {
        if (!steps[i].cannotDisplayWhenPageReload) {
            return i
        }
        i--
    }
    return i
}
