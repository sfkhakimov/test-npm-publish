import React from 'react'

const links = [
    {
        title: 'Введение',
        link: '#introduction',
    },
    {
        title: 'Быстрый старт',
        link: '#quick-start',
    },
    {
        title: 'Типы',
        link: '#types',
    },
]

const Navigation = () => {
    return (
        <div className="h-full">
            <ul className="sticky top-6">
                {links.map((item) => (
                    <li
                        className={`mb-1 cursor-pointer rounded-md p-1 ${
                            window.location.hash.includes(item.link)
                                ? 'bg-blue-400/50'
                                : 'hover:bg-blue-400/25'
                        }`}
                    >
                        <a href={item.link} target="_self" className="block">
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navigation
