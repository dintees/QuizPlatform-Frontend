import React from 'react'
import { IFormField } from '../../../Types'
import TextField from '../../controls/TextField'


interface Props {
    formFields: IFormField[]
    setFormFields: React.Dispatch<React.SetStateAction<IFormField[]>>,
    onSubmit?: (e: React.FormEvent) => void
}

function Form(props: Props) {
    const handleValueChange = (key: string, value: string) => {
        props.setFormFields((prev: IFormField[]) => {
            const newState = prev.map(obj => {
                if (obj.key === key) return { ...obj, value: value }

                return obj;
            })
            return newState;
        });
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!!props.onSubmit)
            props.onSubmit(e);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                {props.formFields.map((field: IFormField, index: number) => {
                    return (
                        <div key={index} className='form-row'>
                            <div className="form-label">{field.name}</div>
                            <div className="form-control"><TextField key={index} type={field.type} value={field.value!} disabled={field.disabled} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(field.key, e.target.value)} /></div>
                        </div>
                    )
                })}

                <button type="submit" className='mt-2 btn btn-primary animated'>Save</button>
            </form>
        </>
    )
}

export default Form
