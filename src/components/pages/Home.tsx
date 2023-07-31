import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { Question, QuestionTypeName } from '../../Types'

function Home() {

    const [question, setQuestion] = useState<Question>({ id: 0, question: "", questionType: QuestionTypeName.SingleChoice, answers: [] })

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
            <h2>Home</h2>
            ID: {question.id} = {question.question} - {question.answers}
        </>

    )
}

export default Home