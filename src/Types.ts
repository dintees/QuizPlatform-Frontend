import { QuestionType, Role } from "./Enums"

export interface IPageHyperlink {
    url: string,
    name: string,
    icon: JSX.Element
};

export interface IAuthContext {
    auth: IAuthInformation,
    setAuth: React.Dispatch<React.SetStateAction<IAuthInformation>>
};

export interface IAuthInformation {
    isAuthenticated: boolean,
    username: string,
    firstname: string,
    lastname: string,
    role: Role,
    email: string,
    token: string,
    pages: IPageHyperlink[]
};

export interface ITestSessionOptions {
    title: string,
    description: string,
    oneQuestionMode: boolean,
    isCompleted: boolean,
    correctAnswers?: IUserAnswersDto[],
    score: number,
    maxScore: number,
};

export interface ILogin {
    email: string,
    password: string
};

export interface IRegister {
    username: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    roleId: number
};

export interface Question {
    id: number;
    question: string | null;
    questionType: QuestionType;
    answers: string[] | null;
};

export interface IFormField {
    key: string,
    name: string,
    type: React.HTMLInputTypeAttribute,
    placeholder?: string,
    value?: string,
    disabled?: boolean
}

export interface IQuestionFormField {
    id?: number,
    questionType: QuestionType,
    question: string,
    answers: IAnswerFormField[],
    isDeleted?: boolean,
    mathMode?: boolean
};

export interface IAnswerFormField {
    id?: number,
    answer: string,
    correct: boolean
};

export interface ISolvingTestOptions {
    testId: number,
    shuffleQuestions: boolean,
    shuffleAnswers: boolean,
    oneQuestionMode: boolean
};

export interface IUserAnswersDto {
    questionId: number,
    answerIds?: number[],
    shortAnswerValue?: string,
    isCorrect?: boolean,
};

export interface IResult<T> {
    success: boolean,
    value: T,
    errorMessage: string
}

export interface IUserFlashcard {
    id: number;
    title: string | JSX.Element | null,
    tsUpdate: string,
    actions: JSX.Element
};

export interface IFlashcard {
    id: number,
    firstSide: string,
    secondSide: string
};

export interface IFlashcards {
    flashcardItems: IFlashcard[],
    currentIndex: number,
    maxIndex: number
};


// === DTOs ===

export interface ISetDto {
    id: number;
    title: string | null;
    description: string | null;
    questions: IQuestionDto[] | null;
}

export interface IQuestionDto {
    id: number;
    question: string | null;
    questionType: QuestionType;
    answers: IAnswerFormField[] | null;
}

export interface IUserSetDto {
    id: number;
    title: string | JSX.Element | null;
    tsUpdate: string;
    author: string | null;
    actions: JSX.Element;
};

export interface IUserTestSessionDto {
    id: number;
    tsInsert: string;
    tsUpdate: string;
    testName: string | JSX.Element | null;
    isCompleted: boolean | string;
};

export interface IUserSessionDto {
    loggedInTime: string,
    ipAddress: string,
    browser: string
};

export interface IUserDto {
    id: number,
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    role: string,
    token: string,
    actions: JSX.Element | null,
};