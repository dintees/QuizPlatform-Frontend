import React from 'react'

interface Props {
    value: string,
    setValue?: React.Dispatch<React.SetStateAction<string>>,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    placeholder?: string,
    style?: React.CSSProperties,
    readonly?: boolean
}

function TextField(props: Props) {

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setValue !== undefined)
            props.setValue(e.target.value)
        else if (props.onChange !== undefined)
            return props.onChange(e)
    }

    return (
        <input className='text-field' type="text"
            value={props.value !== undefined ? props.value : ""}
            placeholder={props.placeholder !== undefined ? props.placeholder : ""}
            style={props.style !== undefined ? props.style : {}}
            onChange={handleChangeValue}
            disabled={props.readonly}
        />
    )
}

export default TextField
