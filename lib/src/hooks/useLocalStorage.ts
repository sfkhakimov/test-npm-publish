import { getByKey, saveByKey } from '../utils'
import { VoyagerStatusesEnum } from '../constants/constants'
import { isEmpty } from 'lodash'
import { Dispatch, SetStateAction, useEffect } from 'react'

export type VoyagerLocalStorageArgs = {
    status: VoyagerStatusesEnum
    currentStep: number
    localStorageKey?: string

    setStatus: Dispatch<SetStateAction<VoyagerStatusesEnum>>
    setCurrentStep: Dispatch<SetStateAction<number>>
}

export const useLocalStorage = ({
    status,
    currentStep,
    localStorageKey,

    setStatus,
    setCurrentStep,
}: VoyagerLocalStorageArgs) => {
    useEffect(() => {
        if (!localStorageKey) return
        const obj = getByKey(localStorageKey)

        if (isEmpty(obj)) return

        const { status, currentStep } = obj

        setStatus(status as VoyagerStatusesEnum)
        setCurrentStep(currentStep as number)
    }, [localStorageKey])

    useEffect(() => {
        if (!localStorageKey || status === VoyagerStatusesEnum.Idle) return

        saveByKey(localStorageKey, {
            status,
            currentStep,
        })
    }, [status, currentStep, localStorageKey])
}
