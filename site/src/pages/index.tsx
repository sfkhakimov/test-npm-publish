import React from 'react'
import type { PageProps } from 'gatsby'
import { Head } from '../components/Head'
import Introduction from '../docs/Introduction.mdx'
import QuickStart from '../docs/QuickStart.mdx'
import { MDXProvider } from '@mdx-js/react'
import { components } from '../components/Override'
import { VoyagerProvider } from 'react-voyager/src'
import { steps } from '../constants'
import { PopperContent } from '../components/PopperContent'
import { Components } from '@mdx-js/react/lib'
import Types from '../docs/Types.mdx'
import { Footer } from '../components/Footer'
import { NextBtn } from '../components/NextBtn'
import { Column } from '../components/Column'
import { Loader } from '../components/Loader'
import Hooks from '../docs/Hooks.mdx'

const sections = [
    { link: 'introduction', DocsComponent: Introduction, Component: NextBtn },
    { link: 'quick-start', DocsComponent: QuickStart, Component: Column },
    { link: 'hooks', DocsComponent: Hooks },
    { link: 'types', DocsComponent: Types },
]

const IndexPage: React.FC<PageProps> = () => {
    return (
        <VoyagerProvider
            PopperContent={PopperContent}
            localStorageKey="voyager"
            steps={steps}
            disableInteraction
            loader={<Loader />}
        >
            <div>
                <div className="bg-gradient-to-tr from-slate-800 to-slate-700">
                    <Head />
                </div>
                <div>
                    <main className="bg-slate-900">
                        <div className="mx-auto flex max-w-screen-xl flex-col px-4 pt-12 text-gray-200">
                            <MDXProvider components={components as Components}>
                                {sections.map(
                                    ({ link, DocsComponent, Component }, i) => (
                                        <section
                                            className={`flex ${
                                                (i + 1) % 2 === 0
                                                    ? 'flex-row-reverse'
                                                    : ''
                                            } justify-between pb-14 pt-2`}
                                        >
                                            <div
                                                id={link}
                                                data-voyager={link}
                                                className={`${
                                                    Component
                                                        ? 'max-w-[900px]'
                                                        : 'w-full'
                                                } overflow-hidden`}
                                            >
                                                <DocsComponent />
                                            </div>
                                            {Component && (
                                                <div
                                                    className={`${
                                                        (i + 1) % 2 === 0
                                                            ? 'pr-4'
                                                            : 'pl-4'
                                                    } hidden md:block`}
                                                >
                                                    <Component />
                                                </div>
                                            )}
                                        </section>
                                    ),
                                )}
                            </MDXProvider>
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </VoyagerProvider>
    )
}

export default IndexPage
