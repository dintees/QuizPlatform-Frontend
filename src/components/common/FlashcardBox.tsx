import React from 'react'
import { IFlashcard } from '../../Types'
import TextField from './TextField'

interface Props {
    index: number,
    flashcard: IFlashcard,
    handleChangeFlashcard: (index: number, flipped: boolean, value: string) => void,
    handleDeleteFlashcard: (index: number) => void,
}

function FlashcardBox(props: Props) {
    return (
        <div className='flashcard-edit'>
            <div>{props.index + 1}.</div>
            <div><TextField value={props.flashcard.firstSide} multiline={true} onChange={(e) => props.handleChangeFlashcard(props.index, false, e.target.value)} /></div>
            <div><TextField value={props.flashcard.secondSide} multiline={true} onChange={(e) => props.handleChangeFlashcard(props.index, true, e.target.value)} /></div>
            <div>
                <span className="color-danger c-pointer text-bold" onClick={() => props.handleDeleteFlashcard(props.index)}>&times;</span>
            </div>
        </div>
    )
}

export default FlashcardBox
