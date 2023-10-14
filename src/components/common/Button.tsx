import React from 'react'

interface Props {
    type?: string,
    value: string | JSX.Element,
    style?: React.CSSProperties,
    disabled?: boolean,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button(props: Props) {
    return (
        <button className={`mt-1 mb-1 animated btn ${props.type !== undefined ? "btn-" + props.type : ""}`} disabled={props.disabled === true} onClick={props.onClick} style={props.style !== undefined ? props.style : {}}>
            {props.value}
        </button>
    )
}

export default Button
