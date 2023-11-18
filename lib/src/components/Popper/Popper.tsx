import { RectResult } from '../../utils'
import { ComponentPadding, PopperRectType } from '../Voyager'
import { usePopper } from './hooks'
import { defaultStyles } from './styles'
import './styles.css'
import { VoyagerPopperPlacement } from './types'
import React, {
    CSSProperties,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
} from 'react'

export type PopperProps = {
    sizes: RectResult
    rootEl: string
    target: Element | null
    children?: React.ReactNode
    placement?: VoyagerPopperPlacement
    popperPadding?: number | [number, number]
    styles?: CSSProperties
    className?: string
    setPopperRect: Dispatch<SetStateAction<PopperRectType>>
    maskPadding?: ComponentPadding
}
const Popper: React.FC<PopperProps> = ({
    sizes,
    rootEl,
    target,
    children,
    placement = 'bottom',
    popperPadding = 0,
    styles = {},
    setPopperRect,
    maskPadding,
    ...props
}) => {
    const popperRef = useRef<HTMLDivElement | null>(null)

    const { coordinates, placement: popperPlacement } = usePopper({
        target,
        popperRef,
        placement,
        popperPadding,
        sizes,
        maskPadding,
    })

    useEffect(() => {
        setPopperRect({
            left: coordinates.x,
            right: coordinates.x + (popperRef.current?.clientWidth || 0),
            top: coordinates.y,
            bottom: coordinates.y + (popperRef.current?.clientHeight || 0),
        })
    }, [coordinates, target])

    return (
        <div
            style={{
                ...defaultStyles,
                transform: `translate(${Math.round(
                    coordinates.x
                )}px, ${Math.round(coordinates.y)}px)`,
                ...styles,
            }}
            ref={popperRef}
            {...props}
        >
            <div className={`${popperPlacement} popper-arrow`}></div>
            {children}
        </div>
    )
}

export default Popper
