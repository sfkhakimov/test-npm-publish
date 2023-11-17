import { VoyagerStatusesEnum } from '../../constants/constants'
import { VoyagerPopperPlacement } from '../Popper/types'
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

export type VoyagerHelpersType = {
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
    popper?: CSSProperties
}

type SharedProps = {
    rootEl?: string
    localStorageKey?: string
    loadingTimeout?: number
    loader?: JSX.Element
    steps: StepType[]
    styles?: StylesType
    padding?: Padding
    placement?: VoyagerPopperPlacement
    disableInteraction?: boolean
    afterOpen?: (target: Element | null) => void
    beforeClose?: (target: Element | null) => void
    onClickHighlighted?: MouseEventHandler<SVGRectElement>
    scrollSmooth?: boolean
    PopperContent: ComponentType<PopperContentProps>
    Wrapper?: ComponentType
    startAt?: number
    onChangeStep?: (step: StepType, currentStep: number) => Promise<void> | void
}

export type PopperContentProps = VoyagerStoreType &
    VoyagerHelpersType &
    StepType

export type ComponentPadding = number | [number, number]
export type Padding =
    | number
    | {
          mask?: ComponentPadding
          popper?: ComponentPadding
          wrapper?: ComponentPadding
      }

type VoyagerContextSetStatesType = {
    setSteps: Dispatch<React.SetStateAction<StepType[]>>
    setStatus: Dispatch<SetStateAction<VoyagerStatusesEnum>>
    setCurrentStep: Dispatch<React.SetStateAction<number>>
}

export type VoyagerStoreType = {
    status: VoyagerStatusesEnum
    prevStep?: StepType
    currStep?: StepType
    nextStep?: StepType
    isOpen: boolean
    currentStep: number
    steps: StepType[]
} & Pick<SharedProps, 'startAt'>

export type VoyagerContextType = VoyagerStoreType &
    VoyagerContextSetStatesType &
    Pick<
        VoyagerProviderProps,
        'beforeStart' | 'beforeStop' | 'afterStart' | 'afterStop'
    >

export type VoyagerProps = Omit<
    SharedProps,
    'defaultOpen' | 'localStorageKey' | 'steps'
>

export type VoyagerProviderProps = SharedProps & {
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
    title?: ReactNode | ((props: PopperContentProps) => void)
    content: ReactNode | ((props: PopperContentProps) => void)
    placement?: VoyagerPopperPlacement
    stepInteraction?: boolean
    padding?: Padding
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
