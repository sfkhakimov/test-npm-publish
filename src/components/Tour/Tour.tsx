import { TourStatusesEnum } from '../../constants/constants'
import { useScroll, useSizes, useTourHelpers } from '../../hooks'
import { useTourAllStore } from '../../providers/TourProvider'
import { getStepToDisplayAfterReloadPage } from '../../utils/helpers'
import { Mask } from '../Mask'
import { Popper } from '../Popper'
import { Padding, PopperRectType, TourProps } from './types'
import React, { useEffect, useMemo, useState } from 'react'

let timerId: NodeJS.Timeout
let stepTimerId: NodeJS.Timeout

const getPadding = (padding?: Padding) => {
    if (typeof padding === 'object' && padding !== null) {
        return {
            maskPadding: padding.mask,
            popperPadding: padding.popover,
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

const initialPopoverRectState: PopperRectType = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
}

const Tour: React.FC<TourProps> = ({
    rootEl = 'body',
    styles: globalStyles = {},
    scrollSmooth = true,
    afterOpen,
    beforeClose,
    padding = 10,
    placement,
    onClickHighlighted,
    disableInteraction,
    ContentComponent,
    Wrapper,
    loadingTimeout = DEFAULT_LOADING_TIMEOUT_DELAY,
    loader = <>Loading...</>,
    onChangeStep,
}) => {
    const store = useTourAllStore()
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
    const helpers = useTourHelpers()
    const [referenceEl, setReferenceEl] = useState<Element | null>(null)

    const step = steps[currentStep]

    const styles = step?.styles || globalStyles

    const {
        mask: maskStyles,
        overlay: overlayStyles,
        popover: popperStyles,
    } = styles

    const [popoverRect, setPopperRect] = useState<PopperRectType>(
        initialPopoverRectState
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
        popoverRect,
        scrollOptions,
        sizes,
    })

    const doDisableInteraction = step?.stepInteraction
        ? !step?.stepInteraction
        : disableInteraction

    const popperPlacement = step?.placement || placement

    const TourWrapper = Wrapper ? Wrapper : React.Fragment

    const canViewComponent =
        step &&
        [TourStatusesEnum.Active, TourStatusesEnum.Waiting].includes(status)

    const canViewLoader =
        isInitialLoading || status === TourStatusesEnum.Waiting

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
                setStatus(TourStatusesEnum.Stopped)
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
            setStatus(TourStatusesEnum.Active)
            return
        }

        if (isFirstStep) return

        setStatus(TourStatusesEnum.Waiting)
    }, [target, isFirstStep])

    useEffect(() => {
        if (status !== TourStatusesEnum.Waiting) {
            return clearTimeout(stepTimerId)
        }

        stepTimerId = setTimeout(() => {
            setStatus(TourStatusesEnum.Paused)

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

    return canViewComponent ? (
        <TourWrapper>
            <Mask
                rootEl={rootEl}
                setReferenceEl={setReferenceEl}
                overlayHeight={overlayHeight}
                sizes={sizes}
                maskStyles={maskStyles}
                doDisableInteraction={doDisableInteraction}
                overlayStyles={overlayStyles}
                padding={maskPadding}
                onClickHighlighted={onClickHighlighted}
                wrapperPadding={wrapperPadding}
            />

            {canViewLoader ? (
                loader
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
                    <ContentComponent
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
            )}
        </TourWrapper>
    ) : null
}

export default Tour
