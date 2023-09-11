import React from 'react'
import { IFormField } from '../../Types'
import TextField from './TextField'


interface Props {
    formFields: IFormField[]
    setFormFields: React.Dispatch<React.SetStateAction<IFormField[]>>
}

function Form(props: Props) {

    const handleValueChange = (name: string, value: string) => {
        props.setFormFields((prev: IFormField[]) => {
            const newState = prev.map(obj => {
                if (obj.name === name) return { ...obj, value: value }

                return obj;
            })
            return newState;
        });
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("SUBMITTED!!!");
        console.log(props.formFields);
    }

    return (
        <>
            <form onSubmit={handleFormSubmit} className='form'>
                {props.formFields.map((field: IFormField, index: number) => {
                    return (
                        <div key={index} className='form-row'>
                            <div className="form-label">{field.name}</div>
                            <div className="form-control"><TextField key={index} value={field.value!} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(field.name, e.target.value)} /></div>
                        </div>
                    )
                })}

                <button type="submit" className='mt-2 btn btn-primary animated'>Save</button>
            </form>
        </>
    )
}

export default Form
