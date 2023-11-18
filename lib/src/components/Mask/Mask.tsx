import { getDocumentSizes, getPadding, RectResult } from '../../utils'
import React, { CSSProperties, MouseEventHandler } from 'react'
import ReactDOM from 'react-dom'

type MaskProps = {
    rootEl: string
    overlayHeight: number
    sizes: RectResult
    maskStyles?: CSSProperties
    overlayStyles?: CSSProperties
    highlightedAreaClassName?: string
    padding?: number | [number, number]
    wrapperPadding?: number | [number, number]
    onClickHighlighted?: MouseEventHandler<SVGRectElement>
    maskId?: string
    clipId?: string
    doDisableInteraction?: boolean
}

const uniqueId = (prefix: string) =>
    prefix + Math.random().toString(36).substring(2, 16)
const Mask: React.FC<MaskProps> = ({
    rootEl,
    overlayHeight,
    padding = 10,
    wrapperPadding = 0,
    onClickHighlighted,
    maskStyles = {},
    overlayStyles = {},
    sizes,
    highlightedAreaClassName,
    maskId,
    clipId,
    doDisableInteraction,
}) => {
    const maskID = maskId || uniqueId('mask__')
    const clipID = clipId || uniqueId('clip__')
    const [px, py] = getPadding(padding)
    const [wpx, wpy] = getPadding(wrapperPadding)
    const { width: w } = getDocumentSizes()
    const width = sizes?.width ? sizes?.width + px * 2 : 0
    const height = sizes?.height ? sizes?.height + py * 2 : 0
    const top = sizes?.top - py - wpy / 2
    const left = sizes?.left - px - wpx / 2
    const windowWidth = w - wpx

    const maskAreaStyles = {
        x: left,
        y: top,
        width,
        height,
        fill: 'black',
        rx: 8,
    }

    return ReactDOM.createPortal(
        <div
            key={overlayHeight}
            style={{
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
                ...overlayStyles,
            }}
        >
            <svg
                width={windowWidth}
                height={overlayHeight}
                style={{
                    width: windowWidth,
                    height: overlayHeight,
                    left: Number(wpx) / 2,
                    top: Number(wpy) / 2,
                    position: 'absolute',
                }}
            >
                <defs>
                    <mask id={maskID}>
                        <rect
                            x={left}
                            y={top}
                            width={width}
                            height={height}
                            fill="white"
                        />
                        <rect style={maskAreaStyles} rx={maskAreaStyles.rx} />
                    </mask>
                    <clipPath id={clipID}>
                        <polygon
                            points={`0 0, 0 ${overlayHeight}, ${left} ${overlayHeight}, ${left} ${top}, ${
                                left + width
                            } ${top}, ${left + width} ${
                                top + height
                            }, ${left} ${
                                top + height
                            }, ${left} ${overlayHeight}, ${windowWidth} ${overlayHeight}, ${windowWidth} 0`}
                        />
                    </clipPath>
                </defs>

                <rect
                    key={String(sizes?.x)}
                    data-abc="abc"
                    style={{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        x: left,
                        y: top,
                        width: width,
                        height: height,
                        fill: 'currentColor',
                        mask: `url(#${maskID})`,
                        ...maskStyles,
                    }}
                />
                <rect
                    style={{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        x: 0,
                        y: 0,
                        width: windowWidth,
                        height: overlayHeight,
                        fill: 'currentcolor',
                        pointerEvents: 'auto',
                        clipPath: `url(#${clipID})`,
                    }}
                />
                <rect
                    style={{
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        x: left,
                        y: top,
                        width,
                        height,
                        pointerEvents: 'auto',
                        fill: 'transparent',
                        display: doDisableInteraction ? 'block' : 'none',
                    }}
                    className={highlightedAreaClassName}
                    onClick={onClickHighlighted}
                />
            </svg>
        </div>,
        document.querySelector(rootEl)!
    )
}

export default Mask
