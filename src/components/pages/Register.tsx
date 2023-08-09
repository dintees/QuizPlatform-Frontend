import React, { useContext, useEffect, useState } from 'react'
import { IAuthInformation, IRegister } from '../../Types';
import { AiOutlineUserAdd } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { AuthContext } from '../../App';
import { getToken } from '../../utils/authUtils';
import { registerAsync } from '../../utils/loginUtils';

function Register() {

    const [register, setRegister] = useState<IRegister>({ username: "", email: "", password: "", passwordConfirmation: "", roleId: 2 });
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const { setAuth } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleRegister = async () => {
        setLoading(true)
        const registrationData = await registerAsync(register);
        if (registrationData.isAuthenticated) {
            setAuth(registrationData as IAuthInformation);
            navigate('/')
        } else
            setErrorMessage(registrationData.errorMessage);
        setLoading(false)
    }

    useEffect(() => {
        if (getToken() !== null) navigate('/')
    }, [navigate])

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
                    <input placeholder="username" value={register.username} onChange={(e) => {
                        setRegister((prev: IRegister) => {
                            return {
                                ...prev, username: e.target.value,
                            };
                        })
                    }} />
                    <input placeholder="email" value={register.email} onChange={(e) => {
                        setRegister((prev: IRegister) => {
                            return {
                                ...prev, email: e.target.value,
                            };
                        })
                    }} />

                    <input type="password" placeholder='password' value={register.password} onChange={(e) => {
                        setRegister((prev: IRegister) => {
                            return {
                                ...prev, password: e.target.value,
                            };
                        })
                    }} />
                    <input type="password" placeholder='password confirmation' value={register.passwordConfirmation} onChange={(e) => {
                        setRegister((prev: IRegister) => {
                            return {
                                ...prev, passwordConfirmation: e.target.value,
                            };
                        })
                    }} />
                    <button type="submit">Register</button>
                    <div className="mt-3 text-bold color-danger">{errorMessage}</div>
                    <div className='mt-3 a-link' onClick={e => navigate("/login")}>Already have an account? Log in!</div>
                </form>
            </div>

        </>
    )
}

export default Register
