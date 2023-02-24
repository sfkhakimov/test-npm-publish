import { getByKey, saveByKey } from '../../utils'
import { TourStatusesEnum } from '../constants'
import { isEmpty } from 'lodash'
import { Dispatch, SetStateAction, useEffect } from 'react'

export type TutorialLocalStorageArgs = {
    status: TourStatusesEnum
    currentStep: number
    localStorageKey?: string

    setStatus: Dispatch<SetStateAction<TourStatusesEnum>>
    setCurrentStep: Dispatch<SetStateAction<number>>
}

export const useLocalStorage = ({
    status,
    currentStep,
    localStorageKey,

    setStatus,
    setCurrentStep,
}: TutorialLocalStorageArgs) => {
    useEffect(() => {
        if (!localStorageKey) return
        const obj = getByKey(localStorageKey)

        if (isEmpty(obj)) return

        const { status, currentStep } = obj

        setStatus(status as TourStatusesEnum)
        setCurrentStep(currentStep as number)
    }, [localStorageKey])

    useEffect(() => {
        if (!localStorageKey || status === TourStatusesEnum.Idle) return

        saveByKey(localStorageKey, {
            status,
            currentStep,
        })
    }, [status, currentStep, localStorageKey])
}
