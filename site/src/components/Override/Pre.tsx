import React, { useRef, useState } from 'react'
import { Highlight, RenderProps, themes } from 'prism-react-renderer'
import { IoCopyOutline } from 'react-icons/io5'
import { IoCheckmarkDone } from 'react-icons/io5'

type Props = {
    children: {
        props: {
            children: string
            className: string
        }
    }
}
export const Pre: React.FC<Props> = (props) => {
    const { children, className } = props.children.props
    const language = className?.substring(9) || 'js'

    const codeRef = useRef<HTMLPreElement | null>(null)
    const [copied, setCopied] = useState(false)

    const copyToClipboard = () => {
        if (copied) return

        codeRef.current?.textContent &&
            void navigator.clipboard.writeText(codeRef.current?.textContent)
        setCopied(true)

        const timer = setTimeout(() => {
            setCopied(false)
            clearTimeout(timer)
        }, 2000)
    }

    const Icon = copied ? IoCheckmarkDone : IoCopyOutline
    return (
        <Highlight theme={themes.oneDark} code={children} language={language}>
            {({ style, tokens, getLineProps, getTokenProps }: RenderProps) => (
                <pre
                    style={style}
                    className="group relative my-4 overflow-scroll rounded p-4 text-sm"
                    ref={codeRef}
                >
                    <div
                        onClick={copyToClipboard}
                        className="absolute right-2.5 top-2.5 cursor-pointer rounded-md border p-2 opacity-0 transition hover:border-blue-300 hover:text-blue-300 group-hover:opacity-100"
                    >
                        <Icon />
                    </div>
                    {tokens.map((line, i) =>
                        i === tokens.length - 1 &&
                        line.length === 1 &&
                        line[0].empty ? null : (
                            <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                    <span
                                        key={key}
                                        {...getTokenProps({ token })}
                                    />
                                ))}
                            </div>
                        ),
                    )}
                </pre>
            )}
        </Highlight>
    )
}
