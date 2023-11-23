import React, { ChangeEvent, HTMLInputTypeAttribute } from 'react'
import { InlineMath } from 'react-katex'

interface Props {
    value: string,
    placeholder?: string,
    style?: React.CSSProperties,
    readonly?: boolean,
    disabled?: boolean,
    mathMode?: boolean,
    type?: HTMLInputTypeAttribute,
    multiline?: boolean,
    setValue?: React.Dispatch<React.SetStateAction<string>>,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function TextField(props: Props) {
    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        renderMathPreview();

        if (props.setValue !== undefined)
            props.setValue(e.target.value)
        else if (props.onChange !== undefined)
            return props.onChange(e as ChangeEvent<HTMLInputElement>)
    }

    const renderMathPreview = () => {
        const replacedText = props.value.split(/\$(.*?)\$/g).map((part, index) => {
            return index % 2 === 0 ? part : <InlineMath key={index} math={part} renderError={(e) => <>{e.name}</>} />
        });
        return <>{replacedText}</>;
    }

    return (
        <>
            {props.disabled ?
                <span>
                    {props.mathMode ?
                        <span className='mb-1'>
                            {renderMathPreview()}
                        </span>
                        : <>
                            {props.value.split("\n").map((item, idx) => {
                                return (
                                    <span key={idx}>
                                        {item}<br />
                                    </span>
                                )
                            })}
                        </>
                    }
                </span> :
                <>

                    {!!props.multiline ?
                        <textarea className='text-field' onChange={handleChangeValue} value={props.value !== undefined ? props.value : ""}
                            placeholder={props.placeholder}
                            style={props.style}
                            disabled={props.disabled}></textarea>
                        :
                        <input className='text-field' type={props.type ? props.type : "text"}
                            value={props.value !== undefined ? props.value : ""}
                            placeholder={props.placeholder !== undefined ? props.placeholder : ""}
                            style={props.style !== undefined ? props.style : {}}
                            onChange={handleChangeValue}
                            disabled={props.readonly}
                        />
                    }

                    {/* math preview */}
                    {props.mathMode &&
                        <div className='text-field-preview'>
                            {renderMathPreview()}
                        </div>
                    }
                </>
            }
        </>
    )
}

export default TextField
