import { PopperContentProps } from 'lib/src'
import React from 'react'

const PopperContent = ({
    content,
    goNextStep,
    goBackStep,
    skip,
    disableBackStepBtn,
    disableNextStepBtn,
}: PopperContentProps) => {
    const buttons = [
        {
            label: 'skip',
            className:
                'bg-red-500/25 shadow shadow-red-500 hover:bg-red-500/50 active:bg-red-500/75 transition',
            onClick: skip,
        },
        {
            label: 'back',
            className: disableBackStepBtn
                ? 'bg-gray-500/75'
                : 'bg-gray-500/25 shadow shadow-gray-500 hover:bg-gray-500/50 active:bg-gray-500/75 transition',
            onClick: goBackStep,
            disabled: disableBackStepBtn,
        },
        {
            label: 'next',
            className: disableNextStepBtn
                ? 'bg-blue-500'
                : 'bg-blue-500/25 shadow shadow-blue-500 hover:bg-blue-500/50 active:bg-blue-500/75 transition',
            onClick: goNextStep,
            disabled: disableNextStepBtn,
        },
    ]

    return (
        <div className="max-w-md p-4">
            <div className="pb-4">{content}</div>
            <div className="grid grid-cols-3 gap-2">
                {buttons.map(({ className, onClick, label, disabled }) => (
                    <button
                        className={`${className} col-span-1 rounded-lg border p-2`}
                        onClick={onClick}
                        disabled={disabled}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default PopperContent
