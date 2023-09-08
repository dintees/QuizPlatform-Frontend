import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import { getData, postData, deleteData } from '../../AxiosHelper'
import TextField from '../common/TextField'
import { IQuestionFormField } from '../../Types'
import QuestionForm from '../common/QuestionForm'
import { QuestionType } from '../../Enums'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

function Test() {

    const [title, setTitle] = useState<string>("New set");
    const [description, setDescription] = useState<string>("");
    const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>(QuestionType.SingleChoice);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [editMode, setEditMode] = useState<boolean>(true);

    const navigate = useNavigate();
    const { mode, setId } = useParams();

    const initialQuestion: IQuestionFormField = {
        questionType: QuestionType.SingleChoice,
        question: "",
        answers: [{ answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }]
    }

    const [questions, setQuestions] = useState<IQuestionFormField[]>([initialQuestion]);

    useEffect(() => {
        if (mode === 'edit') setEditMode(true)
        else if (mode === 'view') setEditMode(false)
        else navigate("/mysets")

        if (setId) {
            // load questions from server
            const fetchData = async () => {
                const result = await getData(`set/${setId}`, true);

                // TODO: refactor - int from server must return correct answers
                if (result?.status === 200) {
                    result.data.questions.map((q: any) => {
                        q.answers = q.answers.map((a: string) => {
                            return { answer: a, correct: false }
                        })
                        return q;
                    })

                    setTitle(result.data.title)
                    setDescription(result.data.description)
                    setQuestions(result.data.questions);
                }
            }
            fetchData();
        }
    }, [mode, setId, navigate])


    const handleAddSet = () => {
        const toastId = toast.loading("Saving...");
        const fetchData = async () => {
            const result = await postData("set/createWithQuestions", { title: title, description: description, questions: questions }, true);
            console.log(result);

            if (result?.status === 200) {
                if (result.data.success === true) {
                    // test has been created
                    toast.update(toastId, { type: "success", render: "Successfully saved!", isLoading: false, autoClose: 3000, closeOnClick: true })
                }
                else {
                    setErrorMessage(result?.data.errorMessage);
                    toast.update(toastId, { type: "error", render: result?.data.errorMessage, isLoading: false, autoClose: 3000, closeOnClick: true })
                }
            }
        }

        fetchData();
    }

    const handleDeleteSet = async (setId: number) => {
        const result = await deleteData(`set/delete/${setId}`, true);
        console.log(result);
        if (result?.status === 200) {
            alert("Deleted");
        }
    }

    const handleAddNewQuestion = () => {
        let newQuestionObj: IQuestionFormField = { questionType: selectedQuestionType, question: "", answers: [] }
        switch (selectedQuestionType) {
            case QuestionType.SingleChoice:
            case QuestionType.MultipleChoice:
                for (let i = 0; i < 4; ++i) newQuestionObj.answers.push({ answer: "", correct: false })
                break;
            case QuestionType.TrueFalse:
                newQuestionObj.answers.push({ answer: "True", correct: true })
                newQuestionObj.answers.push({ answer: "False", correct: false })
                break;
            case QuestionType.ShortAnswer:
                newQuestionObj.answers.push({ answer: "", correct: true })
                break;

        }
        setQuestions((prev: IQuestionFormField[]) => [...prev, newQuestionObj])
    }

    const handleChangeQuestion = (index: number, value: string) => {
        setQuestions((prev: IQuestionFormField[]) => {
            const newState = [...prev]
            newState[index].question = value;
            return newState;
        })
    }

    const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedQuestionType(QuestionType[value as keyof typeof QuestionType])
    }


    return (
        <>
            <div className="content-title">Create new test</div>

            <Button value="Go back" type='secondary' onClick={() => navigate("/mytests")} />
            {editMode && setId && <Button value='Delete set' onClick={() => handleDeleteSet(parseInt(setId))} type='danger' />}

            <TextField placeholder='Title' value={title} setValue={setTitle} readonly={!editMode} />
            <TextField placeholder='Description' value={description} setValue={setDescription} style={{ marginTop: "1rem", marginBottom: "1rem" }} readonly={!editMode} />

            <QuestionForm questions={questions} setQuestions={setQuestions} handleChangeQuestion={handleChangeQuestion} editMode={editMode} />

            {editMode &&
                <>
                    <div className="text-center">
                        <select className='form-control' onChange={handleQuestionTypeChange}>
                            {Object.keys(QuestionType).filter((v) => isNaN(Number(v))).map((type: string) =>
                                <option key={type}>{type}</option>
                            )}
                        </select>

                        <Button value='Add' type='primary' onClick={handleAddNewQuestion} />
                    </div>

                    <Button value='Save' type='success' onClick={handleAddSet} />

                    <div className='color-danger'>{errorMessage}</div>
                </>
            }
        </>
    )
}

export default Test
