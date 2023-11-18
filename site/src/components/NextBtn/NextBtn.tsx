import React from 'react'
import { useVoyager, useVoyagerHelpers } from 'react-voyager/src'

const NextBtn = () => {
    const { isOpen } = useVoyager()
    const { goNextStep } = useVoyagerHelpers()

    return (
        <button
            disabled={!isOpen}
            onClick={goNextStep}
            data-voyager="next-btn"
            className={`mx-auto block h-[200px] w-[200px] shadow ${
                isOpen
                    ? 'bg-blue-400/50 hover:bg-blue-400/25 active:bg-blue-500/25'
                    : 'bg-gray-500'
            } rounded-full bg-blue-400/50 shadow-2xl shadow-gray-600/50 transition`}
        >
            {isOpen
                ? 'Next step'
                : 'Button will become available after starting guide.'}
        </button>
    )
}

export default NextBtn
