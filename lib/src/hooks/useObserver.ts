import { StepType } from '../components/Voyager/types'
import { useMutationObserver } from './useMutationObserver'
import { useResizeObserver } from './useResizeObserver'
import { debounce, throttle } from 'lodash'
import {
    useCallback,
    Dispatch,
    SetStateAction,
    MutableRefObject,
    useRef,
} from 'react'

type Args = {
    target: Element | null
    setTarget: Dispatch<SetStateAction<Element | null>>
    domObserver: () => void
    elObserver: () => void
    stepRef: MutableRefObject<StepType>
}

const useObserver = ({
    target,
    domObserver,
    setTarget,
    elObserver,
    stepRef,
}: Args) => {
    const ref = useRef(document.documentElement || document.body)

    const debouncedRefresh = useCallback(debounce(elObserver, 100), [
        elObserver,
    ])

    const mutationObserverCallback = useCallback(
        throttle((mutationList: MutationRecord[]) => {
            const { selector } = stepRef.current

            setTarget((prev) => {
                const el = document.querySelector(selector)

                if (!el) return null

                if (!prev) return el

                return prev === el ? prev : el
            })
        }, 100),
        []
    )

    const resizeDomObserver = useCallback(() => {
        domObserver()
    }, [domObserver])

    useMutationObserver({
        root: ref.current,
        callback: mutationObserverCallback,
    })

    useResizeObserver({
        root: target,
        callback: debouncedRefresh,
        enable: !!target,
    })

    useResizeObserver({
        root: document.body,
        callback: resizeDomObserver,
        enable: true,
    })
}

export default useObserver
