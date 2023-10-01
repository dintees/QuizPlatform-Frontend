import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import 'katex/dist/katex.min.css';

function Home() {
    const { auth } = useContext(AuthContext);

    return (
        <>
            <div className='content-title'>Home</div>
            {auth.isAuthenticated ?
                <h4>Logged as: {auth.firstname} {auth.lastname} [{auth.username}] ({auth.email})</h4>
                : <h4>Not authenticated</h4>}
        </>
    )
}

export default Home