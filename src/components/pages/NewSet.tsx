import React, { useState } from 'react'
import Button from '../common/Button'
import { postData } from '../../AxiosHelper'
import TextField from '../common/TextField'
import { IQuestionFormField } from '../../Types'
import QuestionForm from '../common/QuestionForm'
import { QuestionType } from '../../Enums'

function NewSet() {

    const [title, setTitle] = useState<string>("New set");
    const [description, setDescription] = useState<string>("");
    const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>(QuestionType.SingleChoice);

    const initialQuestion: IQuestionFormField = {
        questionType: QuestionType.SingleChoice,
        question: "",
        answers: [{ answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }, { answer: "", correct: false }]
    }

    const [questions, setQuestions] = useState<IQuestionFormField[]>([initialQuestion]);


    const handleAddSet = () => {

        console.log("Adding set...");
        console.log("Title: " + title);
        console.log("Description: " + description);
        console.log("Content");
        console.log(questions);


        const fetchData = async () => {
            const result = await postData("set/createWithQuestions", { title: title, description: description, questions: questions }, true);
            console.log(result);

        }

        fetchData();
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
            <div className="content-title">New set</div>

            <TextField placeholder='Title' value={title} setValue={setTitle} />
            <TextField placeholder='Description' value={description} setValue={setDescription} style={{ marginTop: "1rem", marginBottom: "1rem" }} />

            <QuestionForm questions={questions} setQuestions={setQuestions} handleChangeQuestion={handleChangeQuestion} />

            <div className="text-center">
                <select className='form-control' onChange={handleQuestionTypeChange}>
                    {Object.keys(QuestionType).filter((v) => isNaN(Number(v))).map((type: string) =>
                        <option key={type}>{type}</option>
                    )}
                </select>

                <Button value='Add' type='primary' onClick={handleAddNewQuestion} />
            </div>

            <Button value='Save' type='success' onClick={handleAddSet} />
        </>
    )
}

export default NewSet
