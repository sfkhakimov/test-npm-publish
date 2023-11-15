import React, { PropsWithChildren } from 'react'

export const Code: React.FC<PropsWithChildren> = ({ children }) => {
    return <code className="mx-1 rounded bg-neutral-700 px-1">{children}</code>
}
