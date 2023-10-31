import React from 'react'
import { IQuestionFormField, IUserAnswersDto } from '../../Types'
import "../../assets/css/QuestionForm.scss"
import QuestionEditor from './QuestionEditor'
import { modifyAnswer, modifyQuestion, changeInputMode, changeCorrectAnswer, deleteQuestion, addEmptyAnswer, deleteAnswer } from '../../utils/testUtils'

interface Props {
    questions: IQuestionFormField[],
    setQuestions: React.Dispatch<React.SetStateAction<IQuestionFormField[]>>,
    editMode: boolean,
    readonly?: boolean,
    correctAnswers?: IUserAnswersDto[],
    disableQuestionNumber?: boolean,
}


function QuestionForm(props: Props) {

    const handleChangeQuestion = (e: React.ChangeEvent<HTMLInputElement>, index: number) => props.setQuestions((questions: IQuestionFormField[]) => modifyQuestion(questions, index, e.target.value))

    const handleChangeAnswers = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => props.setQuestions((questions: IQuestionFormField[]) => modifyAnswer(questions, questionIndex, answerIndex, e.target.value))

    const handleChangeCorrectAnswer = (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => props.setQuestions((questions: IQuestionFormField[]) => changeCorrectAnswer(questions, questionIndex, answerIndex, e.target.checked))

    const handleDeleteQuestion = (questionIndex: number) => {
        if (props.questions.length > 1)
            props.setQuestions((questions: IQuestionFormField[]) => deleteQuestion(questions, questionIndex))
    }

    const handleAddAnswer = (questionIndex: number) => props.setQuestions((questions: IQuestionFormField[]) => addEmptyAnswer(questions, questionIndex))

    const handleDeleteAnswer = (questionIndex: number, answerIndex: number) => props.setQuestions((questions: IQuestionFormField[]) => deleteAnswer(questions, questionIndex, answerIndex))


    const handleCopyQuestion = (questionIndex: number) => {
        let clonedQuestion = { ...props.questions[questionIndex] }
        clonedQuestion.id = 0;
        clonedQuestion.answers = clonedQuestion.answers.map((e) => { return { ...e, id: 0 } })

        props.setQuestions((prev: IQuestionFormField[]) => {
            return [...prev.slice(0, questionIndex + 1), clonedQuestion, ...prev.slice(questionIndex + 1)];
        })
    }

    const handleChangeInputMode = (questionIndex: number) => props.setQuestions(changeInputMode(props.questions, questionIndex))
    let questionNumber = -1;

    return (
        <div className="question-edit-box">
            {props.questions.map((question: IQuestionFormField, index: number) => {
                if (!question.isDeleted) questionNumber++;
                return (!question.isDeleted &&
                    <QuestionEditor
                        key={index}
                        question={question.question}
                        questionIndex={index}
                        questionNumber={questionNumber}
                        answers={question.answers}
                        questionType={question.questionType}
                        editMode={props.editMode}
                        mathMode={question.mathMode!}
                        readonly={props.readonly}
                        disableQuestionNumber={props.disableQuestionNumber}
                        correctAnswers={props.correctAnswers?.filter(e => e.questionId === question.id)[0]}
                        handleChangeQuestion={handleChangeQuestion}
                        handleChangeAnswers={handleChangeAnswers}
                        handleChangeCorrectAnswer={handleChangeCorrectAnswer}
                        handleDeleteQuestion={handleDeleteQuestion}
                        handleAddAnswer={handleAddAnswer}
                        handleDeleteAnswer={handleDeleteAnswer}
                        handleCopyQuestion={handleCopyQuestion}
                        handleChangeInputMode={handleChangeInputMode}
                    />
                )
            })}
        </div>
    )
}

export default QuestionForm
