import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../../AxiosHelper'
import { IUserFlashcard } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../common/Table';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';
import Button from '../common/Button';
import { BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import Modal from '../common/Modal';

function FlashcardsList() {

    const [userFlashcards, setUserFlashcards] = useState<IUserFlashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [flashcardsSetIdToDelete, setFlashcardsSetIdToDelete] = useState<number>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getData("flashcard/getlist", true)
            switch (result?.status) {
                case 200:
                    result.data.forEach((i: IUserFlashcard) => {
                        i.tsUpdate = formatDate(i.tsUpdate)
                        i.title = <Link className='a-link' to={`/flashcards/view/${i.id}`}>{i.title}</Link>
                        i.actions = <div className='d-flex flex-start'>
                            <div className='c-pointer tooltip' data-tooltip='Edit' style={{ marginRight: ".5rem" }} onClick={() => navigate(`/flashcards/edit/${i.id}`)}><BsPencilSquare /></div>
                            <div className='color-danger c-pointer tooltip' data-tooltip='Delete' onClick={() => handleOpenModal(i.id)}><BsFillTrashFill /></div>
                        </div>
                    })
                    setUserFlashcards(result.data)
                    break;
                default:
                    toast.error("Problem with server connection")
                    break;
            }
            setLoading(false);
        }

        fetchData();
    }, [navigate])

    const handleOpenModal = (flashcardsSetId: number) => {
        setOpenModal(true);
        setFlashcardsSetIdToDelete(flashcardsSetId)
    }

    const handleDeleteFlashcardsSet = async () => {
        if (!!flashcardsSetIdToDelete) {
            const result = await deleteData(`flashcard/delete/${flashcardsSetIdToDelete}`, true);

            if (result?.status === 200) {
                setUserFlashcards(prev => {
                    return prev.filter((e => e.id !== flashcardsSetIdToDelete))
                })
                toast.success("Successfully deleted flashcards")
            }
        }
        setOpenModal(false);
    }


    return (
        <>
            <Loader loading={loading} />
            <Modal open={openModal} title="Remove test" onClose={() => setOpenModal(false)} buttons={
                <>
                    <Button type="danger" value="Delete" onClick={handleDeleteFlashcardsSet} />
                    <Button value="Close" onClick={() => setOpenModal(false)} />
                </>
            }>Are you sure you want to pernamently delete the flashcards?</Modal>

            <div className="content-title">Flashcard sets</div>

            <Button value='Add new flashcards' type='success' style={{ fontSize: "1.2rem" }} onClick={() => navigate("/flashcards/edit")} />

            <Table data={userFlashcards} columns={[
                { key: "title", header: "Title" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default FlashcardsList
