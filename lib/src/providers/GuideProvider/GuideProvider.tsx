import Guide from '../../components/Guide/Guide'
import { GuideProviderProps, GuideContextType } from '../../components/Guide'
import { GuideStatusesEnum } from '../../constants/constants'
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
    status: GuideStatusesEnum.Idle,
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

const GuideContext = React.createContext<GuideContextType>(defaultState)

export const useGuide = () => {
    const {
        isOpen,
        currentStep,
        steps,
        currStep,
        nextStep,
        prevStep,
        startAt,
        status,
    } = useContext(GuideContext)

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
export const useGuideAllStore = () => useContext(GuideContext)

export const GuideProvider: React.FC<GuideProviderProps> = (props) => {
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
        defaultOpen ? GuideStatusesEnum.Active : GuideStatusesEnum.Idle
    )
    const isOpen =
        [
            GuideStatusesEnum.Paused,
            GuideStatusesEnum.Active,
            GuideStatusesEnum.Waiting,
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
        <GuideContext.Provider value={value}>
            {children}
            {isOpen ? <Guide {...other} /> : null}
        </GuideContext.Provider>
    )
}
