import React from 'react'
import { BlockMath } from 'react-katex'

interface Props {
    value: string,
    placeholder?: string,
    style?: React.CSSProperties,
    readonly?: boolean,
    disabled?: boolean,
    mathMode?: boolean,
    setValue?: React.Dispatch<React.SetStateAction<string>>,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function TextField(props: Props) {

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setValue !== undefined)
            props.setValue(e.target.value)
        else if (props.onChange !== undefined)
            return props.onChange(e)
    }

    return (
        <>
            {props.disabled ?
                <span>{props.value}</span> :
                <>
                    <input className='text-field' type="text"
                        value={props.value !== undefined ? props.value : ""}
                        placeholder={props.placeholder !== undefined ? props.placeholder : ""}
                        style={props.style !== undefined ? props.style : {}}
                        onChange={handleChangeValue}
                        disabled={props.readonly}
                    />
                    {props.mathMode &&
                        <div className='text-field-preview'>
                            <BlockMath math={props.value} renderError={(e) => <>{props.value}</>} />
                        </div>
                    }
                </>
            }
        </>
    )
}

export default TextField
