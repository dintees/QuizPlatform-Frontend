import React, { useEffect, useContext } from 'react'
import Loader from '../common/Loader'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { IAuthInformation } from '../../Types';
import { AiOutlineUser } from 'react-icons/ai';

function Logout() {

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        localStorage.removeItem("token");
        setAuth((prev: IAuthInformation) => {
            return { ...prev, token: "", pages: [{ url: "/login", name: "Login", icon: <AiOutlineUser /> }] }
        })

        navigate("/");
    }, [navigate, setAuth])

    return (
        <Loader loading={true} />
    )
}

export default Logout
