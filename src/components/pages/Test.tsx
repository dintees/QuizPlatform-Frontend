import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import { getData, postData, deleteData, putData } from '../../AxiosHelper'
import TextField from '../common/TextField'
import { IQuestionFormField, IResult, ISetDto } from '../../Types'
import QuestionForm from '../common/QuestionForm'
import { QuestionType } from '../../Enums'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../common/Loader'
import { BsFillTrashFill, BsArrowLeftCircleFill } from 'react-icons/bs'
import { FaClone } from 'react-icons/fa'
import { duplicateTest, deleteTest } from '../../utils/testUtils'

function Test() {

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>(QuestionType.SingleChoice);
    const [editMode, setEditMode] = useState<boolean>(true);
    const [pageTitle, setPageTitle] = useState<string>("Create new test");

    const navigate = useNavigate();
    const { mode, setId } = useParams();

    const initialQuestion: IQuestionFormField = {
        questionType: QuestionType.SingleChoice,
        question: "",
        answers: [{ answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }]
    }

    const [questions, setQuestions] = useState<IQuestionFormField[]>([initialQuestion]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (mode === 'edit') { setPageTitle(setId ? "Edit test" : "Create new test"); setEditMode(true) }
        else if (mode === 'view') { setPageTitle("Test preview"); setEditMode(false) }
        else navigate("/mysets")

        if (!!setId) {
            setLoading(true);
            // load question by id
            const fetchData = async () => {
                const result = await getData(`set/${setId}`, true);

                console.log(result);


                if (result?.status === 200) {
                    setTitle(result.data.title)
                    setDescription(result.data.description)
                    setQuestions(result.data.questions)
                } else if (result?.status === 404) {
                    toast.error("There is no test with the given id")
                    navigate("/mytests")
                } else {
                    toast.error("Unable to connect to the server.")
                    setQuestions([])
                }
                setTimeout(() => setLoading(false), 300);
            }
            fetchData();
        }
    }, [mode, setId, navigate])

    const handleAddSet = () => {
        const toastId = toast.loading("Saving...");
        const fetchData = async () => {
            const result = await postData("set/createWithQuestions", { title: title, description: description, questions: questions }, true);

            if (result?.status === 200) {
                const data: IResult<ISetDto> = result.data;
                if (data.success) {
                    // test has been created
                    toast.update(toastId, { type: "success", render: "Successfully saved!", isLoading: false, autoClose: 3000, closeOnClick: true })

                    navigate(`/test/edit/${data.value.id}`)
                }
            }
            else {
                toast.update(toastId, { type: "error", render: result?.data.errorMessage, isLoading: false, autoClose: 3000, closeOnClick: true })
            }
        }

        fetchData();
    }

    const handleModifySet = () => {
        const toastId = toast.loading("Saving...");

        const fetchData = async () => {
            const result = await putData(`set/edit/${setId}`, { title: title, description: description, questions: questions }, true);

            if (result?.status === 200) {
                if (result.data.success === true) {
                    // test has been created
                    toast.update(toastId, { type: "success", render: "Successfully modified!", isLoading: false, autoClose: 3000, closeOnClick: true })
                }
            } else {
                toast.update(toastId, { type: "error", render: result?.data.errorMessage, isLoading: false, autoClose: 3000, closeOnClick: true })
            }
        }

        fetchData();
    }

    const handleDeleteSet = async (testId: number) => {
        const isDeleted = await deleteTest(testId);
        if (isDeleted)
            navigate("/mytests");
    }

    const handleAddNewQuestion = () => {
        let newQuestionObj: IQuestionFormField = { questionType: selectedQuestionType, question: "", answers: [] }
        switch (selectedQuestionType) {
            case QuestionType.SingleChoice:
            case QuestionType.MultipleChoice:
                for (let i = 0; i < 3; ++i) newQuestionObj.answers.push({ answer: "", correct: false })
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

    const handleDuplicateTest = async (testId: number) => {
        const result = await duplicateTest(testId);
        if (result !== -1)
            navigate(`/test/edit/${result}`)
    }


    return (
        <>
            <Loader loading={loading} />

            <div className="content-title">{pageTitle}</div>

            <Button value={<BsArrowLeftCircleFill />} type='secondary' onClick={() => navigate("/mytests")} />
            {editMode && setId && <Button value={<FaClone />} onClick={() => handleDuplicateTest(parseInt(setId))} type='secondary' />}
            {editMode && setId && <Button value={<BsFillTrashFill />} onClick={() => handleDeleteSet(parseInt(setId))} type='danger' />}

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

                    {setId ?
                        <Button value="Modify" type='success' onClick={handleModifySet} />
                        :
                        <Button value='Save' type='success' onClick={handleAddSet} />
                    }
                </>
            }
        </>
    )
}

export default Test
