import React, { useContext } from 'react'
import { AuthContext } from '../../App'

function Home() {

    const { auth } = useContext(AuthContext);

    return (
        <>
            <div className='content-title'>Home</div>
            {auth.isAuthenticated ?
                <h4>Logged as: {auth.firstname} {auth.lastname} [{auth.username}] ({auth.email})</h4>
                : <h4>Not authenticated</h4>}

            <button className="mt-2 block btn animated">Save</button>
        </>
    )
}

export default Home