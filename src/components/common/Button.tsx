import React from 'react'

interface Props {
    type?: string,
    value: string,
    style?: React.CSSProperties,
    onClick?: () => void
}

function Button(props: Props) {
    return (
        <button className={`mt-1 mb-1 animated btn ${props.type !== undefined ? "btn-" + props.type : ""}`} onClick={props.onClick} style={props.style !== undefined ? props.style : {}}>
            {props.value}
        </button>
    )
}

export default Button