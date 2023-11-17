import React from 'react'
import type { PageProps } from 'gatsby'
import { Head } from '../components/Head'
import Introduction from '../docs/Introduction.mdx'
import QuickStart from '../docs/QuickStart.mdx'
import Navigation from '../components/Navigation/Navigation'
import { MDXProvider } from '@mdx-js/react'
import { components } from '../components/Override'
import { GuideProvider } from 'lib/src'
import { steps } from '../constants'
import { PopperContent } from '../components/PopperContent'
import { Components } from '@mdx-js/react/lib'
import Types from '../docs/Types.mdx'

const sections = [
    { link: 'introduction', Component: Introduction },
    { link: 'quick-start', Component: QuickStart },
    { link: 'types', Component: Types },
]

const IndexPage: React.FC<PageProps> = () => {
    return (
        <GuideProvider
            PopperContent={PopperContent}
            steps={steps}
            disableInteraction
        >
            <div>
                <div
                    style={{
                        background:
                            'radial-gradient(at center, #4b5563, #1f2937)',
                    }}
                >
                    <Head />
                </div>
                <div>
                    <main className="bg-gray-800">
                        <div
                            className="mx-auto flex max-w-screen-xl flex-col px-4 pt-12 text-gray-200"
                            data-guide="Two"
                        >
                            <MDXProvider components={components as Components}>
                                {sections.map(({ link, Component }) => (
                                    // <Element name={link}>
                                    <section
                                        className="pb-14 pt-2"
                                        id={link}
                                        data-guide={link}
                                    >
                                        <Component />
                                    </section>
                                    // </Element>
                                ))}
                            </MDXProvider>
                        </div>
                    </main>
                </div>
            </div>
        </GuideProvider>
    )
}

export default IndexPage
