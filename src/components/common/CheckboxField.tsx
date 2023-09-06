import React from 'react'

interface Props {
    name: string,
    checked: boolean,
    label?: string | JSX.Element,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    readonly?: boolean
}

function CheckboxField(props: Props) {
    return (
        <>
            <div>
                <input className="radio-field" type="checkbox" checked={props.checked} onChange={props.onChange} disabled={props.readonly} />
                {props.label}
            </div>
        </>
    )
}

export default CheckboxField
