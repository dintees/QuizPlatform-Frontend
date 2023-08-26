import React from 'react'
import { IQuestionFormField } from '../../Types'
import { QuestionType } from '../../Enums'
import "../../assets/css/QuestionForm.scss"
import QuestionEditor from './QuestionEditor'

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
                if (question.questionType !== QuestionType.MultipleChoice)
                    question.answers.forEach((i) => i.correct = false)
                question.answers[answerIndex].correct = e.target.checked
            }
            return newQuestions;
        })
    }

    const handleDeleteQuestion = (index: number) => {
        if (props.questions.length > 1)
            return props.setQuestions((prev: IQuestionFormField[]) => {
                const newQuestions = [...prev];
                newQuestions.splice(index, 1);
                return newQuestions;
            })
    }


    return (
        <>
            <div className="question-edit-box">
                {props.questions.map((question: IQuestionFormField, index: number) => {
                    return (
                        <QuestionEditor
                            key={index}
                            question={question.question}
                            questionIndex={index}
                            answers={question.answers}
                            handleChangeQuestion={handleChangeQuestion}
                            handleChangeAnswers={handleChangeAnswers}
                            handleChangeFieldAnswers={handleChangeFieldAnswers}
                            handleDeleteQuestion={handleDeleteQuestion}
                            questionType={question.questionType}
                        />
                    )
                })}
            </div>
        </>
    )
}

export default QuestionForm
