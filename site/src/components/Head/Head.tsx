import React from 'react'
import Header from '../Header/Header'
import { BsPlayFill } from 'react-icons/bs'
import { AiOutlineArrowDown } from 'react-icons/ai'

const Head = () => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
            }}
            className="flex"
        >
            <div className="mx-auto flex max-w-screen-xl flex-1 flex-col">
                <Header />
                <div className="flex items-center justify-center pt-48">
                    <h1 className="max-w-5xl text-center text-5xl font-semibold text-gray-200">
                        ReactGuide библиотека для создания интерактивных
                        инструкций
                    </h1>
                </div>
                <div className="mx-auto flex max-w-2xl pt-40">
                    <button className="mr-10 flex rounded-md bg-blue-900 p-3 text-gray-200 shadow-lg shadow-blue-500/50 transition-colors hover:bg-blue-800 active:bg-blue-950">
                        <span className="mr-2">Запустить инструкцию</span>
                        <BsPlayFill fontSize="24px" />
                    </button>
                    <button className="flex rounded-md bg-gray-700 p-3 text-gray-200 shadow-lg shadow-blue-500/50 transition-colors hover:bg-gray-600 active:bg-gray-800">
                        <span className="mr-2">Открыть документацию</span>
                        <AiOutlineArrowDown fontSize="24px" />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Head
