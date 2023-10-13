import { toast } from "react-toastify";
import { deleteData, postData } from "../AxiosHelper";
import { IQuestionFormField, IUserAnswersDto } from "../Types";
import { QuestionType } from "../Enums";

export const duplicateTest = async (testId: number) => {
    const result = await postData(`test/duplicate/${testId}`, {}, true);
    if (result?.status === 200) {
        toast.success("Successfully duplicated test")
        return result.data.value
    } else if (result?.status === 400) {
        toast.error(result?.data.errorMessage)
        return -1
    } else {
        toast.error("Internal server error.")
        return -1
    }
}

export const deleteTest = async (setId: number) => {
    const result = await deleteData(`test/delete/${setId}`, true);
    if (result?.status === 200) {
        toast.success("Successfully deleted");
        return true;
    } else {
        toast.error(result?.data.errorMessage);
    }
    return false;
}

export const modifyQuestion = (questions: IQuestionFormField[], questionIndex: number, newQuestion: string) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].question = newQuestion;
    return newQuestions;
}

export const deleteQuestion = (questions: IQuestionFormField[], questionIndex: number) => {
    const newQuestions = [...questions];
    if (!!newQuestions[questionIndex].id)
        newQuestions[questionIndex].isDeleted = true
    else
        newQuestions.splice(questionIndex, 1);

    return newQuestions;
}

export const addEmptyAnswer = (questions: IQuestionFormField[], questionIndex: number) => {
    const newQuestions = questions.map((question, index) => {
        if (index === questionIndex) return { ...question, answers: [...question.answers, { answer: "", correct: false }] }
        else return { ...question };
    })
    return newQuestions;
}

export const modifyAnswer = (questions: IQuestionFormField[], questionIndex: number, answerIndex: number, newAnswer: string) => {
    const newQuestions = [...questions];
    if (!!newQuestions[questionIndex].answers[answerIndex])
        newQuestions[questionIndex].answers[answerIndex].answer = newAnswer
    return newQuestions;
}

export const changeCorrectAnswer = (questions: IQuestionFormField[], questionIndex: number, answerIndex: number, checked: boolean) => {
    const newQuestions = [...questions];
    const question = newQuestions[questionIndex];
    if (question.answers[answerIndex]) {
        if (question.questionType !== QuestionType.MultipleChoice)
            question.answers.forEach((i) => i.correct = false)
        question.answers[answerIndex].correct = checked
    }
    return newQuestions;
}

export const deleteAnswer = (questions: IQuestionFormField[], questionIndex: number, answerIndex: number) => {
    const newQuestions = questions.map((question, index) => {
        if (index === questionIndex) {
            const updatedAnswers = [...question.answers];
            updatedAnswers.splice(answerIndex, 1);

            return {
                ...question,
                answers: updatedAnswers,
            };
        }
        return { ...question };
    });
    return newQuestions;
}



export const changeInputMode = (questions: IQuestionFormField[], questionIndex: number) => {
    return questions.map((question, index) => {
        if (questionIndex === index) return { ...question, mathMode: !question.mathMode }
        return question
    })
}

export const getNewQuestionObject = (selectedQuestionType: QuestionType) => {
    let newQuestionObj: IQuestionFormField = { questionType: selectedQuestionType, question: "", answers: [] }
    switch (selectedQuestionType) {
        case QuestionType.SingleChoice:
        case QuestionType.MultipleChoice:
            for (let i = 0; i < 3; ++i) newQuestionObj.answers.push({ answer: "", correct: false })
            break;
        case QuestionType.TrueFalse:
            newQuestionObj.answers.push({ answer: "True", correct: true })
            newQuestionObj.answers.push({ answer: "False", correct: false })
            break;
        case QuestionType.ShortAnswer:
            newQuestionObj.answers.push({ answer: "", correct: true })
            break;
    }
    return newQuestionObj;
}

export const saveOneUserAnswerToDatabase = async (testSessionId: number, userAnswerDto: IUserAnswersDto, last: boolean = false) => {
    const result = await postData(`testSession/saveOneAnswer/${testSessionId}/${last}`, userAnswerDto, true)
    return result?.status === 200
}