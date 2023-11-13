import { useEffect } from 'react'

const DEFAULT_CONFIG: MutationObserverInit = { childList: true, subtree: true }

type Args = {
    root: HTMLElement | null
    callback: MutationCallback
    options?: MutationObserverInit
    enable?: boolean
}

export const useMutationObserver = ({
    root,
    callback,
    options = DEFAULT_CONFIG,
    enable = true,
}: Args) => {
    useEffect(() => {
        if (!root || !enable) return

        const observer = new MutationObserver(callback)

        observer.observe(root, options)

        return () => {
            observer.disconnect()
        }
    }, [callback, options, root, enable])
}
