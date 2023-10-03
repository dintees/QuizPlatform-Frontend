import React, { useEffect, useState } from 'react'
import Form from '../common/Form'
import { IChangePassword, IFormField } from '../../Types'
import { getData, putData } from '../../AxiosHelper'
import { toast } from 'react-toastify';

function Account() {

    const [accountFormFields, setAccountFormFields] = useState<IFormField[]>([])
    const [passwordFormFields, setPasswordFormFields] = useState<IFormField[]>([
        { name: "Old password", key: "oldPassword", value: "", type: "password" },
        { name: "New password", key: "newPassword", value: "", type: "password" },
        { name: "Conform password", key: "newPasswordConfirmation", value: "", type: "password" }
    ])
    useEffect(() => {

        const fetchData = async () => {
            const result = await getData("user/getuserprofile", true);

            switch (result?.status) {
                case 200:
                    setAccountFormFields([
                        { name: "First name", key: "firstname", value: result.data.firstname, type: "text" },
                        { name: "Last name", key: "lastname", value: result.data.lastname, type: "text" },
                        { name: "Username", key: "username", value: result.data.username, type: "text", disabled: true },
                        { name: "Email", key: "email", value: result.data.email, type: "text", disabled: true },
                    ])
                    break;
                case 400:
                    toast.error("Unexpected error")
                    break;
                case 401:
                    toast.error("Unauthorized")
                    break;
                default:
                    toast.error("Problem with server connection")
            }
        }
        fetchData();
    }, [])

    const handleAccountFormSubmit = async (e: React.FormEvent) => {
        const userData: Record<string, string> = {};
        accountFormFields.forEach(field => {
            if (field.key === 'firstname' || field.key === 'lastname') {
                userData[field.key] = field.value!;
            }
        });

        const result = await putData("user/edit", userData, true)
        switch (result?.status) {
            case 200:
                toast.success("Successfully saved")
                break;
            case 400:
                toast.error(result.data ?? "Unexpedted error")
                break;
            default:
                toast.error("Problem with server connection")
        }
    }

    return (
        <>
            <div className="content-title">Account settings</div>

            <Form formFields={accountFormFields} setFormFields={setAccountFormFields} onSubmit={handleAccountFormSubmit} />

            <Form formFields={passwordFormFields} setFormFields={setPasswordFormFields} onSubmit={() => console.log(passwordFormFields)} />
        </>
    )
}

export default Account
