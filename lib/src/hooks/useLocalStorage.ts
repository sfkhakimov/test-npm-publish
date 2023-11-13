import { getByKey, saveByKey } from '../utils'
import { GuideStatusesEnum } from '../constants/constants'
import { isEmpty } from 'lodash'
import { Dispatch, SetStateAction, useEffect } from 'react'

export type TutorialLocalStorageArgs = {
    status: GuideStatusesEnum
    currentStep: number
    localStorageKey?: string

    setStatus: Dispatch<SetStateAction<GuideStatusesEnum>>
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

        setStatus(status as GuideStatusesEnum)
        setCurrentStep(currentStep as number)
    }, [localStorageKey])

    useEffect(() => {
        if (!localStorageKey || status === GuideStatusesEnum.Idle) return

        saveByKey(localStorageKey, {
            status,
            currentStep,
        })
    }, [status, currentStep, localStorageKey])
}
