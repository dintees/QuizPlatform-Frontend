import React, { useEffect, useState } from 'react'
import Button from '../common/Button'
import { BsArrowLeftCircleFill, BsPencilSquare } from 'react-icons/bs'
import Flashcard from '../common/Flashcard'
import { IFlashcards } from '../../Types';
import { getData } from '../../AxiosHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';

interface Props { }

function Flashcards(props: Props) {

    const { flashcardId, mode } = useParams();
    const [flashcards, setFlashcards] = useState<IFlashcards>({ flashcards: [], currentIndex: 0, maxIndex: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getData(`flashcard/get/${flashcardId}`, true)
            switch (result?.status) {
                case 200:
                    setFlashcards({ flashcards: result.data, currentIndex: 0, maxIndex: result.data.length - 1 })
                    break;
                default:
                    toast.error("Problem with server connection")
                    break;
            }
            setLoading(false)
        }

        fetchData();
    }, [])

    const handleClickFlashcard = (delta: number) => [
        setFlashcards(prev => { return { ...prev, currentIndex: prev.currentIndex + delta } })
    ]

    return (
        <>
            <Loader loading={loading} />
            {flashcards.flashcards[flashcards.currentIndex] == undefined ? <>Loading...</> : <>
                <div className="content-title">Flashcards</div>
                <Button value={<BsArrowLeftCircleFill />} type='secondary' onClick={() => navigate("/flashcards")} />
                <Button value={<BsPencilSquare />} type='secondary' onClick={() => navigate(`/flashcards/edit/${flashcardId}`)} />

                <Flashcard firstSide={flashcards.flashcards[flashcards.currentIndex].firstSide} secondSide={flashcards.flashcards[flashcards.currentIndex].secondSide} />

                <div className="text-center">
                    {flashcards.currentIndex > 0 && <Button value='PREV' onClick={() => handleClickFlashcard(-1)} />}
                    {flashcards.currentIndex < flashcards.maxIndex && <Button value='NEXT' onClick={() => handleClickFlashcard(1)} />}
                </div>
            </>
            }
        </>
    )
}

export default Flashcards
