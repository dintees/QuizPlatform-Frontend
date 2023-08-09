import React, { useEffect, useContext } from 'react'
import Loader from '../common/Loader'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import { IAuthInformation } from '../../Types';
import getMenuItems from '../../utils/getMenuItems';
import { signOut } from '../../utils/loginUtils';
import { Role } from '../../Enums';

function Logout() {

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        signOut();
        setAuth((prev: IAuthInformation) => {
            return { id: 0, isAuthenticated: false, username: "", email: "", role: Role.NotAuthorized, token: "", pages: getMenuItems() }
        })
        navigate("/");
    }, [navigate, setAuth])

    return (
        <Loader loading={true} />
    )
}

export default Logout
