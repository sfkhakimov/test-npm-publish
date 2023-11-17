import Voyager from '../../components/Voyager/Voyager'
import {
    VoyagerProviderProps,
    VoyagerContextType,
} from '../../components/Voyager'
import { VoyagerStatusesEnum } from '../../constants/constants'
import { useLocalStorage } from '../../hooks'
import React, { useContext, useEffect, useMemo, useState } from 'react'

const defaultState = {
    isOpen: false,
    currentStep: 0,
    setCurrentStep: () => 0,
    steps: [],
    setSteps: () => [],
    setStatus: () => {
        return
    },
    status: VoyagerStatusesEnum.Idle,
    localStorageKey: undefined,
    prevStep: undefined,
    currStep: undefined,
    nextStep: undefined,
    beforeStart: () => {
        return
    },
    beforeStop: () => {
        return
    },
    afterStart: () => {
        return
    },
    afterStop: () => {
        return
    },
}

const VoyagerContext = React.createContext<VoyagerContextType>(defaultState)

export const useVoyager = () => {
    const {
        isOpen,
        currentStep,
        steps,
        currStep,
        nextStep,
        prevStep,
        startAt,
        status,
    } = useContext(VoyagerContext)

    return {
        isOpen,
        currentStep,
        steps,
        currStep,
        nextStep,
        prevStep,
        startAt,
        status,
    }
}
export const useVoyagerAllStore = () => useContext(VoyagerContext)

export const VoyagerProvider: React.FC<VoyagerProviderProps> = (props) => {
    const {
        children,
        defaultOpen = false,
        startAt = 0,
        steps: defaultSteps,
        localStorageKey,
        beforeStart,
        beforeStop,
        afterStart,
        afterStop,
        ...other
    } = props

    const [currentStep, setCurrentStep] = useState(startAt)
    const [steps, setSteps] = useState(defaultSteps)
    const [status, setStatus] = useState(
        defaultOpen ? VoyagerStatusesEnum.Active : VoyagerStatusesEnum.Idle
    )
    const isOpen =
        [
            VoyagerStatusesEnum.Paused,
            VoyagerStatusesEnum.Active,
            VoyagerStatusesEnum.Waiting,
        ].includes(status) && !!steps.length

    useLocalStorage({
        currentStep,
        setCurrentStep,
        status,
        setStatus,
        localStorageKey,
    })

    const value = useMemo(
        () => ({
            setCurrentStep,
            setSteps,
            status,
            setStatus,
            isOpen,
            currentStep,
            steps,
            currStep: steps[currentStep],
            nextStep: steps[currentStep + 1],
            prevStep: steps[currentStep - 1],
            startAt,
            beforeStart,
            beforeStop,
            afterStart,
            afterStop,
        }),
        [
            {
                setCurrentStep,
                setSteps,
                status,
                setStatus,
                isOpen,
                currentStep,
                steps,
                startAt,
                beforeStart,
                beforeStop,
                afterStart,
                afterStop,
            },
        ]
    )

    useEffect(() => {
        setSteps(defaultSteps)
    }, [defaultSteps])

    return (
        <VoyagerContext.Provider value={value}>
            {children}
            {isOpen ? <Voyager {...other} /> : null}
        </VoyagerContext.Provider>
    )
}
