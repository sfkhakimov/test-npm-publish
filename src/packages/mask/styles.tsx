export type StyleFn = (
    props: { [key: string]: any },
    state?: { [key: string]: any }
) => React.CSSProperties & { rx?: number }

export type Styles = {
    maskWrapper: StyleFn
    svgWrapper: StyleFn
    maskArea: StyleFn
    maskRect: StyleFn
    clickArea: StyleFn
    highlightedArea: StyleFn
}

export type StyleKey = keyof Styles

export const defaultStyles: Styles = {
    maskWrapper: ({ overlayHeight }) => ({
        opacity: 0.7,
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        position: 'absolute',
        zIndex: 99999,
        pointerEvents: 'none',
        color: '#000',
        height: overlayHeight,
    }),
    svgWrapper: ({ windowWidth, wpx, wpy, overlayHeight }) => ({
        width: windowWidth,
        height: overlayHeight,
        left: Number(wpx) / 2,
        top: Number(wpy) / 2,
        position: 'absolute',
    }),
    maskArea: ({ x, y, width, height }) => ({
        x,
        y,
        width,
        height,
        fill: 'black',
        rx: 8,
    }),
    maskRect: ({ left, top, width, height, maskID }) => ({
        x: left,
        y: top,
        width: width,
        height: height,
        fill: 'currentColor',
        mask: `url(#${maskID})`,
    }),
    clickArea: ({ windowWidth, clipID, overlayHeight }) => ({
        x: 0,
        y: 0,
        width: windowWidth,
        height: overlayHeight,
        fill: 'currentcolor',
        pointerEvents: 'auto',
        clipPath: `url(#${clipID})`,
    }),
    highlightedArea: ({ x, y, width, height, doDisableInteraction }) => ({
        x,
        y,
        width,
        height,
        pointerEvents: 'auto',
        fill: 'transparent',
        display: doDisableInteraction ? 'block' : 'none',
    }),
}

export function stylesMatcher() {
    return (key: StyleKey, state: {}): React.CSSProperties & { rx?: number } =>
        defaultStyles[key](state)
}
