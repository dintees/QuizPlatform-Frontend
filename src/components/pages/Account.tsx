import React, { useState } from 'react'
import Form from '../common/Form'
import { IFormField } from '../../Types'

interface Props { }

function Account(props: Props) {

    const [formFields, setFormFields] = useState<IFormField[]>([
        { name: "firstName", value: "Adam", type: "text" },
        { name: "lastName", value: "Abacki", type: "text" },
        { name: "userName", value: "AdamAbacki", type: "text" },
    ])

    return (
        <>
            <div className="content-title">Account settings</div>

            <Form formFields={formFields} setFormFields={setFormFields} />
        </>
    )
}

export default Account
