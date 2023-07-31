import React, { useState } from 'react'
import { ILogin } from '../../Types';
import { AiOutlineUser } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

function Login() {

    const [login, setLogin] = useState<ILogin>({ email: "", password: "" });
    const navigate = useNavigate();

    return (
        <>
            {/* <Loader loading={true} /> */}
            <div className="content-title">Login</div>

            <div className='container-5'>
                <form autoComplete='off' className='login-form' onSubmit={e => {
                    e.preventDefault();
                    console.log(login);
                }}>
                    <div className="title-image"><AiOutlineUser /></div>
                    <input placeholder="email" value={login.email} onChange={(e) => {
                        setLogin((prev: ILogin) => {
                            return {
                                ...prev, email: e.target.value,
                            };
                        })
                    }} />
                    <input type="password" placeholder='password' value={login.password} onChange={(e) => {
                        setLogin((prev: ILogin) => {
                            return {
                                ...prev, password: e.target.value,
                            };
                        })
                    }} />
                    <button type="submit">Login</button>
                    <div className='mt-3 a-link' onClick={e => navigate("/register")}>Register</div>
                </form>
            </div>

        </>
    )
}

export default Login
