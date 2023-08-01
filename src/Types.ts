import React from "react"

export interface IPageHyperlink {
    url: string,
    name: string,
    icon: JSX.Element
};

export interface ILoaderContext {
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
};

export interface ILogin {
    email: string,
    password: string
};

export interface iRegister {
    username: string,
    email: string,
    password: string,
    passwordConfirmation: string
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