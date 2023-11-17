import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { DiNpm } from 'react-icons/di'

const Header = () => {
    return (
        <div className="flex h-16 items-center justify-center border-b border-b-gray-200">
            <div className="mx-4 flex w-full max-w-screen-xl justify-between">
                <h1 className="text-3xl font-bold text-gray-200">
                    ReactVoyager
                </h1>
                <div className="flex items-center justify-center">
                    <a
                        href="https://yandex.ru"
                        target="_blank"
                        className="mr-6"
                    >
                        <AiFillGithub fontSize={36} color="white" />
                    </a>
                    <a href="https://yandex.ru" target="_blank">
                        <DiNpm fontSize={36} color="white" />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Header
