import * as React from 'react'
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

const IndexPage: React.FC<PageProps> = () => {
    return (
        <GuideProvider PopperContent={PopperContent} steps={steps}>
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
                            className="divider-x mx-auto grid h-full max-w-screen-xl grid-cols-6 gap-4 px-4 pt-12 text-gray-200"
                            data-guide="Two"
                        >
                            <MDXProvider components={components as Components}>
                                <div className="lg:col-end-0 hidden lg:block">
                                    <Navigation />
                                </div>
                                <div className="col-span-6 lg:col-span-5">
                                    {[Introduction, QuickStart].map((Item) => (
                                        <section className="pb-14">
                                            <Item />
                                        </section>
                                    ))}
                                </div>
                            </MDXProvider>
                        </div>
                    </main>
                </div>
            </div>
        </GuideProvider>
    )
}

export default IndexPage
