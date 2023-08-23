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

    const qq: IQuestionFormField = {
        type: QuestionType.ShortAnswer,
        question: "Czy Ala ma kota?",
        answers: [{ answer: "tak", correct: true }]
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
        setQuestions((prev: IQuestionFormField[]) => [...prev, { type: QuestionType.ShortAnswer, question: "", answers: [{ answer: "", correct: true }] }])
    }

    const handleChangeQuestion = (index: number, value: string) => {
        setQuestions((prev: IQuestionFormField[]) => {
            const newState = [...prev]
            newState[index].question = value;
            return newState;
        })
    }


    return (
        <>
            <div className="content-title">New set</div>

            <TextField placeholder='Title' value={title} setValue={setTitle} />
            <TextField placeholder='Description' value={description} setValue={setDescription} style={{ marginTop: "1rem", marginBottom: "1rem" }} />

            <QuestionForm questions={questions} setQuestions={setQuestions} handleChangeQuestion={handleChangeQuestion} />

            <Button value="Add new question" type='primary' onClick={handleAddNewQuestion} />

            <Button value='Add' type='success' onClick={handleAddSet} />
        </>
    )
}

export default NewSet
