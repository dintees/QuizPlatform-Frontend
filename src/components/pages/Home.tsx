import React, { useContext, useState } from 'react'
import { AuthContext } from '../../App'
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import TextField from '../common/TextField';

function Home() {

    const { auth } = useContext(AuthContext);
    const [math, setMath] = useState<string>("");

    return (
        <>
            <div className='content-title'>Home</div>
            {auth.isAuthenticated ?
                <h4>Logged as: {auth.firstname} {auth.lastname} [{auth.username}] ({auth.email})</h4>
                : <h4>Not authenticated</h4>}

            <TextField style={{ marginTop: "1rem"}} value={math} setValue={setMath} placeholder='\frac{1}{2}' />

            <BlockMath math={math} renderError={(error) => <b>{error.name}</b>} />

            <button className="mt-2 block btn animated">Save</button>
        </>
    )
}

export default Home