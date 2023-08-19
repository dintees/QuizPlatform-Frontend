import React from 'react'
import "../../assets/css/Layout.scss"
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../../utils/loginUtils';

function Navbar() {
    const navigate = useNavigate();
    return (
        <nav>
            <div id="panel">
                { isAuthenticated() ?
                    <button onClick={() => navigate("/logout")} className="btn btn-primary animated">Logout</button>
                    :
                    <button onClick={() => navigate("/login")} className="btn btn-primary animated">Sign in</button>
                }
            </div>
        </nav>
    )
}

export default Navbar
