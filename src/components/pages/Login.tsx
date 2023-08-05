import React, { useState, useContext } from 'react'
import { IAuthInformation, ILogin } from '../../Types';
import { AiOutlineUser } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import { postData } from '../../AxiosHelper';
import Loader from '../common/Loader';
import { AuthContext } from '../../App';


function Login() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [login, setLogin] = useState<ILogin>({ email: "", password: "" });
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true)
        const loggedData = await postData("User/login", login, false)
        if (loggedData?.status === 200) {
            setAuth((prev: IAuthInformation) => {
                const data = loggedData.data;
                localStorage.setItem("token", data)
                return { ...prev, pages: [], token: data }
            })
            navigate("/")
        } else if (loggedData?.status === 401) {
            setErrorMessage(loggedData.data);
        }
        setLoading(false)
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
                    <div className="mt-3 text-bold color-danger">{errorMessage}</div>
                    <div className='mt-3 a-link' onClick={e => navigate("/register")}>No account? Register!</div>
                </form>
            </div>
        </>
    )
}

export default Login
