import React from 'react'

interface Props {
    name: string,
    checked: boolean,
    label?: string | JSX.Element,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readonly?: boolean
}

function RadioField(props: Props) {
    return (
        <>
            <div>
                <input className="radio-field" type="radio" checked={props.checked} onChange={props.onChange} disabled={props.readonly} />
                {props.label}
            </div>
        </>
    )
}

export default RadioField
