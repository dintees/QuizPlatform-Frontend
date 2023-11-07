import React, { useState, useContext, useEffect } from 'react'
import { IAuthInformation, ILogin } from '../../Types';
import { AiOutlineUser } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { getToken } from '../../utils/authUtils';
import { signInAsync } from '../../utils/loginUtils';
import { AuthContext } from '../../App';

function Login() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [login, setLogin] = useState<ILogin>({ email: "", password: "" });
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleLogin = async () => {
        if (login.email === "" || login.password === "")
            return setErrorMessage("Empty email or password.");
        
        setLoading(true)
        const loginData = await signInAsync(login);
        if (loginData.isAuthenticated) {
            setAuth(loginData as IAuthInformation);
            navigate("/");
        } else
            setErrorMessage(loginData.errorMessage);
        setLoading(false)
    }

    useEffect(() => {
        if (getToken() !== null) navigate('/')
    }, [navigate])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogin(prev => ({ ...prev, [name]: value }))
    }


    return (
        <>
            <Loader loading={isLoading} />
            <div className="content-title">Login</div>
            <div className='container-5'>
                <form autoComplete='off' className='login-form' onSubmit={e => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <div className="title-image"><AiOutlineUser /></div>
                    <input placeholder="email" name="email" value={login.email} onChange={handleInputChange} />
                    <input type="password" placeholder='password' name="password" value={login.password} onChange={handleInputChange} />

                    <button type="submit">Login</button>
                    <div className="mt-3 text-bold color-danger">{errorMessage}</div>
                    <div className='mt-3 a-link' onClick={e => navigate("/register")}>No account? Register!</div>
                    <div className='mt-3 a-link' onClick={e => navigate("/forgotpassword")}>Forgot password? Remind!</div>
                </form>
            </div>
        </>
    )
}

export default Login
