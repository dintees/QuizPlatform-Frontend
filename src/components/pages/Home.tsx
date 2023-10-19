import React, { useContext } from 'react'
import { AuthContext } from '../../App'
import '../../assets/css/Home.scss'
import { useNavigate } from 'react-router-dom';

function Home() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        // <>
        //     {auth.isAuthenticated ?
        //         <>
        //             <h4>Logged as: {auth.firstname} {auth.lastname} [{auth.username}] ({auth.email})</h4>
        //         </>
        //         :
        //         <>

        //         </>
        //     }
        // </>
        <div className="home-content">
            <h1>Welcome to Fiszlet!</h1>
            <h2>A platform for creating science quizess</h2>
            Here you can create tests on science topics and many more...

            <div className="text-bold mt-1 mb-1">Key Features:</div>
            <ul>
                <li><strong>intuitive test creator</strong> - create single-choice, multiple-choice, true/false and short-answer questions</li>
                <li><strong>Flashcards creator</strong> - learning with cards does not have to be directed specifically at learning vocabulary from other languages</li>
                <li><strong>generation of flashcards from tests</strong> - before solving a test you can generate a set of flashcards to help you learn faster</li>
                <li><strong>public mode</strong> - so others can use it</li>
                <li><strong>mathematical mode</strong> - to enter a formula, simply use the mathematical mode and the appropriate LaTeX syntax</li>
                <li><strong>3 options to make the solution more difficult</strong> - change the order of questions, answers and one question per page mode</li>
            </ul>

            <div className="text-bold mt-2">To start using Fiszlet please <span className='color-primary c-pointer' onClick={() => navigate("/register")}>Register</span> or <span className='color-primary c-pointer' onClick={() => navigate("/login")}>Sign in</span> if you already have an account.</div>
        </div>
    )
}

export default Home   