import * as React from 'react'
import type { PageProps } from 'gatsby'
import { Head } from '../components/Head'
import Introduction from '../docs/Introduction.mdx'
import QuickStart from '../docs/QuickStart.mdx'
import Navigation from '../components/Navigation/Navigation'
import { MDXProvider } from '@mdx-js/react'
import { components } from '../components/Override'

const IndexPage: React.FC<PageProps> = () => {
    return (
        <div>
            <div
                style={{
                    background: 'radial-gradient(at center, #BF3762, #10145D)',
                }}
            >
                <Head />
            </div>
            <div>
                <main
                    className="bg-gray-800 "
                    style={{
                        height: '2000px',
                    }}
                >
                    <div className="divider-x mx-auto grid h-full max-w-screen-xl grid-cols-6 gap-4 pt-12 text-gray-200">
                        <MDXProvider components={components}>
                            <div className="col-span-1">
                                <Navigation />
                            </div>
                            <div className="col-span-5">
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
    )
}

export default IndexPage
