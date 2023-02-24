import { TourStatusesEnum } from './constants'
import { KeyboardParts, StepType } from './types'
import { useTourHelpers } from './useTourHelpers'
import React, { Dispatch, useEffect } from 'react'

const Keyboard: React.FC<KeyboardProps> = ({
    disableKeyboardNavigation,
    step,
    setStatus,
}) => {
    const { disableNextStepBtn, disableBackStepBtn } = step
    const { goNextStep, goBackStep } = useTourHelpers()
    function keyDownHandler(e: any) {
        e.stopPropagation()

        if (disableKeyboardNavigation === true) {
            return
        }

        let isEscDisabled, isRightDisabled, isLeftDisabled
        if (disableKeyboardNavigation) {
            isEscDisabled = disableKeyboardNavigation.includes('esc')
            isRightDisabled = disableKeyboardNavigation.includes('right')
            isLeftDisabled = disableKeyboardNavigation.includes('left')
        }

        function next() {
            !disableNextStepBtn && void goNextStep()
        }

        function prev() {
            !disableBackStepBtn && void goBackStep()
        }

        if (e.keyCode === 27 && !isEscDisabled) {
            e.preventDefault()
            setStatus(TourStatusesEnum.Stopped)
        }
        if (e.keyCode === 39 && !isRightDisabled) {
            e.preventDefault()
        }
        if (e.keyCode === 37 && !isLeftDisabled) {
            e.preventDefault()
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', keyDownHandler, false)
        return () => {
            window.removeEventListener('keydown', keyDownHandler)
        }
    }, [step])

    return null
}

export type KeyboardProps = {
    disableKeyboardNavigation?: boolean | KeyboardParts[]
    setStatus: Dispatch<React.SetStateAction<TourStatusesEnum>>
    step: StepType
}

export default Keyboard
