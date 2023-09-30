import React, { useState, useEffect } from 'react'
import Button from '../common/Button'
import { getData, postData, putData } from '../../AxiosHelper'
import TextField from '../common/TextField'
import { IQuestionFormField, IResult, ISetDto, ISolvingTestOptions } from '../../Types'
import QuestionForm from '../common/QuestionForm'
import { QuestionType } from '../../Enums'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../common/Loader'
import { BsFillTrashFill, BsArrowLeftCircleFill } from 'react-icons/bs'
import { FaClone } from 'react-icons/fa'
import { duplicateTest, deleteTest, getNewQuestionObject } from '../../utils/testUtils'
import CheckboxField from '../common/CheckboxField'

function Test() {

    const { mode, testId } = useParams();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>(QuestionType.SingleChoice);
    const [editMode, setEditMode] = useState<boolean>(true);
    const [solvingTestOptions, setSolvingTestOptions] = useState<ISolvingTestOptions>({ shuffleQuestions: false, shuffleAnswers: false, oneQuestionMode: false, testId: !!testId ? parseInt(testId) : 0 });
    const [pageTitle, setPageTitle] = useState<string>("Create new test");

    const navigate = useNavigate();

    const initialQuestion: IQuestionFormField = {
        questionType: QuestionType.SingleChoice,
        question: "",
        answers: [{ answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }]
    }

    const [questions, setQuestions] = useState<IQuestionFormField[]>([initialQuestion]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (mode === 'edit') { setPageTitle(testId ? "Edit test" : "Create new test"); setEditMode(true) }
        else if (mode === 'view') { setPageTitle("Test preview"); setEditMode(false) }
        else navigate("/mytests")

        if (!!testId) {
            setLoading(true);
            // load question by id
            const fetchData = async () => {
                const result = await getData(`test/${testId}`, true);

                if (result?.status === 200) {
                    setTitle(result.data.title)
                    setDescription(result.data.description)
                    setQuestions(result.data.questions)
                } else if (result?.status === 404) {
                    toast.error("There is no test with the given id")
                    navigate("/mytests")
                } else {
                    toast.error("Unable to connect to the server")
                    setQuestions([])
                }
                setTimeout(() => setLoading(false), 300);
            }
            fetchData();
        }
    }, [mode, testId, navigate])

    const handleAddTest = () => {
        const toastId = toast.loading("Saving...");
        const fetchData = async () => {
            const result = await postData("test/createWithQuestions", { title: title, description: description, questions: questions }, true);

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

    const handleModifyTest = () => {
        const toastId = toast.loading("Saving...");

        const fetchData = async () => {
            const result = await putData(`test/edit/${testId}`, { title: title, description: description, questions: questions }, true);

            if (result?.status === 200) {
                if (result.data.success === true) {
                    // test has been created
                    setQuestions(result.data.value.questions)
                    toast.update(toastId, { type: "success", render: "Successfully modified!", isLoading: false, autoClose: 3000, closeOnClick: true })
                }
            } else {
                toast.update(toastId, { type: "error", render: result?.data.errorMessage, isLoading: false, autoClose: 3000, closeOnClick: true })
            }
        }

        fetchData();
    }

    const handleDeleteTest = async (testId: number) => {
        const isDeleted = await deleteTest(testId);
        if (isDeleted)
            navigate("/mytests");
    }

    const handleAddNewQuestion = () => setQuestions((prev: IQuestionFormField[]) => [...prev, getNewQuestionObject(selectedQuestionType)])

    const handleQuestionTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedQuestionType(QuestionType[value as keyof typeof QuestionType])
    }

    const handleDuplicateTest = async (testId: number) => {
        const result = await duplicateTest(testId);
        if (result !== -1)
            navigate(`/test/edit/${result}`)
    }

    const handleSolveButtonClick = () => {
        const fetchData = async () => {
            const result = await postData("testSession/create", solvingTestOptions, true);
            switch (result?.status) {
                case 200:
                    // toast.success("Successfully created test")
                    navigate(`/solveTest/${result.data}`)
                    break;
                case 400:
                    toast.error(result.data ?? "Unexpected error")
                    break;
                case 403:
                    toast.error("Unauthorized")
                    break;
                default:
                    toast.error("Unexpected error")
                    break;
            }
        }
        fetchData();
    }


    return (
        <>
            <Loader loading={loading} />

            <div className="content-title">{pageTitle}</div>

            <Button value={<BsArrowLeftCircleFill />} type='secondary' onClick={() => navigate("/mytests")} />
            {editMode && testId && <Button value={<FaClone />} onClick={() => handleDuplicateTest(parseInt(testId))} type='secondary' />}
            {editMode && testId && <Button value={<BsFillTrashFill />} onClick={() => handleDeleteTest(parseInt(testId))} type='danger' />}

            <TextField placeholder='Title' value={title} setValue={setTitle} readonly={!editMode} />
            <TextField placeholder='Description' value={description} setValue={setDescription} style={{ marginTop: "1rem", marginBottom: "1rem" }} readonly={!editMode} />

            {/* solving section */}
            <CheckboxField key='shuffleQuestions' name='solvingOption' label="Shuffle questions" checked={solvingTestOptions.shuffleQuestions} onChange={(e) => {
                setSolvingTestOptions((prev: ISolvingTestOptions) => { return { ...prev, shuffleQuestions: e.target.checked } })
            }} />
            <CheckboxField key='shuffleAnswers' name='solvingOption' label="Shuffle answers" checked={solvingTestOptions.shuffleAnswers} onChange={(e) => {
                setSolvingTestOptions((prev: ISolvingTestOptions) => { return { ...prev, shuffleAnswers: e.target.checked } })
            }} />

            <CheckboxField key='oneQuestionMode' name='solvingOption' label="One question mode" checked={solvingTestOptions.oneQuestionMode} onChange={(e) => {
                setSolvingTestOptions((prev: ISolvingTestOptions) => { return { ...prev, oneQuestionMode: e.target.checked } })
            }} />

            <Button value="Start!" onClick={handleSolveButtonClick} type='primary' />

            <QuestionForm questions={questions} setQuestions={setQuestions} editMode={editMode} />

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

                    {testId ?
                        <Button value="Modify" type='success' onClick={handleModifyTest} />
                        :
                        <Button value='Save' type='success' onClick={handleAddTest} />
                    }
                </>
            }
        </>
    )
}

export default Test
