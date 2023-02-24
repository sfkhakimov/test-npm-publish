export type StyleFn = (
    props: { [key: string]: any },
    state?: { [key: string]: any }
) => React.CSSProperties

export type Styles = {
    popover: StyleFn
}

export type StyleKey = keyof Styles

export const defaultStyles: Styles = {
    popover: () => ({
        position: 'absolute',
        backgroundColor: '#fff',
        borderRadius: 8,
        boxShadow: '0 0.5em 3em rgba(0, 0, 0, 0.3)',
        zIndex: 100000,
        transition: 'transform 0.3s',
        top: 0,
        left: 0,
        color: '#000',
    }),
}

export function stylesMatcher() {
    return (key: StyleKey, state: {}): {} => defaultStyles[key](state)
}
