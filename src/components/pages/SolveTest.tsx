import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, postData } from '../../AxiosHelper';
import QuestionForm from '../common/QuestionForm';
import { IQuestionFormField } from '../../Types';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import { QuestionType } from '../../Enums';

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
                case 404:
                    toast.error(result.data)
                    navigate("/")
                    break;
                default:
                    toast.error("An error occured.")
                    break;
            }
        }

        fetchData();
    }, [navigate, testId])

    const handleSaveData = async () => {
        // TODO refactor
        console.log("Save data");
        console.log(questions);

        const mappingTable = questions.map((question) => {
            if (question.questionType === QuestionType.ShortAnswer)
                return { questionId: question.id, shortAnswerValue: question.answers[0].answer }
            return { questionId: question.id, answerIds: question.answers.filter((answer) => answer.correct).map(e => e.id) }
        })

        console.log(mappingTable);

        const result = await postData(`testSession/saveAnswers/${testId}`, mappingTable, true)
        console.log(result);

    }

    const handleSendData = () => {
        console.log("Send data");
    }

    return (
        <>
            <div className='content-title'>Solving test</div>

            <h3>TestId: {testId}</h3>

            <QuestionForm questions={questions} setQuestions={setQuestions} editMode={false} />

            <Button type='primary' value="Save" onClick={handleSaveData} />
            <Button type='primary' value="Send" onClick={handleSendData} />

        </>
    )
}

export default SolveTest
