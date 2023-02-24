import { StepType } from '../types'
import { useMutationObserver } from './useMutationObserver'
import { useResizeObserver } from './useResizeObserver'
import { debounce } from 'lodash'
import {
    useCallback,
    Dispatch,
    SetStateAction,
    MutableRefObject,
    useRef,
} from 'react'

type Args = {
    target: Element | null
    setOverlayHeight: Dispatch<SetStateAction<number>>
    setTarget: Dispatch<SetStateAction<Element | null>>
    observableRefresher: () => void
    stepRef: MutableRefObject<StepType>
}

const useObserver = ({
    target,
    setOverlayHeight,
    setTarget,
    observableRefresher,
    stepRef,
}: Args) => {
    const ref = useRef(document.documentElement || document.body)

    const debouncedRefresh = useCallback(debounce(observableRefresher, 100), [
        observableRefresher,
    ])

    const mutationObserverCallback = useCallback(
        debounce((mutationList: MutationRecord[]) => {
            const { selector } = stepRef.current

            setOverlayHeight(prev => {
                const docHeight = document.body.clientHeight
                return docHeight !== prev ? docHeight : prev
            })

            setTarget(prev => {
                const el = document.querySelector(selector as string)

                if (!el) return null

                if (!prev) return el

                return prev === el ? prev : el
            })
        }, 1000),
        []
    )

    const resizeObserverCallback = useCallback(() => {
        setOverlayHeight(prev => {
            const docHeight = document.body.clientHeight
            return docHeight !== prev ? docHeight : prev
        })

        debouncedRefresh()
    }, [debouncedRefresh])

    useMutationObserver({
        root: ref.current,
        callback: mutationObserverCallback,
    })

    useResizeObserver({
        root: target,
        callback: resizeObserverCallback,
        enable: !!target,
    })
}

export default useObserver
