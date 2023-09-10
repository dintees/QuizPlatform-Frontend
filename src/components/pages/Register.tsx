import React, { useContext, useEffect, useState } from 'react'
import { IAuthInformation, IRegister } from '../../Types';
import { AiOutlineUserAdd } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { AuthContext } from '../../App';
import { getToken } from '../../utils/authUtils';
import { confirmAccount, registerAsync } from '../../utils/loginUtils';
import { toast } from 'react-toastify';

function Register() {

    const [register, setRegister] = useState<IRegister>({ username: "", firstname: "", lastname: "", email: "", password: "", passwordConfirmation: "", roleId: 2 });
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [showCodeConfirmationForm, setShowCodeConfirmationForm] = useState<boolean>(false);
    const [confirmationCode, setConfirmationCode] = useState<string>("");
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true)
        if (!showCodeConfirmationForm) {
            // registration
            const registrationData = await registerAsync(register);

            if (registrationData.success) {
                setShowCodeConfirmationForm(true)
                setErrorMessage("")
            }
            else
                setErrorMessage(registrationData.errorMessage)

            setLoading(false)
        } else {
            // account confirmation
            const confirmationData = await confirmAccount(register, confirmationCode);

            if (confirmationData?.isAuthenticated) {
                setAuth(confirmationData as IAuthInformation);
                toast.success("Successfully registered!")
                navigate('/')
            } else
                setErrorMessage(confirmationData?.errorMessage);
            setLoading(false)
        }
    }

    useEffect(() => {
        if (getToken() !== null) navigate('/')
    }, [navigate])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setRegister(prev => ({ ...prev, [name]: value }))
    }

    return (
        <>
            <Loader loading={isLoading} />
            <div className="content-title">Register</div>
            <div className='container-5'>
                <form autoComplete='off' className='login-form' onSubmit={e => {
                    e.preventDefault();
                    handleRegister();
                }}>
                    <div className="title-image"><AiOutlineUserAdd /></div>

                    {!showCodeConfirmationForm ?
                        <>

                            <input placeholder="First name" name='firstname' value={register.firstname} onChange={handleInputChange} />

                            <input placeholder="Last name" name="lastname" value={register.lastname} onChange={handleInputChange} />

                            <input placeholder="User name" name="username" value={register.username} onChange={handleInputChange} />

                            <input placeholder="Email" name="email" value={register.email} onChange={handleInputChange} />

                            <input type="password" placeholder='Password' name='password' value={register.password} onChange={handleInputChange} />

                            <input type="password" placeholder='Password confirmation' name="passwordConfirmation" value={register.passwordConfirmation} onChange={handleInputChange} />

                            <button type="submit">Register</button>
                        </>
                        :
                        <>
                            <input placeholder="Confirmation code" value={confirmationCode} onChange={(e) => setConfirmationCode(e.target.value)} />

                            <button type="submit">Confirm</button>
                        </>
                    }
                    <div className="mt-3 text-bold color-danger">{errorMessage}</div>
                    <div className='mt-3 a-link' onClick={e => navigate("/login")}>Already have an account? Log in!</div>
                </form>
            </div>

        </>
    )
}

export default Register
