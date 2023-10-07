import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, postData } from '../../AxiosHelper';
import QuestionForm from '../common/QuestionForm';
import { IQuestionFormField, ITestSessionOptions } from '../../Types';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import { QuestionType } from '../../Enums';
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import Loader from '../common/Loader';

function SolveTest() {
    const { testId } = useParams();

    const [questions, setQuestions] = useState<IQuestionFormField[]>([]);
    const [testSessionOptions, setTestSessionOptions] = useState<ITestSessionOptions>();
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const getTestSessionAsync = async () => {
        setLoading(true)
        const result = await getData(`testSession/get/${testId}`, true);
        console.log(result);

        switch (result?.status) {
            case 200:
                setTestSessionOptions(result.data)
                setQuestions(result.data.questions)
                break;
            case 401:
                toast.error("You do not have permission to solve this test")
                navigate("/")
                break;
            case 404:
                toast.error(result.data ?? "Unexpected error")
                navigate("/")
                break;
            default:
                toast.error("Problem with server connection")
                break;
        }
        setLoading(false)
    }
    useEffect(() => {
        getTestSessionAsync();
        // eslint-disable-next-line
    }, [])

    const handleSaveData = async (finish: boolean = false) => {
        const mappingTable = questions.map((question) => {
            if (question.questionType === QuestionType.ShortAnswer)
                return { questionId: question.id, shortAnswerValue: question.answers[0].answer }
            return { questionId: question.id, answerIds: question.answers.filter((answer) => answer.correct).map(e => e.id) }
        })

        const result = await postData(`testSession/saveAnswers/${testId}/${finish}`, mappingTable, true)
        switch (result?.status) {
            case 200:
                toast.success(`Successfully ${finish ? "finished" : "saved"} the test`)
                if (finish) getTestSessionAsync();
                break;
            default:
                toast.error(result?.data ?? "Unexpected error")
                break;
        }
    }

    return (
        <>
            <Loader loading={loading} />
            <div className='content-title'>Solve test</div>

            <h3>{testSessionOptions?.title}</h3>
            <h6>{testSessionOptions?.description}</h6>

            <Button value={<BsArrowLeftCircleFill />} type='secondary' onClick={() => navigate("/history")} />

            {testSessionOptions?.isCompleted ?
                <>
                    <h2>Score: {testSessionOptions.score} / {testSessionOptions.maxScore} [{(testSessionOptions.score / testSessionOptions.maxScore * 100).toFixed(2)}]%</h2>
                    <QuestionForm questions={questions} setQuestions={setQuestions} editMode={false} readonly={true} correctAnswers={testSessionOptions?.correctAnswers} />
                </>
                :
                <>
                    <QuestionForm questions={questions} setQuestions={setQuestions} editMode={false} oneQuestionMode={testSessionOptions?.oneQuestionMode} />
                    {!testSessionOptions?.oneQuestionMode && <Button type='primary' value="Save" onClick={() => handleSaveData()} />}
                    <Button type='primary' value="Save and finish" onClick={() => handleSaveData(true)} />
                </>
            }
        </>
    )
}

export default SolveTest
