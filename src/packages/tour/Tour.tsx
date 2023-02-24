import { Mask } from '../mask'
import { Popover } from '../popover'
import { getStepToDisplayAfterReloadPage } from '../utils/helpers'
import Keyboard from './Keyboard'
import { TourStatusesEnum } from './constants'
import { useSizes } from './hooks'
import useObserver from './hooks/useObserver'
import { useTourAllStore } from './providers'
import { Padding, PopoverRectType, TourProps } from './types'
import { useTourHelpers } from './useTourHelpers'
import React, { useEffect, useMemo, useRef, useState } from 'react'

let timerId: NodeJS.Timeout
let stepTimerId: NodeJS.Timeout

const DEFAULT_LOADING_TIMEOUT_DELAY = 5000

const initialPopoverRectState: PopoverRectType = {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
}

const Tour: React.FC<TourProps> = ({
    styles: globalStyles = {},
    scrollSmooth = true,
    afterOpen,
    beforeClose,
    padding = 10,
    position,
    onClickHighlighted,
    highlightedMaskClassName,
    disableInteraction,
    disableKeyboardNavigation,
    ContentComponent,
    Wrapper,
    loadingTimeout = DEFAULT_LOADING_TIMEOUT_DELAY,
    loader = <></>,
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

    const step = steps[currentStep]
    const styles = step?.styles || globalStyles

    const {
        mask: maskStyles,
        overlay: overlayStyles,
        popover: popoverStyles,
    } = styles
    const [overlayHeight, setOverlayHeight] = useState(
        document.body.clientHeight
    )
    const [popoverRect, setPopoverRect] = useState<PopoverRectType>(
        initialPopoverRectState
    )

    const stepRef = useRef(step)
    const [isInitialLoading, setIsInitialLoading] = useState(false)

    const isFirstStep = startAt === currentStep

    const { maskPadding, popoverPadding, wrapperPadding } = getPadding(
        step?.padding || padding
    )

    const scrollOptions: ScrollIntoViewOptions = useMemo(
        () => ({
            behavior: scrollSmooth ? 'smooth' : 'auto',
            padding: maskPadding,
        }),
        [scrollSmooth, maskPadding]
    )

    const { sizes, observableRefresher, target, targetRef, setTarget } =
        useSizes({
            step,
            scrollOptions,
            popoverRect,
        })

    const doDisableInteraction = step?.stepInteraction
        ? !step?.stepInteraction
        : disableInteraction

    const popoverPosition = step?.position || position

    const TourWrapper = Wrapper ? Wrapper : React.Fragment

    const canViewComponent =
        step &&
        [TourStatusesEnum.Active, TourStatusesEnum.Waiting].includes(status)

    const canViewLoader =
        isInitialLoading || status === TourStatusesEnum.Waiting

    useObserver({
        target,
        setTarget,
        setOverlayHeight,
        observableRefresher,
        stepRef,
    })

    useEffect(() => {
        afterOpen?.(targetRef.current)
        return () => {
            beforeClose?.(targetRef.current)
        }
    }, [])

    useEffect(() => {
        stepRef.current = step
    }, [step])

    useEffect(() => {
        if (isFirstStep && !target) {
            setIsInitialLoading(true)

            timerId = setTimeout(() => {
                setIsInitialLoading(false)
                setStatus(TourStatusesEnum.Stopped)
                console.error('Не удалось найти элемент для инструкции')
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
        if (step.cannotDisplayWhenPageReload) {
            setCurrentStep(getStepToDisplayAfterReloadPage(steps, currentStep))
            return
        }
    }, [])

    return canViewComponent ? (
        <TourWrapper>
            <Keyboard
                step={step}
                setStatus={setStatus}
                disableKeyboardNavigation={disableKeyboardNavigation}
            />

            <Mask
                overlayHeight={overlayHeight}
                sizes={sizes}
                maskStyles={maskStyles}
                doDisableInteraction={doDisableInteraction}
                overlayStyles={{
                    ...overlayStyles,
                }}
                padding={maskPadding}
                highlightedAreaClassName={highlightedMaskClassName}
                onClickHighlighted={onClickHighlighted}
                wrapperPadding={wrapperPadding}
            />

            {canViewLoader ? (
                loader
            ) : (
                <Popover
                    sizes={sizes}
                    setPopoverRect={setPopoverRect}
                    styles={popoverStyles}
                    position={popoverPosition}
                    maskPadding={maskPadding}
                    popoverPadding={popoverPadding}>
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
                </Popover>
            )}
        </TourWrapper>
    ) : null
}

export default Tour

function getPadding(padding?: Padding) {
    if (typeof padding === 'object' && padding !== null) {
        return {
            maskPadding: padding.mask,
            popoverPadding: padding.popover,
            wrapperPadding: padding.wrapper,
        }
    }
    return {
        maskPadding: padding,
        popoverPadding: padding,
        wrapperPadding: 0,
    }
}
