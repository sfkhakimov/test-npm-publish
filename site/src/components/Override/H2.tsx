import React, { PropsWithChildren } from 'react'
export const H2: React.FC<PropsWithChildren> = ({ children }) => (
    <h2 className="text-2xl">{children}</h2>
)
