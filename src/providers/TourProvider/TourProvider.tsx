import Tour from '../../components/Tour/Tour'
import { ProviderProps, TourContextType } from '../../components/Tour'
import { TourStatusesEnum } from '../../constants/constants'
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
    status: TourStatusesEnum.Idle,
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

const TourContext = React.createContext<TourContextType>(defaultState)

export const useTour = () => {
    const {
        isOpen,
        currentStep,
        steps,
        currStep,
        nextStep,
        prevStep,
        startAt,
        status,
    } = useContext(TourContext)

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
export const useTourAllStore = () => useContext(TourContext)

const TourProvider: React.FC<ProviderProps> = (props) => {
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
        defaultOpen ? TourStatusesEnum.Active : TourStatusesEnum.Idle
    )
    const isOpen =
        [
            TourStatusesEnum.Paused,
            TourStatusesEnum.Active,
            TourStatusesEnum.Waiting,
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
        <TourContext.Provider value={value}>
            {children}
            {isOpen ? <Tour {...other} /> : null}
        </TourContext.Provider>
    )
}

export { TourProvider }

export default TourContext
