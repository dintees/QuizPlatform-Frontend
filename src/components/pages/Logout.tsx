import React, { useEffect, useContext } from 'react'
import Loader from '../layout/Loader'
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
        const logOut = async () => {
            signOut();
            await setAuth((prev: IAuthInformation) => {
                return { isAuthenticated: false, username: "", firstname: "", lastname: "", email: "", role: Role.NotAuthorized, token: "", pages: getMenuItems() }
            })
            navigate("/");
        }
        
        logOut();
    }, [navigate, setAuth])

    return (
        <Loader loading={true} />
    )
}

export default Logout
