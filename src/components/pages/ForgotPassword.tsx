import React, { useState, useEffect } from 'react'
import { AiOutlineUser } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { getToken } from '../../utils/authUtils';
import { postData } from '../../AxiosHelper';
import { toast } from 'react-toastify';


function ForgotPassword() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [showCodeConfirmationForm, setShowCodeConfirmationForm] = useState<boolean>(false);
    const [showNewPasswordForm, setShowNewPasswordForm] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirmation, setNewPasswordConfirmation] = useState<string>("");

    const navigate = useNavigate();

    const handleFormSubmit = async () => {
        setLoading(true)

        if (!showCodeConfirmationForm) {
            const result = await postData("user/forgotPassword", { email });

            switch (result?.status) {
                case 200:
                    setErrorMessage("");
                    setShowCodeConfirmationForm(true);
                    break;
                default:
                    setErrorMessage(result?.data ?? "Problem with server connection.")
                    break;

            }
        } else if (!showNewPasswordForm) {
            const result = await postData(`user/forgotPassword/${code}`, { email });

            switch (result?.status) {
                case 200:
                    setErrorMessage("");
                    setShowNewPasswordForm(true);
                    break;
                default:
                    setErrorMessage(result?.data ?? "Problem with server connection.")
                    break;
            }
        } else {
            const result = await postData("user/forgotPassword/changePassword", { email, newPassword, newPasswordConfirmation })
            switch (result?.status) {
                case 200:
                    toast.success("Password successfully changed! Please sign in")
                    navigate("/login");
                    break;
                default:
                    setErrorMessage(result?.data ?? "Problem with server connection.")
            }
        }

        setLoading(false)
    }

    useEffect(() => {
        if (getToken() !== null) navigate('/')
    }, [navigate])

    return (
        <>
            <Loader loading={isLoading} />
            <div className="content-title">Forgot password</div>
            <div className='container-5'>
                <form autoComplete='off' className='login-form' onSubmit={e => {
                    e.preventDefault();
                    handleFormSubmit();
                }}>
                    <div className="title-image"><AiOutlineUser /></div>
                    {!showCodeConfirmationForm ?
                        <>
                            <div className="mb-2">Please enter your email address. The code will be sent to this email.</div>
                            <input placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />

                            <button type="submit">Send code</button>
                        </>
                        :
                        <>
                            {!showNewPasswordForm ?
                                <>
                                    <div className="mb-2">Please type the code below which you received by email.</div>
                                    <input placeholder="code" name="code" value={code} onChange={e => setCode(e.target.value)} />

                                    <button type="submit">Send</button>
                                </>
                                :
                                <>
                                    <input placeholder="new password" type="password" name="newPassword" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                                    <input placeholder="confirm new password" type="password" name="newPasswordConfirmation" value={newPasswordConfirmation} onChange={e => setNewPasswordConfirmation(e.target.value)} />

                                    <button type="submit">Confirm</button>
                                </>
                            }
                        </>
                    }
                    <div className="mt-3 text-bold color-danger">{errorMessage}</div>
                    <div className='mt-3 a-link' onClick={e => navigate("/login")}>Do tou remember? Login!</div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword
