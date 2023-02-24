import { getWindow, getPadding, RectResult } from '../utils'
import { stylesMatcher } from './styles'
import React, { CSSProperties, MouseEventHandler } from 'react'

const Mask: React.FC<MaskProps> = ({
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
    const getStyles = stylesMatcher()
    const [px, py] = getPadding(padding)
    const [wpx, wpy] = getPadding(wrapperPadding)
    const { w, h } = getWindow()
    const width = sizes?.width ? sizes?.width + px * 2 : 0
    const height = sizes?.height ? sizes?.height + py * 2 : 0
    const top = sizes?.top - py - wpy / 2
    const left = sizes?.left - px - wpx / 2
    const windowWidth = w - wpx

    const maskAreaStyles = getStyles('maskArea', {
        x: left,
        y: top,
        width,
        height,
    })

    return (
        <div
            key={overlayHeight}
            style={{
                ...getStyles('maskWrapper', {
                    overlayHeight,
                }),
                ...overlayStyles,
            }}>
            <svg
                width={windowWidth}
                height={overlayHeight}
                xmlns="http://www.w3.org/2000/svg"
                style={{
                    ...getStyles('svgWrapper', {
                        windowWidth,
                        overlayHeight,
                        wpx,
                        wpy,
                    }),
                    ...maskStyles,
                }}>
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
                    data-abc="abc"
                    style={{
                        ...getStyles('maskRect', {
                            left,
                            top,
                            width,
                            height,
                            maskID,
                        }),
                    }}
                />
                <rect
                    style={getStyles('clickArea', {
                        windowWidth,
                        overlayHeight,
                        top,
                        left,
                        width,
                        height,
                        clipID,
                    })}
                />
                <rect
                    style={getStyles('highlightedArea', {
                        x: left,
                        y: top,
                        width,
                        height,
                        doDisableInteraction,
                    })}
                    className={highlightedAreaClassName}
                    onClick={onClickHighlighted}
                />
            </svg>
        </div>
    )
}

export type MaskProps = {
    overlayHeight: number
    children?: React.ReactNode
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

export default Mask

function uniqueId(prefix: string) {
    return prefix + Math.random().toString(36).substring(2, 16)
}
