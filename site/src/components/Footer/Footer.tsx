import React from 'react'
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'
import { RiTelegramFill } from 'react-icons/ri'

const socials = [
    {
        Icon: RiTelegramFill,
        link: 'https://t.me/sfkhakimov',
    },
    {
        Icon: AiFillInstagram,
        link: 'https://www.instagram.com/s.f.khakimov',
    },
    {
        Icon: AiFillLinkedin,
        link: 'https://www.linkedin.com/in/sfkhakimov',
    },
]

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-200">
            <div className="align-center m-auto flex max-w-2xl  justify-center px-2 py-4">
                <p>
                    &copy; 2023{' '}
                    <a
                        href="https://github.com/sfkhakimov"
                        target="_blank"
                        className="hover:underline"
                    >
                        sfkhakimov
                    </a>
                </p>
                <div className="align-center ml-2 flex justify-center">
                    {socials.map(({ Icon, link }) => (
                        <a href={link} target="_blank" className="mr-2">
                            <Icon fontSize={24} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    )
}

export default Footer
