import React, { PropsWithChildren } from 'react'

export const Link: React.FC<PropsWithChildren> = ({ children, ...other }) => (
    <a
        {...other}
        className="pb2 group mb-4 flex border-b border-gray-200/25 pb-4"
    >
        <p className="pr-2">{children}</p>
        <p className="opacity-0 transition-opacity group-hover:opacity-100">
            #
        </p>
    </a>
)
