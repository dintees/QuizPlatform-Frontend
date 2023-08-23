import React from 'react'
import { IQuestionFormField } from '../../Types'
import TextField from './TextField'
import { QuestionType } from '../../Enums'
import { AiOutlineForm } from "react-icons/ai"
import "../../assets/css/QuestionForm.scss"

interface Props {
    questions: IQuestionFormField[],
    setQuestions: React.Dispatch<React.SetStateAction<IQuestionFormField[]>>,
    handleChangeQuestion: (index: number, value: string) => void // ???
}


function QuestionForm(props: Props) {

    // const setName = (updateObject: { id: number; name: string }) => {
    //     setObjects((prevObjects) =>
    //       prevObjects.map((obj) =>
    //         obj.id === updateObject.id ? { ...obj, name: updateObject.name } : obj
    //       )
    //     );
    //   };

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        return props.setQuestions((prev: IQuestionFormField[]) => {
            const newQuestions = [...prev];
            newQuestions[index].question = e.target.value;
            return newQuestions;
        })
    }

    const handleChangeAnswers = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
        return props.setQuestions((prev: IQuestionFormField[]) => {
            const newQuestions = [...prev];
            if (newQuestions[questionIndex].answers[answerIndex])
                newQuestions[questionIndex].answers[answerIndex].answer = e.target.value
            return newQuestions;
        })
    }

    const renderQuestion = (question: IQuestionFormField, index: number) => {
        switch (question.type) {
            case QuestionType.ShortAnswer:
                return (
                    <>
                        <div className='question-edit-icon'><AiOutlineForm /></div>
                        <div className='question-edit-content'>
                            <TextField value={question.question} onChange={(e) => { handleChangeQuestion(e, index) }} />
                            <TextField value={question.answers[0].answer} onChange={(e) => { handleChangeAnswers(e, index, 0) }} />
                        </div>
                    </>
                )

            case QuestionType.TrueFalse:
                return <div>TRUE?FALSE</div>

        }
    }


    return (
        <>
            <div className="question-edit-box">
                {props.questions.map((question: IQuestionFormField, index: number) => {
                    return (
                        <div key={index} className="question-edit-tile">
                            {renderQuestion(question, index)}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default QuestionForm
