import { VoyagerStatusesEnum } from '../../constants/constants'
import { useScroll, useSizes, useVoyagerHelpers } from '../../hooks'
import { useVoyagerAllStore } from '../../providers/VoyagerProvider'
import { getStepToDisplayAfterReloadPage } from '../../utils/helpers'
import { Mask } from '../Mask'
import { Popper } from '../Popper'
import { Padding, PopperRectType, VoyagerProps } from './types'
import React, { useEffect, useMemo, useState } from 'react'
import ReactDOM from 'react-dom'

let timerId: NodeJS.Timeout
let stepTimerId: NodeJS.Timeout

const getPadding = (padding?: Padding) => {
    if (typeof padding === 'object' && padding !== null) {
        return {
            maskPadding: padding.mask,
            popperPadding: padding.popper,
            wrapperPadding: padding.wrapper,
        }
    }
    return {
        maskPadding: padding,
        popperPadding: padding,
        wrapperPadding: 0,
    }
}

const DEFAULT_LOADING_TIMEOUT_DELAY = 5000

const initialPopperRectState: PopperRectType = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
}

const Voyager: React.FC<VoyagerProps> = ({
    rootEl = 'body',
    styles: globalStyles = {},
    scrollSmooth = true,
    afterOpen,
    beforeClose,
    padding = 10,
    placement,
    onClickHighlighted,
    disableInteraction,
    PopperContent,
    Wrapper,
    loadingTimeout = DEFAULT_LOADING_TIMEOUT_DELAY,
    loader = <>Loading...</>,
    onChangeStep,
}) => {
    const store = useVoyagerAllStore()
    const {
        setCurrentStep,
        setStatus,
        currentStep,
        steps,
        startAt,
        status,
        isOpen,
        currStep,
        nextStep,
        prevStep,
    } = store
    const helpers = useVoyagerHelpers()

    const step = steps[currentStep]

    const styles = step?.styles || globalStyles

    const {
        mask: maskStyles,
        overlay: overlayStyles,
        popper: popperStyles,
    } = styles

    const [popperRect, setPopperRect] = useState<PopperRectType>(
        initialPopperRectState
    )

    const [isInitialLoading, setIsInitialLoading] = useState(false)

    const isFirstStep = startAt === currentStep

    const { maskPadding, popperPadding, wrapperPadding } = getPadding(
        step?.padding || padding
    )

    const scrollOptions: ScrollIntoViewOptions = useMemo(
        () => ({
            behavior: scrollSmooth ? 'smooth' : 'auto',
            padding: maskPadding,
        }),
        [scrollSmooth, maskPadding]
    )

    const { sizes, target, targetRef, overlayHeight } = useSizes({
        step,
    })

    useScroll({
        popperRect,
        scrollOptions,
        sizes,
        status,
    })

    const doDisableInteraction = step?.stepInteraction
        ? !step?.stepInteraction
        : disableInteraction

    const popperPlacement = step?.placement || placement

    const VoyagerWrapper = Wrapper ? Wrapper : React.Fragment

    const canViewComponent =
        step &&
        [VoyagerStatusesEnum.Active, VoyagerStatusesEnum.Waiting].includes(
            status
        )

    const canViewLoader =
        isInitialLoading || status === VoyagerStatusesEnum.Waiting

    useEffect(() => {
        afterOpen?.(targetRef.current)
        return () => {
            beforeClose?.(targetRef.current)
        }
    }, [])

    useEffect(() => {
        if (isFirstStep && !target) {
            setIsInitialLoading(true)

            timerId = setTimeout(() => {
                setIsInitialLoading(false)
                setStatus(VoyagerStatusesEnum.Stopped)
                console.error('Element not found for instruction.')
                clearTimeout(timerId)
            }, loadingTimeout)

            return () => {
                clearTimeout(timerId)
            }
        }

        setIsInitialLoading(false)
    }, [isFirstStep, target])

    useEffect(() => {
        if (target) {
            setStatus(VoyagerStatusesEnum.Active)
            return
        }

        if (isFirstStep) return

        setStatus(VoyagerStatusesEnum.Waiting)
    }, [target, isFirstStep])

    useEffect(() => {
        if (status !== VoyagerStatusesEnum.Waiting) {
            return clearTimeout(stepTimerId)
        }

        stepTimerId = setTimeout(() => {
            setStatus(VoyagerStatusesEnum.Paused)

            return () => {
                clearTimeout(stepTimerId)
            }
        }, step.loadingTimeout || DEFAULT_LOADING_TIMEOUT_DELAY)
    }, [status, step])

    useEffect(() => {
        void step.onChangeStep?.(step, currentStep) ||
            void onChangeStep?.(step, currentStep)
    }, [step])

    useEffect(() => {
        if (step.canDisplayWhenPageReload === false) {
            setCurrentStep(getStepToDisplayAfterReloadPage(steps, currentStep))
            return
        }
    }, [])

    const Component = canViewLoader ? (
        <div style={{ zIndex: 100000, position: 'relative' }}>{loader}</div>
    ) : (
        <Popper
            sizes={sizes}
            maskPadding={maskPadding}
            rootEl={rootEl}
            target={target}
            setPopperRect={setPopperRect}
            styles={popperStyles}
            placement={popperPlacement}
            popperPadding={popperPadding}
        >
            <PopperContent
                currentStep={currentStep}
                steps={steps}
                startAt={startAt}
                status={status}
                isOpen={isOpen}
                currStep={currStep}
                nextStep={nextStep}
                prevStep={prevStep}
                {...step}
                {...helpers}
            />
        </Popper>
    )

    return canViewComponent ? (
        <VoyagerWrapper>
            <Mask
                rootEl={rootEl}
                overlayHeight={overlayHeight}
                sizes={sizes}
                maskStyles={maskStyles}
                doDisableInteraction={doDisableInteraction}
                overlayStyles={overlayStyles}
                padding={maskPadding}
                onClickHighlighted={onClickHighlighted}
                wrapperPadding={wrapperPadding}
            />

            {ReactDOM.createPortal(Component, document.querySelector(rootEl)!)}
        </VoyagerWrapper>
    ) : null
}

export default Voyager
