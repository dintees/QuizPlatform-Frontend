import React, { useState } from 'react'
import { IQuestionFormField, IUserAnswersDto } from '../../Types'
import "../../assets/css/QuestionForm.scss"
import QuestionEditor from './QuestionEditor'
import { modifyAnswer, modifyQuestion, changeInputMode, changeCorrectAnswer, deleteQuestion, addEmptyAnswer, deleteAnswer, saveOneUserAnswerToDatabase } from '../../utils/testUtils'
import Button from './Button'
import { useParams } from 'react-router-dom'
import { QuestionType } from '../../Enums'

interface Props {
    questions: IQuestionFormField[],
    setQuestions: React.Dispatch<React.SetStateAction<IQuestionFormField[]>>,
    editMode: boolean,
    readonly?: boolean,
    oneQuestionMode?: boolean,
    testSessionId?: number,
    correctAnswers?: IUserAnswersDto[]
}


function QuestionForm(props: Props) {

    const [index, setIndex] = useState<number>(0);

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

    const handleNextButtonClick = async () => {
        if (!!props.testSessionId) {
            // const mappingTable = questions.map((question) => {
            //     if (question.questionType === QuestionType.ShortAnswer)
            //         return { questionId: question.id, shortAnswerValue: question.answers[0].answer }
            //     return { questionId: question.id, answerIds: question.answers.filter((answer) => answer.correct).map(e => e.id) }
            // })
            let mappingObj: IUserAnswersDto = { questionId: 0 };

            if (props.questions[index].questionType == QuestionType.ShortAnswer)
                mappingObj = { questionId: props.questions[index].id!, shortAnswerValue: props.questions[index].answers[0].answer }
            else
                mappingObj = { questionId: props.questions[index].id!, answerIds: props.questions[index].answers.filter((answer) => answer.correct).map(e => e.id!) }

            await saveOneUserAnswerToDatabase(props.testSessionId, mappingObj)
        }
        setIndex(i => i + 1)
    }

    const handleChangeInputMode = (questionIndex: number) => props.setQuestions(changeInputMode(props.questions, questionIndex))
    let questionNumber = -1;

    return (
        <div className="question-edit-box">
            {props.oneQuestionMode ?
                <>
                    <QuestionEditor
                        key={index}
                        question={props.questions[index].question}
                        questionIndex={index}
                        questionNumber={index}
                        answers={props.questions[index].answers}
                        questionType={props.questions[index].questionType}
                        editMode={props.editMode}
                        mathMode={props.questions[index].mathMode!}
                        handleChangeQuestion={handleChangeQuestion}
                        handleChangeAnswers={handleChangeAnswers}
                        handleChangeCorrectAnswer={handleChangeCorrectAnswer}
                        handleDeleteQuestion={handleDeleteQuestion}
                        handleAddAnswer={handleAddAnswer}
                        handleDeleteAnswer={handleDeleteAnswer}
                        handleCopyQuestion={handleCopyQuestion}
                        handleChangeInputMode={handleChangeInputMode}
                    />
                    {index + 1 < props.questions.length && <Button value="Next" onClick={handleNextButtonClick} />}
                </>
                :
                <>
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
                </>}
        </div>
    )
}

export default QuestionForm
