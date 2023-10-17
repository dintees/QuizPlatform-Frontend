import React, { useEffect, useState } from 'react'
import Button from '../common/Button'
import { BsArrowLeftCircleFill, BsCollectionPlayFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs'
import Flashcard from '../common/Flashcard'
import { IFlashcards } from '../../Types';
import { deleteData, getData, postData, putData } from '../../AxiosHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';
import FlashcardBox from '../common/FlashcardBox';
import TextField from '../common/TextField';
import Modal from '../common/Modal';

function Flashcards() {

    const { flashcardId, mode } = useParams();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [flashcards, setFlashcards] = useState<IFlashcards>({ flashcardItems: [], currentIndex: 0, maxIndex: 0 });
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getData(`flashcard/get/${flashcardId}`, true)

            switch (result?.status) {
                case 200:
                    setTitle(result.data.title)
                    setDescription(result.data.description)
                    setFlashcards({ flashcardItems: result.data.flashcardItems, currentIndex: 0, maxIndex: result.data.flashcardItems.length - 1 })
                    break;
                case 404:
                    toast.error("Flashcards not found");
                    navigate("/flashcards")
                    break;
                default:
                    toast.error("Problem with server connection")
                    break;
            }
            setLoading(false)
        }
        if (!!flashcardId)
            fetchData();
        else
            setFlashcards({ flashcardItems: [{ id: 0, firstSide: "", secondSide: "" }], currentIndex: 0, maxIndex: 0 })
    }, [flashcardId])

    const handleClickFlashcard = (delta: number) => {
        setFlashcards(prev => { return { ...prev, currentIndex: prev.currentIndex + delta } })
    }

    const handleAddFlashcard = () => {
        const newFlashcards = { ...flashcards };
        newFlashcards.flashcardItems.push({ id: 0, firstSide: "", secondSide: "" })
        setFlashcards(newFlashcards)
    }

    const handleChangeFlashcard = (index: number, flipped: boolean, value: string) => {
        const newFlashcards = { ...flashcards };
        !flipped ? newFlashcards.flashcardItems[index].firstSide = value : newFlashcards.flashcardItems[index].secondSide = value;
        setFlashcards(newFlashcards)
    }

    const handleDeleteFlashcard = (index: number) => {
        const newFlashcards = { ...flashcards };
        newFlashcards.flashcardItems = newFlashcards.flashcardItems.filter((_, i) => i !== index)
        setFlashcards(newFlashcards);
    }

    const handleCreate = async () => {
        const data = { title, description, flashcardItems: flashcards.flashcardItems }
        const result = await postData(`flashcard/create`, data, true);
        if (result?.status === 200) {
            setFlashcards(e => { return { ...e, maxIndex: e.flashcardItems.length - 1 } })
            navigate(`/flashcards/view/${result.data}`)
            toast.success("Successfully created!")
        }
        else
            toast.error(result?.data ?? "Problem with server connection")
    }

    const handleModify = async () => {
        const data = { title, description, flashcardItems: flashcards.flashcardItems }
        const result = await putData(`flashcard/edit/${flashcardId}`, data, true);
        if (result?.status === 200)
            toast.success("Successfully modified!")
        else
            toast.error(result?.data ?? "Problem with server connection")
    }

    const handleDeleteFlashcardsSet = async () => {
        const result = await deleteData(`flashcard/delete/${flashcardId}`, true);

        if (result?.status === 200) {
            toast.success("Successfully deleted flashcards")
            navigate("/flashcards")
        }
        setOpenModal(false);
    }

    return (
        <>
            <Modal open={openModal} title="Remove test" onClose={() => setOpenModal(false)} buttons={
                <>
                    <Button type="danger" value="Delete" onClick={handleDeleteFlashcardsSet} />
                    <Button value="Close" onClick={() => setOpenModal(false)} />
                </>
            }>Are you sure you want to pernamently delete the flashcards?</Modal>
            <Loader loading={loading} />
            {mode === "edit" ?
                <>
                    <div className="content-title">{!!flashcardId ? <>Edit flashcards</> : <>Create new flashcards</>}</div>
                    <Button value={<BsArrowLeftCircleFill />} tooltip='Go back' type='secondary' onClick={() => navigate("/flashcards")} />
                    {!!flashcardId &&
                        <>
                            <Button value={<BsCollectionPlayFill />} tooltip='Start learning' type='secondary' onClick={() => navigate(`/flashcards/view/${flashcardId}`)} />
                            <Button value={<BsFillTrashFill />} tooltip='Delete' onClick={() => setOpenModal(true)} type='danger' />
                        </>
                    }

                    <div className="mb-3">
                        <TextField style={{ marginBottom: "0.5rem" }} value={title} setValue={setTitle} placeholder='Title' />
                        <TextField value={description} setValue={setDescription} placeholder='Description' />
                    </div>

                    {flashcards.flashcardItems.map((flashcard, index) => {
                        return <FlashcardBox key={index} index={index} flashcard={flashcard}
                            handleChangeFlashcard={handleChangeFlashcard}
                            handleDeleteFlashcard={handleDeleteFlashcard} />
                    })}
                    <div><Button value="+" type='primary' onClick={handleAddFlashcard} /></div>
                    {!!flashcardId ?
                        <Button value="Modify" type="success" onClick={handleModify} /> :
                        <Button value="Create" type="success" onClick={handleCreate} />}
                </>
                :
                <>
                    {flashcards.flashcardItems[flashcards.currentIndex] === undefined ? <>Loading...</> : <>
                        <div className="content-title">{title}</div>
                        <h5>{description}</h5>

                        <Button value={<BsArrowLeftCircleFill />} tooltip='Go back' type='secondary' onClick={() => navigate("/flashcards")} />
                        <Button value={<BsPencilSquare />} tooltip='Edit' type='secondary' onClick={() => navigate(`/flashcards/edit/${flashcardId}`)} />

                        <h3 className='text-center'>{flashcards.currentIndex + 1} / {flashcards.maxIndex + 1}</h3>

                        <Flashcard firstSide={flashcards.flashcardItems[flashcards.currentIndex].firstSide} secondSide={flashcards.flashcardItems[flashcards.currentIndex].secondSide} />

                        <div className="text-center">
                            <Button value='PREV' disabled={flashcards.currentIndex === 0} onClick={() => handleClickFlashcard(-1)} />
                            <Button value='NEXT' disabled={flashcards.currentIndex >= flashcards.maxIndex} onClick={() => handleClickFlashcard(1)} />
                        </div>
                    </>
                    }
                </>
            }
        </>
    )
}

export default Flashcards
