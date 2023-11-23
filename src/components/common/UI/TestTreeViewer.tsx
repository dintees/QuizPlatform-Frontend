import React from 'react'
import { ISetDto } from '../../../Types';

interface Props {
    tests: ISetDto[],
    selectedQuestions: number[],
    setSelectedQuestions: React.Dispatch<React.SetStateAction<number[]>>,
};

function TestTreeViewer(props: Props) {
    const handleChangeCheckbox = (itemId: number) => {
        props.setSelectedQuestions((prevSelectedItems) =>
            prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter((id) => id !== itemId)
                : [...prevSelectedItems, itemId]
        );
    };

    return (
        <div>
            {props.tests.map((test) => (
                <details key={test.id}>
                    <summary>{test.title}</summary>
                    {test.questions!.map((question, index) => (
                        <div key={question.id}>
                            <label>
                                <input type="checkbox" checked={props.selectedQuestions.includes(Number(question.id))} onChange={() => handleChangeCheckbox(Number(question.id))}
                                />
                                {question.question}
                            </label>
                        </div>
                    ))}
                </details>
            ))}
        </div>
    );
}

export default TestTreeViewer
