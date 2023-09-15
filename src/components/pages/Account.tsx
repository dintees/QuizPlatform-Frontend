import React, { useContext, useEffect, useState } from 'react'
import Form from '../common/Form'
import { IAuthInformation, IFormField } from '../../Types'
import { putData } from '../../AxiosHelper'
import { AuthContext } from '../../App';

function Account() {

    const { auth, setAuth } = useContext(AuthContext);
    const [formFields, setFormFields] = useState<IFormField[]>([])
    useEffect(() => {
        setFormFields([
            { name: "First name", key: "firstname", value: auth.firstname, type: "text" },
            { name: "Last name", key: "lastname", value: auth.lastname, type: "text" },
            { name: "Username", key: "username", value: auth.username, type: "text", disabled: true },
        ])
    }, [auth])

    const handleAccountFormSubmit = async (e: React.FormEvent) => {
        const userData: Record<string, string> = {};
        formFields.forEach(field => {
            if (field.key === 'firstname' || field.key === 'lastname') {
                userData[field.key] = field.value!;
                setAuth((prev: IAuthInformation) => { return { ...prev, [field.key]: field.value! } })
            }
        });

        const a = await putData("user/edit", userData, true)
        console.log(a);

    }

    return (
        <>
            <div className="content-title">Account settings</div>

            <Form formFields={formFields} setFormFields={setFormFields} onSubmit={handleAccountFormSubmit} />
        </>
    )
}

export default Account
