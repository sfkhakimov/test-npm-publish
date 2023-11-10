import { StepType } from '../index'

export const getDocumentSizes = () => {
    const width = document.body.clientWidth
    const height = document.body.clientHeight
    return { width, height }
}

const defaultPadding = 10
export const getPadding = (
    padding: number | [number, number] = defaultPadding
): [number, number] => {
    if (Array.isArray(padding)) {
        return padding[0]
            ? [padding[0], padding[1] ? padding[1] : padding[0]]
            : [defaultPadding, defaultPadding]
    }
    return [padding, padding]
}

export const removeByKey = (key: string): void => {
    localStorage.removeItem(key)
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

export const getStepToDisplayAfterReloadPage = (
    steps: StepType[],
    currentStep: number
) => {
    let i = currentStep

    while (i >= 0) {
        if (steps[i].canDisplayWhenPageReload ?? true) {
            return i
        }
        i--
    }
    return i
}
