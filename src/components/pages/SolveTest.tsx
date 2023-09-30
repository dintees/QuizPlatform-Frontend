import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getData, postData } from '../../AxiosHelper';
import QuestionForm from '../common/QuestionForm';
import { IQuestionFormField } from '../../Types';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import { QuestionType } from '../../Enums';
import { BsArrowLeftCircleFill } from 'react-icons/bs'
import Loader from '../common/Loader';

function SolveTest() {
    const { testId } = useParams();

    const [questions, setQuestions] = useState<IQuestionFormField[]>([]);
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getData(`testSession/get/${testId}`, true);

            switch (result?.status) {
                case 200:
                    setTitle(result.data.title)
                    setDescription(result.data.description)
                    setQuestions(result.data.questions)
                    break;
                case 404:
                    toast.error(result.data ?? "Unexpected error")
                    navigate("/")
                    break;
                default:
                    toast.error("Unexpedted error")
                    break;
            }
            setLoading(false)
        }

        fetchData();
    }, [navigate, testId])

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

            <h3>{title}</h3>
            <h6>{description}</h6>

            <Button value={<BsArrowLeftCircleFill />} type='secondary' onClick={() => navigate("/history")} />

            <QuestionForm questions={questions} setQuestions={setQuestions} editMode={false} />

            <Button type='primary' value="Save" onClick={() => handleSaveData()} />
            <Button type='primary' value="Save and finish" onClick={() => handleSaveData(true)} />

        </>
    )
}

export default SolveTest
