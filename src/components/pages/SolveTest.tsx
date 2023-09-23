import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData } from '../../AxiosHelper';
import QuestionForm from '../common/QuestionForm';
import { IQuestionFormField } from '../../Types';
import { toast } from 'react-toastify';

function SolveTest() {
    const [questions, setQuestions] = useState<IQuestionFormField[]>([]);
    const { testId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData(`testSession/get/${testId}`, true);
            console.log(result);
            switch (result?.status) {
                case 200:
                    setQuestions(result.data.questions)
                break;
                default:
                    toast.error("There is no active session with the given id.")
                    navigate("/")
                break;
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <div className='content-title'>Solving test</div>

            <h3>TestId: {testId}</h3>

            <QuestionForm questions={questions} setQuestions={setQuestions} editMode={false} />
        </>
    )
}

export default SolveTest
