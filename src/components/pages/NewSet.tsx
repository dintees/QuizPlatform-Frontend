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
    const [selectedQuestionType, setSelectedQuestionType] = useState<QuestionType>(QuestionType.ShortAnswer);

    const qq: IQuestionFormField = {
        type: QuestionType.MultipleChoice,
        question: "Czy Ala ma kota?",
        answers: [{ answer: "tak", correct: true }, { answer: "nie", correct: false }, { answer: "nie wiem", correct: true }]
    }

    const [questions, setQuestions] = useState<IQuestionFormField[]>([qq]);


    const handleAddSet = () => {

        console.log("Adding set...");
        console.log("Title: " + title);
        console.log("Description: " + description);
        console.log("Content");
        console.log(questions);


        const fetchData = async () => {
            // const result = await postData("Set/create", { title: "First set AUTO", description: "This is description" }, true);
            // console.log(result);

        }

        fetchData();
    }

    const handleAddNewQuestion = () => {
        setQuestions((prev: IQuestionFormField[]) => [...prev, { type: selectedQuestionType, question: "", answers: [{ answer: "", correct: true }] }])
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

            <select onChange={handleQuestionTypeChange}>
                {Object.keys(QuestionType).filter((v) => isNaN(Number(v))).map((type: string) =>
                    <option key={type}>{type}</option>
                )}
            </select>

            <Button value="Add new question" type='primary' onClick={handleAddNewQuestion} />

            <Button value='Add' type='success' onClick={handleAddSet} />
        </>
    )
}

export default NewSet
