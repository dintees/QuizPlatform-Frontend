import React from "react"

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
    username: string,
    role: Roles,
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

export enum QuestionTypeName {
    SingleChoice,
    MultipleChoice,
    TrueFalse,
    ShortAnswer
};

export interface Question {
    id: number;
    question: string | null;
    questionType: QuestionTypeName;
    answers: string[] | null;
};

export enum Roles {
    NotAuthorized,
    Admin,
    User
};