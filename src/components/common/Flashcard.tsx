import React, { useEffect, useState } from 'react'
import "../../assets/css/Flashcard.scss"
import { InlineMath } from 'react-katex';

interface Props {
    firstSide: string,
    secondSide: string
}

function Flashcard(props: Props) {

    const [front, setFront] = useState<string>("")
    const [back, setBack] = useState<string>("")

    const renderMathPreview = (text: string) => {
        const replacedText = text.split(/\$(.*?)\$/g).map((part, index) => {
            return index % 2 === 0 ? part : <InlineMath key={index} math={part} renderError={(e) => <>{e.name}</>} />
        });
        return <>{replacedText}</>;
    }

    useEffect(() => {
        setFront(isFlipped ? props.secondSide : props.firstSide)
        setBack(isFlipped ? props.firstSide : props.secondSide)
    }, [props])

    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const handleClick = () => setIsFlipped(prev => !prev);


    return (
        <div className={`flashcard-container`} onClick={handleClick}>
            <div className={`flashcard-item ${isFlipped ? 'flipped' : ''}`}>
                <div className="front">{renderMathPreview(front)}</div>
                <div className="back">{renderMathPreview(back)}</div>
            </div>
        </div>
    )
}

export default Flashcard
