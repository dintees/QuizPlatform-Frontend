import React from 'react'

interface Props {
    type?: string,
    value: string | JSX.Element,
    style?: React.CSSProperties,
    disabled?: boolean,
    tooltip?: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

function Button(props: Props) {
    return (
        <button data-tooltip={props.tooltip} className={`mt-1 mb-1 animated btn ${props.type !== undefined ? "btn-" + props.type : ""} ${!!props.tooltip && 'tooltip'}`} disabled={props.disabled === true} onClick={props.onClick} style={props.style !== undefined ? props.style : {}}>
            {props.value}
        </button>
    )
}

export default Button
