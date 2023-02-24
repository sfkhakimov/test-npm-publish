import { useTour } from './providers/TourProvider'
import React from 'react'

export default function withTour<P>(WrappedComponent: React.ComponentType<P>) {
    const ComponentWithTour = (props: P) => {
        const tourProps = useTour()
        return <WrappedComponent {...props} {...tourProps} />
    }
    return ComponentWithTour
}
