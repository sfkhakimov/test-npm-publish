import { StepType } from '../components/Voyager'
import { VoyagerStatusesEnum } from '../constants/constants'
import { useVoyagerAllStore } from '../providers/VoyagerProvider'
import { useEvent } from './useEvent'
import { merge } from 'lodash'
import { useMemo } from 'react'

export const useVoyagerHelpers = () => {
    const store = useVoyagerAllStore()

    const {
        setCurrentStep,
        setSteps,
        setStatus,
        isOpen,
        currentStep,
        steps,
        currStep,
        nextStep,
        prevStep,
        startAt = 0,
        beforeStart,
        beforeStop,
        afterStart,
        afterStop,
    } = store

    const isLastStep = currentStep === steps.length - 1
    const isFirstStep = currentStep === startAt

    const start = useEvent(async () => {
        await beforeStart?.()

        setCurrentStep(startAt)
        setStatus(VoyagerStatusesEnum.Active)

        await afterStart?.()
    })

    const stop = useEvent(async () => {
        await beforeStop?.()

        setStatus(VoyagerStatusesEnum.Stopped)
        setCurrentStep(startAt)

        await afterStop?.()
    })

    const goNextStep = useEvent(async () => {
        if (!isOpen) return

        if (isLastStep) {
            setStatus(VoyagerStatusesEnum.Completed)
            setCurrentStep(startAt)
            return
        }
        await currStep?.onAfterStep?.()
        await nextStep?.onBeforeStep?.()
        setCurrentStep((prev) => prev + 1)
    })

    const goBackStep = useEvent(async () => {
        if (isFirstStep || !isOpen) return
        await currStep?.onAfterStep?.()
        await prevStep?.onBeforeStep?.()
        setCurrentStep((prev) => prev - 1)
    })

    const skip = useEvent(() => {
        if (!isOpen) return
        setStatus(VoyagerStatusesEnum.Skipped)
    })

    const goToStep = useEvent((newStep: number) => {
        if (!isOpen) return

        if (newStep > steps.length - 1) return

        setCurrentStep(newStep)
    })

    const updateSteps = useEvent(
        (selector: StepType['selector'], data: Partial<StepType>) => {
            if (!isOpen) return
            const newSteps = steps.map((item) => {
                if (item.selector === selector) {
                    return merge(item, data)
                }
                return item
            })

            setSteps(newSteps)
        }
    )

    return useMemo(
        () => ({
            start,
            stop,
            goNextStep,
            goBackStep,
            goToStep,
            skip,
            updateSteps,
        }),
        [start, stop, goNextStep, goBackStep, goToStep, skip, updateSteps]
    )
}
