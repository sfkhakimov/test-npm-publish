import * as React from 'react'
import type { HeadFC, PageProps } from 'gatsby'

const IndexPage: React.FC<PageProps> = () => {
    return (
        <div>
            <div
                style={{
                    height: '100vh',
                    width: '100vw',
                    background:
                        'linear-gradient(to right top, #05370f, #32550c, #657100, #a38b00, #eb9f12)',
                }}
            >
                <div class="flex max-lg">
                    <h1>ReactGuide</h1>
                </div>
            </div>
        </div>
    )
}

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
