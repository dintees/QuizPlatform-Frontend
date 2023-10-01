import React, { useState, useContext, useEffect } from 'react'
import { IAuthInformation, ILogin } from '../../Types';
import { AiOutlineUser } from 'react-icons/ai';
import "../../assets/css/Login.scss"
import { useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { getToken } from '../../utils/authUtils';
import { signInAsync } from '../../utils/loginUtils';
import { AuthContext } from '../../App';
import { postData } from '../../AxiosHelper';


function ForgotPassword() {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [code, setCode] = useState<string>("");
    const [showCodeConfirmationForm, setShowCodeConfirmationForm] = useState<boolean>(false);
    const navigate = useNavigate();

    const { setAuth } = useContext(AuthContext);

    const handleFormSubmit = async () => {
        setLoading(true)

        const result = await postData("user/forgotPassword", { email });
        console.log(result);
        // TODO add feature
        // 
        
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
                    <div className="mb-2">Please enter your email address. The code will be sent to this email.</div>
                    <input placeholder="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />

                    <button type="submit">Send code</button>
                    <div className="mt-3 text-bold color-danger">{errorMessage}</div>
                    <div className='mt-3 a-link' onClick={e => navigate("/login")}>Do tou remember? Login!</div>
                </form>
            </div>
        </>
    )
}

export default ForgotPassword
