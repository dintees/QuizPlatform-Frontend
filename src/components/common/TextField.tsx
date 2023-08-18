import React from 'react'

interface Props {
    defaultValue?: string,
    placeholder?: string,
    style?: React.CSSProperties
}

function TextField(props: Props) {
    return (
        <input className='textfield' type="text"
            value={props.defaultValue !== undefined ? props.defaultValue : ""}
            placeholder={props.placeholder !== undefined ? props.placeholder : ""}
            style={props.style !== undefined ? props.style : {}}
        />
    )
}

export default TextField
