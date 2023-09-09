import { LinkProps } from "react-router-dom"
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
    id: number,
    isAuthenticated: boolean,
    username: string,
    role: Role,
    email: string,
    token: string,
    pages: IPageHyperlink[]
};

export interface ILogin {
    email: string,
    password: string
};

export interface IRegister {
    username: string,
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
    name: string,
    type: React.HTMLInputTypeAttribute,
    placeholder?: string,
    value?: string
}

export interface IQuestionFormField {
    id?: number,
    questionType: QuestionType,
    question: string,
    answers: IAnswerFormField[]
};

export interface IAnswerFormField {
    id?: number,
    answer: string,
    correct: boolean
};

export interface UserSetTable {
    id: number,
    title: string,
    href: JSX.Element
}

export interface IResult<T> {
    success: boolean,
    value: T,
    errorMessage: string
}



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