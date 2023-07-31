import React, { useState } from 'react'
import { iRegister } from '../../Types';
import { AiOutlineUserAdd } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';

function Register() {

    const [register, setRegister] = useState<iRegister>({ email: "", password: "", passwordConfirmation: "" });
    const navigate = useNavigate();

    return (
        <>
            <div className="content-title">Register</div>

            <div className='container-5'>
                <form autoComplete='off' className='login-form' onSubmit={e => {
                    e.preventDefault();
                    console.log(register);
                }}>
                    <div className="title-image"><AiOutlineUserAdd /></div>
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
                    <div className='mt-3 a-link' onClick={e => navigate("/login")}>Login</div>
                </form>
            </div>

        </>
    )
}

export default Register
