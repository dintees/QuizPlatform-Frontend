import React from 'react'
import { IAnswerFormField, IUserAnswersDto } from '../../Types';
import { QuestionType } from '../../Enums';
import TextField from './TextField';
import { AiOutlineBorder, AiOutlineCheckCircle, AiOutlineCheckSquare, AiOutlineForm, AiFillDelete, AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { BiMath, BiText } from 'react-icons/bi'
import { FaClone } from 'react-icons/fa';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import Button from './Button';

interface Props {
    question: string,
    questionIndex: number,
    questionNumber: number,
    answers: IAnswerFormField[],
    questionType: QuestionType,
    editMode: boolean,
    mathMode: boolean,
    readonly?: boolean,
    correctAnswers?: IUserAnswersDto,
    disableQuestionNumber?: boolean,
    handleChangeQuestion: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void,
    handleChangeAnswers: (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => void,
    handleChangeCorrectAnswer: (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => void,
    handleDeleteQuestion: (index: number) => void,
    handleAddAnswer: (questionIndex: number) => void,
    handleDeleteAnswer: (questionIndex: number, answerIndex: number) => void,
    handleCopyQuestion: (questionIndex: number) => void,
    handleChangeInputMode: (questionIndex: number) => void
}

function QuestionEditor(props: Props) {

    const getIcon = (questionType: QuestionType) => {
        if (!!props.correctAnswers)
            return props.correctAnswers.isCorrect ? <AiFillCheckCircle className='color-success' /> : <AiFillCloseCircle className='color-danger' />;

        switch (questionType) {
            case QuestionType.SingleChoice: return <AiOutlineCheckCircle />
            case QuestionType.MultipleChoice: return <AiOutlineCheckSquare />
            case QuestionType.TrueFalse: return <AiOutlineBorder />
            case QuestionType.ShortAnswer: return <AiOutlineForm />
        }
    }

    return (
        <div key={props.questionIndex} className="question-edit-tile">
            <div className='question-edit-icon'>{getIcon(props.questionType)} {!props.disableQuestionNumber && (props.questionNumber + 1) + '.'}</div>
            <div className='question-edit-content'>
                <TextField value={props.question} disabled={!props.editMode} mathMode={props.mathMode} multiline={!props.mathMode} onChange={(e) => { props.handleChangeQuestion(e, props.questionIndex) }} />

                <div className='question-edit-answers'>
                    {props.answers.map((answer: IAnswerFormField, answerIndex: number) => {
                        let renderElement: React.ReactNode = null;
                        const isCorrectAnswer = !!props.correctAnswers?.answerIds && props.correctAnswers?.answerIds.find(e => e === answer.id) ? "color-success text-bold" : undefined
                        switch (props.questionType) {
                            case QuestionType.SingleChoice:
                                renderElement = (<RadioField readonly={props.readonly} name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} className={isCorrectAnswer} label={<TextField disabled={!props.editMode} value={answer.answer} mathMode={props.mathMode}
                                    onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)}
                                />}
                                    onChange={(e) => props.handleChangeCorrectAnswer(e, props.questionIndex, answerIndex)} />)
                                break;

                            case QuestionType.MultipleChoice:
                                renderElement = (<CheckboxField readonly={props.readonly} name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} className={isCorrectAnswer} label={<TextField disabled={!props.editMode} value={answer.answer} mathMode={props.mathMode}
                                    onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)}
                                />}
                                    onChange={(e) => props.handleChangeCorrectAnswer(e, props.questionIndex, answerIndex)} />)
                                break;

                            case QuestionType.TrueFalse:
                                renderElement = (<RadioField readonly={props.readonly} name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} className={isCorrectAnswer} label={<TextField value={answer.answer} disabled={true} />}
                                    onChange={(e) => props.handleChangeCorrectAnswer(e, props.questionIndex, answerIndex)} />)
                                break;

                            case QuestionType.ShortAnswer:
                                renderElement = (<div className='form-control'><TextField key={answerIndex} readonly={props.readonly} value={props.answers[answerIndex].answer} onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)} />
                                    {!!props.correctAnswers?.shortAnswerValue && <div className='text-sm color-success text-bold'>Correct: {props.correctAnswers?.shortAnswerValue}</div>}
                                </div>)
                                break;
                        }
                        return <div
                            key={`answer-${answerIndex}`} className='question-edit-answer'>{renderElement}
                            {props.editMode && props.questionType !== QuestionType.TrueFalse &&
                                <div className="question-edit-delete" onClick={() => props.handleDeleteAnswer(props.questionIndex, answerIndex)}>&times;</div>
                            }
                        </div>;
                    })}
                </div>
                {props.editMode && props.questionType !== QuestionType.TrueFalse && <Button value="+" type='primary' style={{ alignSelf: "flex-start", marginLeft: "2rem" }} onClick={(e) => props.handleAddAnswer(props.questionIndex)} />}
            </div>
            {props.editMode &&
                <div className='question-edit-delete'>
                    <div className='tooltip' data-tooltip='Delete question' onClick={() => props.handleDeleteQuestion(props.questionIndex)}><AiFillDelete /></div>
                    <div className='color-primary tooltip' data-tooltip='Duplicate question' onClick={() => props.handleCopyQuestion(props.questionIndex)}><FaClone /></div>
                    <div className='color-primary tooltip' data-tooltip={`${props.mathMode ? 'Math' : 'Text'} mode`} onClick={() => props.handleChangeInputMode(props.questionIndex)}>{props.mathMode ? <BiMath /> : <BiText />}</div>
                </div>
            }
        </div>
    )
}

export default QuestionEditor
