import React, { useEffect, useState } from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useVoyager } from 'react-voyager/src'

const Column = () => {
    const { isOpen } = useVoyager()
    const [direction, setDirection] = useState('left')
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        if (!isOpen) return

        const interval = setInterval(() => {
            setDirection((prevDirection) =>
                prevDirection === 'right' ? 'left' : 'right',
            )

            return () => {
                clearInterval(interval)
                setDirection('left')
            }
        }, 2000)

        return () => {
            setDirection('left')
            clearInterval(interval)
        }
    }, [isOpen])

    useEffect(() => {
        if (!isOpen && !isVisible) return

        const timer = setTimeout(() => {
            setIsVisible(true)
            clearTimeout(timer)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [isVisible])

    return (
        <div className="flex h-full w-[300px] flex-col justify-between">
            <div className="relative h-[300px] w-full">
                <div
                    data-voyager="transitionend"
                    className={`absolute top-[50%] translate-y-[-50%] text-red-400/75 transition-all ${
                        direction === 'right'
                            ? 'left-full translate-x-[-100%]'
                            : 'left-0'
                    } `}
                >
                    <AiFillStar fontSize={48} />
                </div>
            </div>

            <div className="relative h-[100px] w-full">
                <button
                    data-voyager="localStorage"
                    onClick={() => window.location.reload()}
                    disabled={!isOpen}
                    className={`${
                        isOpen
                            ? 'bg-blue-400/50 hover:bg-blue-400/25 active:bg-blue-500/25'
                            : 'bg-gray-500'
                    } h-full w-full rounded-lg shadow-2xl shadow-gray-600/50 transition`}
                >
                    {isOpen
                        ? 'Click to reload page'
                        : 'Button will become available after starting guide.'}
                </button>
            </div>

            <div className="relative flex h-[300px] w-full justify-center">
                {isVisible && (
                    <button
                        data-voyager="mutationObserver"
                        disabled={!isOpen}
                        onClick={() => setIsVisible(false)}
                        className={`m-auto block h-[200px] w-[200px] shadow ${
                            isOpen
                                ? 'bg-blue-400/50 hover:bg-blue-400/25 active:bg-blue-500/25'
                                : 'bg-gray-500'
                        } rounded-full bg-blue-400/50 p-2 shadow-2xl shadow-gray-600/50 transition`}
                    >
                        {isOpen
                            ? 'Press the button, and the element will disappear for 3 seconds.'
                            : 'Button will become available after starting guide.'}
                    </button>
                )}
            </div>
        </div>
    )
}

export default Column
