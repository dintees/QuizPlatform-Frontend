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
import { BsFillTrashFill, BsArrowLeftCircleFill, BsFillUnlockFill, BsFillLockFill, BsFillLightbulbFill } from 'react-icons/bs'
import { FaClone } from 'react-icons/fa'
import { duplicateTest, deleteTest, getNewQuestionObject, generateFlashcards } from '../../utils/testUtils'
import CheckboxField from '../common/CheckboxField'
import Modal from '../common/Modal'
import { AiFillPlayCircle } from 'react-icons/ai'

function Test() {
    const { mode, testId } = useParams();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>(QuestionType.SingleChoice);
    const [editMode, setEditMode] = useState<boolean>(true);
    const [solvingTestOptions, setSolvingTestOptions] = useState<ISolvingTestOptions>({ shuffleQuestions: false, shuffleAnswers: false, oneQuestionMode: false, testId: !!testId ? parseInt(testId) : 0 });
    const [pageTitle, setPageTitle] = useState<string>("Create new test");
    const [isPublic, setIsPublic] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);

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
                    setIsPublic(result.data.isPublic)
                    setSolvingTestOptions(prev => {
                        return { ...prev, shuffleQuestions: result.data.shuffleQuestions, shuffleAnswers: result.data.shuffleAnswers, oneQuestionMode: result.data.oneQuestionMode }
                    })
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
            const dataObj = {
                title: title,
                description: description,
                questions: questions,
                isPublic: isPublic,
                shuffleQuestions: solvingTestOptions.shuffleQuestions,
                shuffleAnswers: solvingTestOptions.shuffleAnswers,
                oneQuestionMode: solvingTestOptions.oneQuestionMode
            }
            const result = await postData("test/createWithQuestions", dataObj, true);

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
            const dataObj = {
                title: title,
                description: description,
                questions: questions,
                isPublic: isPublic,
                shuffleQuestions: solvingTestOptions.shuffleQuestions,
                shuffleAnswers: solvingTestOptions.shuffleAnswers,
                oneQuestionMode: solvingTestOptions.oneQuestionMode
            }
            const result = await putData(`test/edit/${testId}`, dataObj, true);

            if (result?.status === 200) {
                if (result.data.success === true) {
                    // test has been modified 
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
        if (isDeleted) {
            toast.success("Successfully deleted test")
            navigate("/mytests");
        }
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

    const handleGenerateFlashcards = async (testId: number) => {
        const result = await generateFlashcards(testId);
        if (result !== -1) {
            toast.success("Succesfully created flashcards")
            navigate(`/flashcards/view/${result}`)
        } else {
            toast.error("An error occured")
        }
    }

    const handleSolveButtonClick = () => {
        const fetchData = async () => {
            let options = solvingTestOptions;
            if (solvingTestOptions.testId === 0)
                options.testId = parseInt(testId!)
            const result = await postData("testSession/create", options, true);
            switch (result?.status) {
                case 200:
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
            <Modal open={openModal} title="Remove test" onClose={() => setOpenModal(false)} buttons={
                <>
                    <Button type="danger" value="Delete" onClick={() => handleDeleteTest(parseInt(testId!))} />
                    <Button value="Close" onClick={() => setOpenModal(false)} />
                </>
            }>Are you sure you want to pernamently delete the test?</Modal>

            <Loader loading={loading} />

            <div className="content-title">{pageTitle}</div>

            <Button value={<BsArrowLeftCircleFill />} tooltip='Go back' type='secondary' onClick={() => navigate("/mytests")} />
            {editMode && testId && <>
                <Button value={<FaClone />} tooltip="Duplicate test!" onClick={() => handleDuplicateTest(parseInt(testId))} type='secondary' />
                <Button value={<BsFillLightbulbFill />} tooltip='Generate flashcards' onClick={() => handleGenerateFlashcards(parseInt(testId))} type='secondary' />
                <Button value={isPublic ? <BsFillUnlockFill /> : <BsFillLockFill />} tooltip={isPublic ? 'Make private' : 'Make public'} onClick={() => setIsPublic(e => !e)} type='secondary' />
                <Button value={<AiFillPlayCircle />} tooltip='Start solving!' onClick={handleSolveButtonClick} type='success' />
                <Button value={<BsFillTrashFill />} tooltip='Delete' onClick={() => setOpenModal(true)} type='danger' />
            </>
            }

            <TextField placeholder='Title' value={title} setValue={setTitle} readonly={!editMode} />
            <TextField placeholder='Description' value={description} setValue={setDescription} style={{ marginTop: "1rem", marginBottom: "1rem" }} readonly={!editMode} />


            {/* solving section */}
            {editMode && testId && <>
                <CheckboxField className='d-inline' key='shuffleQuestions' name='solvingOption' label="Shuffle questions" checked={solvingTestOptions.shuffleQuestions} onChange={(e) => {
                    setSolvingTestOptions((prev: ISolvingTestOptions) => { return { ...prev, shuffleQuestions: e.target.checked } })
                }} />
                <CheckboxField className='d-inline' key='shuffleAnswers' name='solvingOption' label="Shuffle answers" checked={solvingTestOptions.shuffleAnswers} onChange={(e) => {
                    setSolvingTestOptions((prev: ISolvingTestOptions) => { return { ...prev, shuffleAnswers: e.target.checked } })
                }} />
                <CheckboxField className='d-inline' key='oneQuestionMode' name='solvingOption' label="One question mode" checked={solvingTestOptions.oneQuestionMode} onChange={(e) => {
                    setSolvingTestOptions((prev: ISolvingTestOptions) => { return { ...prev, oneQuestionMode: e.target.checked } })
                }} />
            </>
            }

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
