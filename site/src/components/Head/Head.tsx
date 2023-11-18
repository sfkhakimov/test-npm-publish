import React, { useEffect, useRef } from 'react'
import Header from '../Header/Header'
import { BsPlayFill } from 'react-icons/bs'
import { AiOutlineArrowDown } from 'react-icons/ai'
import { useVoyagerHelpers } from 'react-voyager/src'
import Typed from 'typed.js'

const Head = () => {
    const { start } = useVoyagerHelpers()
    const el = useRef(null)

    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: [
                'ReactVoyager - a simple library for interactive guides!',
                'ReactVoyager - has a clear API!',
                'ReactVoyager - an excellent solution for creating instructional guides!',
            ],
            typeSpeed: 5,
            backSpeed: 5,
            backDelay: 2000,
            loop: true,
        })

        return () => {
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
                <div className="flex items-center justify-center pt-24 md:pt-48">
                    <h1 className="max-w-5xl text-center text-4xl font-semibold text-gray-200 md:text-5xl">
                        ReactVoyager is a library for creating interactive
                        guides.
                    </h1>
                </div>
                <div className="mx-auto flex max-w-2xl pt-20 md:pt-40">
                    <button
                        data-voyager="first-step"
                        className="mr-10 hidden rounded-md bg-blue-600/75 p-3 text-gray-200 shadow-lg shadow-blue-500/50 transition-colors hover:bg-blue-800 active:bg-blue-950 md:flex"
                        onClick={start}
                    >
                        <span className="mr-2">Start guide</span>
                        <BsPlayFill fontSize="24px" />
                    </button>
                    <button className="flex rounded-md bg-gray-800 p-3 text-gray-200 shadow-lg shadow-gray-600/50 transition-colors hover:bg-gray-800/50 active:bg-gray-800/75">
                        <a className="mr-2" href="#introduction">
                            Go to documentation
                        </a>
                        <AiOutlineArrowDown fontSize="24px" />
                    </button>
                </div>
                <div
                    className="mx-auto mt-16 rounded bg-stone-900/50 p-2 md:mt-24"
                    data-voyager="resizeObserver"
                >
                    <span ref={el} className="text-gray-200" />
                </div>
            </div>
        </div>
    )
}

export default Head
