import React from 'react'
import { IAnswerFormField } from '../../Types';
import { QuestionType } from '../../Enums';
import TextField from './TextField';
import { AiOutlineBorder, AiOutlineCheckCircle, AiOutlineCheckSquare, AiOutlineForm } from 'react-icons/ai';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';
import Button from './Button';

interface Props {
    question: string;
    questionIndex: number;
    answers: IAnswerFormField[];
    handleChangeQuestion: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleChangeAnswers: (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => void;
    handleChangeFieldAnswers: (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => void;
    handleDeleteQuestion: (index: number) => void;
    handleAddAnswer: (questionIndex: number) => void;
    questionType: QuestionType;
}

function QuestionEditor(props: Props) {

    const getIcon = (questionType: QuestionType) => {
        switch (questionType) {
            case QuestionType.SingleChoice: return <AiOutlineCheckCircle />
            case QuestionType.MultipleChoice: return <AiOutlineCheckSquare />
            case QuestionType.TrueFalse: return <AiOutlineBorder />
            case QuestionType.ShortAnswer: return <AiOutlineForm />
        }
    }


    return (
        <div key={props.questionIndex} className="question-edit-tile">
            <div className='question-edit-icon'>{getIcon(props.questionType)} {props.questionIndex + 1}.</div>
            <div className='question-edit-content'>
                <TextField value={props.question} onChange={(e) => { props.handleChangeQuestion(e, props.questionIndex) }} />

                {props.answers.map((answer: IAnswerFormField, answerIndex: number) => {
                    let renderElement: React.ReactNode = null;
                    switch (props.questionType) {
                        case QuestionType.SingleChoice:
                            renderElement = (<RadioField name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }}
                                onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)}
                            />}
                                onChange={(e) => props.handleChangeFieldAnswers(e, props.questionIndex, answerIndex)} />)
                            break;

                        case QuestionType.MultipleChoice:
                            renderElement = (<CheckboxField name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }}
                                onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)}
                            />}
                                onChange={(e) => props.handleChangeFieldAnswers(e, props.questionIndex, answerIndex)} />)
                            break;

                        case QuestionType.TrueFalse:
                            renderElement = (<RadioField name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }} readonly={true} />}
                                onChange={(e) => props.handleChangeFieldAnswers(e, props.questionIndex, answerIndex)} />)
                            break;

                        case QuestionType.ShortAnswer:
                            renderElement = (<TextField key={answerIndex} value={props.answers[answerIndex].answer} onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)} />)
                            break;
                    }
                    return renderElement;
                })}
                {props.questionType !== QuestionType.TrueFalse && <Button value="+" type='primary' style={{ alignSelf: "flex-start", marginLeft: "2rem" }} onClick={(e) => props.handleAddAnswer(props.questionIndex)} />}
            </div>
            <div className='question-edit-delete' onClick={() => props.handleDeleteQuestion(props.questionIndex)}>&times;</div>
        </div>
    )
}

export default QuestionEditor
