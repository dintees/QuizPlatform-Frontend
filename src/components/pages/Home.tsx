import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { Question, QuestionTypeName } from '../../Types'

function Home() {

    const [question, setQuestion] = useState<Question | undefined>(undefined)

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
            {question ?
                <>ID: {question.id} = {question.question} - {question.answers}</> :
                <></>}
        </>

    )
}

export default Home