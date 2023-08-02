import React, { useContext, useState } from 'react'
import { ILogin } from '../../Types';
import { AiOutlineUser } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import { postData } from '../../AxiosHelper';
import { LoaderContext } from '../../App';


function Login() {

    const { setLoading } = useContext(LoaderContext);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleLogin = async () => {
        setLoading(true)
        const loggedData = await postData("User/login", login, false)
        setLoading(false)
        if (loggedData?.status === 200) {
            setErrorMessage("Logged in :)");
        } else if (loggedData?.status === 401) {
            setErrorMessage(loggedData.data);
        }
    }

    const [login, setLogin] = useState<ILogin>({ email: "", password: "" });
    const navigate = useNavigate();

    return (
        <>
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
