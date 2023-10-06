import React from 'react'

interface Props {
    name: string,
    checked: boolean,
    label?: string | JSX.Element,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readonly?: boolean,
    style?: React.CSSProperties,
    className?: string,
}

function RadioField(props: Props) {
    return (
        <>
            <div className={`form-control ${props.className}`}>
                <input className="radio-field" type="radio" checked={props.checked} onChange={props.onChange} disabled={props.readonly} />
                {props.label}
            </div>
        </>
    )
}

export default RadioField
