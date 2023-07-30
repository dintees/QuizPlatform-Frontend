export interface IPageHyperlink {
    url: string,
    name: string,
    icon: JSX.Element
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