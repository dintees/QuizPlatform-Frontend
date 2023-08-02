import React, { useContext, useState } from 'react'
import { iRegister } from '../../Types';
import { AiOutlineUserAdd } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import { LoaderContext } from '../../App';
import { postData } from '../../AxiosHelper';

function Register() {

    const [register, setRegister] = useState<iRegister>({ username: "", email: "", password: "", passwordConfirmation: "", roleId: 2 });
    const [errorMessage, setErrorMessage] = useState<string>();
    const navigate = useNavigate();

    const { setLoading } = useContext(LoaderContext);

    const handleRegister = async () => {
        setLoading(true)

        const registrationData = await postData("User/register", register, false)

        if (registrationData?.status === 200) {
            setErrorMessage("Registered :)");
        } else if (registrationData?.status === 400) {
            setErrorMessage(registrationData.data)
        }
        setLoading(false)
    }

    return (
        <>
            <div className="content-title">Register</div>

            <div className='container-5'>
                <form autoComplete='off' className='login-form' onSubmit={e => {
                    e.preventDefault();
                    handleRegister();
                }}>
                    <div className="title-image"><AiOutlineUserAdd /></div>
                    <input placeholder="username" value={register.username} onChange={(e) => {
                        setRegister((prev: iRegister) => {
                            return {
                                ...prev, username: e.target.value,
                            };
                        })
                    }} />
                    <input placeholder="email" value={register.email} onChange={(e) => {
                        setRegister((prev: iRegister) => {
                            return {
                                ...prev, email: e.target.value,
                            };
                        })
                    }} />

                    <input type="password" placeholder='password' value={register.password} onChange={(e) => {
                        setRegister((prev: iRegister) => {
                            return {
                                ...prev, password: e.target.value,
                            };
                        })
                    }} />
                    <input type="password" placeholder='password confirmation' value={register.passwordConfirmation} onChange={(e) => {
                        setRegister((prev: iRegister) => {
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
