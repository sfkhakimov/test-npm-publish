type RectResult = {
    bottom: number
    height: number
    left: number
    right: number
    top: number
    width: number
    x: number
    y: number
}

export const getRect = (element?: Element | undefined | null): RectResult => {
    let rect: RectResult = {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
    }

    if (element) {
        const box = element.getBoundingClientRect()

        const body = document.body
        const docEl = document.documentElement

        const scrollTop =
            window.pageYOffset || docEl.scrollTop || body.scrollTop
        const scrollLeft =
            window.pageXOffset || docEl.scrollLeft || body.scrollLeft

        const clientTop = docEl.clientTop || body.clientTop || 0
        const clientLeft = docEl.clientLeft || body.clientLeft || 0

        const top = box.top + scrollTop - clientTop
        const left = box.left + scrollLeft - clientLeft

        rect = {
            x: Math.round(left),
            y: Math.round(top),
            bottom: box.height + Math.round(top),
            right: box.width + Math.round(left),
            left: Math.round(left),
            top: Math.round(top),
            width: box.width,
            height: box.height,
        }
    }
    return rect
}
