import { TourStatusesEnum } from '../../constants/constants'
import { TutorialPopperPlacement } from '../Popper/types'
import {
    ReactNode,
    Dispatch,
    MouseEventHandler,
    ComponentType,
    SetStateAction,
    CSSProperties,
} from 'react'
import * as React from 'react'

export type PopperRectType = {
    left: number
    top: number
    right: number
    bottom: number
}

export type TourHelpersType = {
    start: () => Promise<void>
    stop: () => Promise<void>
    skip: () => void
    goToStep: (newStep: number) => void
    goNextStep: () => Promise<void>
    goBackStep: () => Promise<void>
    updateSteps: (
        selector: StepType['selector'],
        data: Partial<StepType>
    ) => void
}

export type StylesType = {
    mask?: CSSProperties
    overlay?: CSSProperties
    popover?: CSSProperties
}

type SharedProps = {
    rootEl?: string
    localStorageKey?: string
    loadingTimeout?: number
    loader?: JSX.Element
    steps: StepType[]
    styles?: StylesType
    padding?: Padding
    placement?: TutorialPopperPlacement
    disableInteraction?: boolean
    afterOpen?: (target: Element | null) => void
    beforeClose?: (target: Element | null) => void
    onClickHighlighted?: MouseEventHandler<SVGRectElement>
    scrollSmooth?: boolean
    ContentComponent: ComponentType<PopoverContentProps>
    Wrapper?: ComponentType
    startAt?: number
    onChangeStep?: (step: StepType, currentStep: number) => Promise<void> | void
}

export type PopoverContentProps = TourStoreType & TourHelpersType & StepType

export type ComponentPadding = number | [number, number]
export type Padding =
    | number
    | {
          mask?: ComponentPadding
          popover?: ComponentPadding
          wrapper?: ComponentPadding
      }

type TourContextSetStatesType = {
    setSteps: Dispatch<React.SetStateAction<StepType[]>>
    setStatus: Dispatch<SetStateAction<TourStatusesEnum>>
    setCurrentStep: Dispatch<React.SetStateAction<number>>
}

export type TourStoreType = {
    status: TourStatusesEnum
    prevStep?: StepType
    currStep?: StepType
    nextStep?: StepType
    isOpen: boolean
    currentStep: number
    steps: StepType[]
} & Pick<SharedProps, 'startAt'>

export type TourContextType = TourStoreType &
    TourContextSetStatesType &
    Pick<
        ProviderProps,
        'beforeStart' | 'beforeStop' | 'afterStart' | 'afterStop'
    >

export type TourProps = Omit<
    SharedProps,
    'defaultOpen' | 'localStorageKey' | 'steps'
>

export type ProviderProps = SharedProps & {
    children: React.ReactNode
    defaultOpen?: boolean
    startAt?: number
    beforeStart?: () => Promise<void> | void
    afterStart?: () => Promise<void> | void
    beforeStop?: () => Promise<void> | void
    afterStop?: () => Promise<void> | void
}

export type StepType = {
    selector: string
    title?: ReactNode | ((props: PopoverContentProps) => void)
    content: ReactNode | ((props: PopoverContentProps) => void)
    placement?: TutorialPopperPlacement
    highlightedSelectors?: string[]
    navDotAriaLabel?: string
    stepInteraction?: boolean
    action?: (elem: Element | null) => void
    padding?: Padding
    bypassElem?: boolean
    styles?: StylesType
    loadingTimeout?: number
    onBeforeStep?: () => Promise<void> | void
    onAfterStep?: () => Promise<void> | void
    onChangeStep?: (step: StepType, currentStep: number) => Promise<void> | void
    meta?: Record<string, unknown>
    canDisplayWhenPageReload?: boolean
    disableNextStepBtn?: boolean
    disableBackStepBtn?: boolean
}
