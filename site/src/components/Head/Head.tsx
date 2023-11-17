import React, { useEffect, useRef } from 'react'
import Header from '../Header/Header'
import { BsPlayFill } from 'react-icons/bs'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useGuideHelpers } from 'lib/src'
import Typed from 'typed.js'

const Head = () => {
    const { start } = useGuideHelpers()
    const el = useRef(null)

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                'ReactGuide - a simple library for interactive guides!',
                'ReactGuide - has a clear API!',
                'ReactGuide - an excellent solution for creating instructional guides!',
            ],
            typeSpeed: 10,
            loop: true,
        })

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy()
        }
    }, [])

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
            }}
        >
            <Header />
            <div className="mx-auto flex max-w-screen-xl flex-1 flex-col">
                <div className="flex items-center justify-center pt-48">
                    <h1 className="max-w-5xl text-center text-5xl font-semibold text-gray-200">
                        ReactGuide is a library for creating interactive guides.
                    </h1>
                </div>
                <div className="mx-auto flex max-w-2xl pt-40">
                    <button
                        data-guide="one"
                        className="mr-10 hidden rounded-md bg-blue-900 p-3 text-gray-200 shadow-lg shadow-blue-500/50 transition-colors hover:bg-blue-800 active:bg-blue-950 lg:flex"
                        onClick={start}
                    >
                        <span className="mr-2">Start guide</span>
                        <BsPlayFill fontSize="24px" />
                    </button>
                    <button className="flex rounded-md bg-gray-700 p-3 text-gray-200 shadow-lg shadow-blue-500/50 transition-colors hover:bg-gray-600 active:bg-gray-800">
                        <a className="mr-2" href="#introduction">
                            Go to documentation
                        </a>
                        <AiOutlineArrowDown fontSize="24px" />
                    </button>
                </div>
                <div
                    className="mx-auto mt-24 rounded bg-stone-900/50 p-2"
                    data-guide="Three"
                >
                    <span ref={el} className="text-gray-200" />
                </div>
            </div>
        </div>
    )
}

export default Head
