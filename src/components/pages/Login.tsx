import React, { useState, useContext } from 'react'
import { IAuthInformation, ILogin, Roles } from '../../Types';
import { AiOutlineUser } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import { postData } from '../../AxiosHelper';
import Loader from '../common/Loader';
import { AuthContext } from '../../App';
import getMenuItems from '../../utils/getMenuItems';


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
                const role = Roles[data.role as keyof typeof Roles];

                localStorage.setItem("token", data.token)
                return { id: data.id, isAuthenticated: true, username: data.username, email: data.email, role: role, pages: getMenuItems(role), token: data.token }
            })
            navigate("/")
        } else if (loggedData?.status === 401)
            setErrorMessage(loggedData.data);
        else
            setErrorMessage("Problem with server connection.");
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
