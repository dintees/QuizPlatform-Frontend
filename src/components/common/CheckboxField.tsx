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

function CheckboxField(props: Props) {
    return (
        <>
            <div className={`form-control ${props.className}`} style={props.style}>
                <input className="radio-field" type="checkbox" checked={props.checked} onChange={props.onChange} disabled={props.readonly} />
                {props.label}
            </div>
        </>
    )
}

export default CheckboxField
