import React from 'react'
import { IAnswerFormField } from '../../Types';
import { QuestionType } from '../../Enums';
import TextField from './TextField';
import { AiOutlineBorder, AiOutlineCheckCircle, AiOutlineCheckSquare, AiOutlineForm } from 'react-icons/ai';
import CheckboxField from './CheckboxField';
import RadioField from './RadioField';

interface Props {
    question: string;
    questionIndex: number;
    answers: IAnswerFormField[];
    handleChangeQuestion: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleChangeAnswers: (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => void;
    handleChangeFieldAnswers: (e: React.ChangeEvent<HTMLInputElement>, questionIndex: number, answerIndex: number) => void;
    handleDeleteQuestion: (index: number) => void;
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
            <div className='question-edit-icon'>{getIcon(props.questionType)}</div>
            <div className='question-edit-content'>
                <TextField value={props.question} onChange={(e) => { props.handleChangeQuestion(e, props.questionIndex) }} />

                {props.answers.map((answer: IAnswerFormField, answerIndex: number) => {
                    switch (props.questionType) {
                        case QuestionType.SingleChoice:
                            return <RadioField name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }}
                                onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)}
                            />}
                                onChange={(e) => props.handleChangeFieldAnswers(e, props.questionIndex, answerIndex)} />

                        case QuestionType.MultipleChoice:
                            return <CheckboxField name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }}
                                onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, answerIndex)}
                            />}
                                onChange={(e) => props.handleChangeFieldAnswers(e, props.questionIndex, answerIndex)} />

                        case QuestionType.TrueFalse:
                            return <RadioField name={`question-${props.questionIndex}`} key={answerIndex} checked={answer.correct} label={<TextField value={answer.answer} style={{ width: 'auto' }} readonly={true} />}
                            onChange={(e) => props.handleChangeFieldAnswers(e, props.questionIndex, answerIndex)} />

                        case QuestionType.ShortAnswer:
                            return <TextField key={answerIndex} value={props.answers[0].answer} onChange={(e) => props.handleChangeAnswers(e, props.questionIndex, 0)} />
                    }

                })}
            </div>
            <div className='question-edit-delete' onClick={() => props.handleDeleteQuestion(props.questionIndex)}>&times;</div>
        </div>
    )
}

export default QuestionEditor
