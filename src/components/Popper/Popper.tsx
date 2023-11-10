import { RectResult } from '../../utils'
import { ComponentPadding, PopperRectType } from '../Tour'
import { usePopper } from './hooks'
import { defaultStyles } from './styles'
import './styles.css'
import { TutorialPopperPlacement } from './types'
import React, {
    CSSProperties,
    Dispatch,
    SetStateAction,
    useEffect,
    useRef,
} from 'react'
import ReactDOM from 'react-dom'

export type PopoverProps = {
    sizes: RectResult
    rootEl: string
    target: Element | null
    children?: React.ReactNode
    placement?: TutorialPopperPlacement
    popperPadding?: number | [number, number]
    styles?: CSSProperties
    className?: string
    setPopperRect: Dispatch<SetStateAction<PopperRectType>>
    maskPadding?: ComponentPadding
}
const Popper: React.FC<PopoverProps> = ({
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
    }, [coordinates])

    return ReactDOM.createPortal(
        <div
            style={{
                ...defaultStyles,
                transform: `translate(${Math.round(
                    coordinates.x
                )}px, ${Math.round(coordinates.y)}px)`,
                ...styles,
            }}
            ref={popperRef}
            {...props}>
            <div className={`${popperPlacement} popper-arrow`}></div>
            {children}
        </div>,
        document.querySelector(rootEl)!
    )
}

export default Popper
