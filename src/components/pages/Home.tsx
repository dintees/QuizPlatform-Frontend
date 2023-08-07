import React, { useEffect, useState, useContext } from 'react'
import { getData } from '../../AxiosHelper'
import { Question } from '../../Types'
import { AuthContext } from '../../App'

function Home() {

    const [question, setQuestion] = useState<Question | undefined>(undefined)

    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const question = await getData("Question/26", false)
            if (question?.status === 200) {
                setQuestion(question?.data)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            <div className='content-title'>Home</div>
            {auth.isAuthenticated ?
                <h4>Logged as: {auth.username} ({auth.email})</h4>
                : <h4>Not authenticated</h4>}

            {question ?
                <>ID: {question.id} = {question.question} - {question.answers}</> :
                <></>}

        </>

    )
}

export default Home