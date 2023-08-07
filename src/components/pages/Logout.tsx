import React, { useEffect, useContext } from 'react'
import Loader from '../common/Loader'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { IAuthInformation, Roles } from '../../Types';
import getMenuItems from '../../utils/getMenuItems';

function Logout() {

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        localStorage.removeItem("token");
        setAuth((prev: IAuthInformation) => {
            return { id: 0, isAuthenticated: false, username: "", email: "", role: Roles.NotAuthorized, token: "", pages: getMenuItems() }
        })

        navigate("/");
    }, [navigate, setAuth])

    return (
        <Loader loading={true} />
    )
}

export default Logout
