import { useEffect } from 'react'

const DEFAULT_CONFIG: ResizeObserverOptions = {
    box: 'content-box',
}

type Args = {
    root: Element | null
    callback: ResizeObserverCallback
    options?: ResizeObserverOptions
    enable?: boolean
}

export const useResizeObserver = ({
    root,
    callback,
    options = DEFAULT_CONFIG,
    enable = true,
}: Args) => {
    useEffect(() => {
        if (!root || !enable) return

        const observer = new ResizeObserver(callback)

        observer.observe(root, options)

        return () => {
            observer.disconnect()
        }
    }, [root, enable, options, callback])
}
