import React from 'react'
import { IAnswerFormField, IQuestionFormField } from '../../Types'
import TextField from './TextField'
import { QuestionType } from '../../Enums'
import { AiOutlineForm, AiOutlineCheckCircle, AiOutlineBorder, AiOutlineCheckSquare } from "react-icons/ai"
import "../../assets/css/QuestionForm.scss"
import RadioField from './RadioField'
import CheckboxField from './CheckboxField'

interface Props {
    questions: IQuestionFormField[],
    setQuestions: React.Dispatch<React.SetStateAction<IQuestionFormField[]>>,
    handleChangeQuestion: (index: number, value: string) => void
}


function QuestionForm(props: Props) {
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

    const handleChangeFieldAnswers = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => {
        return props.setQuestions((prev: IQuestionFormField[]) => {
            const newQuestions = [...prev];
            const question = newQuestions[questionIndex]
            if (question.answers[answerIndex]) {
                if (question.type !== QuestionType.MultipleChoice)
                    question.answers.forEach((i) => i.correct = false)
                question.answers[answerIndex].correct = e.target.checked
            }
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
                return (
                    <>
                        <div className='question-edit-icon'><AiOutlineBorder /></div>
                        <div className='question-edit-content'>
                            <TextField value={question.question} onChange={(e) => { handleChangeQuestion(e, index) }} />

                            {question.answers.map((answer: IAnswerFormField, answerIndex: number) => {
                                return <RadioField name={`question-${index}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }}
                                    onChange={(e) => handleChangeAnswers(e, index, answerIndex)}
                                />}
                                    onChange={(e) => handleChangeFieldAnswers(e, index, answerIndex)} />
                            })}
                        </div>
                    </>
                )


            case QuestionType.SingleChoice:
                return (
                    <>
                        <div className='question-edit-icon'><AiOutlineCheckCircle /></div>
                        <div className='question-edit-content'>
                            <TextField value={question.question} onChange={(e) => { handleChangeQuestion(e, index) }} />

                            {question.answers.map((answer: IAnswerFormField, answerIndex: number) => {
                                return <RadioField name={`question-${index}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }}
                                    onChange={(e) => handleChangeAnswers(e, index, answerIndex)}
                                />}
                                    onChange={(e) => handleChangeFieldAnswers(e, index, answerIndex)} />
                            })}
                        </div>
                    </>
                )

            case QuestionType.MultipleChoice:
                return (
                    <>
                        <div className='question-edit-icon'><AiOutlineCheckSquare /></div>
                        <div className='question-edit-content'>
                            <TextField value={question.question} onChange={(e) => { handleChangeQuestion(e, index) }} />

                            {question.answers.map((answer: IAnswerFormField, answerIndex: number) => {
                                return <CheckboxField name={`question-${index}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }}
                                    onChange={(e) => handleChangeAnswers(e, index, answerIndex)}
                                />}
                                    onChange={(e) => handleChangeFieldAnswers(e, index, answerIndex)} />
                            })}
                        </div>
                    </>
                )
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
