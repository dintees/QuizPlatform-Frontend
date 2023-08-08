import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { getDataFromToken } from '../../utils/authUtils';

interface Props {
    component: JSX.Element,
}

function ProtectedComponent(props: Props) {
    const navigate = useNavigate();

    useEffect(() => {
        const data = getDataFromToken();
        
        if (data === null) navigate("/login")
        // if data.role (...) navigate('/login');

    }, [navigate])

    return (
        <>
            {props.component}
        </>
    )
}

export default ProtectedComponent
