import { Tour } from './components/Tour'
import { TourStatusesEnum } from './constants/constants'
import { useTourHelpers } from './hooks'
import TourContext, {
    TourProvider,
    useTour,
} from './providers/TourProvider/TourProvider'

export default Tour
export {
    Tour,
    TourContext,
    TourProvider,
    useTour,
    useTourHelpers,
    TourStatusesEnum,
}

export type {
    StepType,
    ProviderProps,
    TourProps,
    PopoverContentProps,
    TourHelpersType,
} from './components/Tour/types'
