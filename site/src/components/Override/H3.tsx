import React, { PropsWithChildren } from 'react'
export const H3: React.FC<PropsWithChildren> = ({ children }) => (
    <h3 className="text-lg">{children}</h3>
)
