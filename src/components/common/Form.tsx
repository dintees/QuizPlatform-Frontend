import React from 'react'
import { IFormField } from '../../Types'


interface Props {
    formFields: IFormField[]
    setFormFields: React.Dispatch<React.SetStateAction<IFormField[]>>
}

function Form(props: Props) {
    
    const handleValueChange = (name: string, value: string) => {
        props.setFormFields((prev: IFormField[]) => {
            const newState = prev.map(obj => {
                if (obj.name === name) return {...obj, value: value }

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
            <form onSubmit={handleFormSubmit}>
                {props.formFields.map((field: IFormField, index: number) => {
                    return (
                        <input key={index} type={field.type} value={field.value !== undefined ? field.value : ""} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleValueChange(field.name, e.target.value)} />
                    )
                })}

                {/* <button type="submit">Submit</button> */}
            </form>

            <div>{props.formFields.length}</div>
        </>
    )
}

export default Form
