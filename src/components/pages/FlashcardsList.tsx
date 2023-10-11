import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { IUserFlashcard } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { Link, useNavigate } from 'react-router-dom';
import Table from '../common/Table';
import Loader from '../common/Loader';
import { toast } from 'react-toastify';

function FlashcardsList() {

    const [userFlashcards, setUserFlashcards] = useState<IUserFlashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getData("flashcard/getlist", true)
            console.log(result);
            switch (result?.status) {
                case 200:
                    result.data.forEach((i: IUserFlashcard) => {
                        i.tsUpdate = formatDate(i.tsUpdate)
                        i.title = <Link className='a-link' to={`/flashcards/view/${i.id}`}>{i.title}</Link>
                        // i.actions = <div className='d-flex flex-start'>
                        //     <div className='c-pointer' style={{ marginRight: ".5rem" }} onClick={() => handleDuplicateTest(i.id)}><FaClone /></div>
                        //     <div className='color-danger c-pointer' onClick={() => handleOpenModal(i.id)}><BsFillTrashFill /></div>
                        // </div>
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
    }, [])

    return (
        <>
            <Loader loading={loading} />
            <div className="content-title">Flashcard sets</div>

            <Table data={userFlashcards} columns={[
                { key: "title", header: "Title" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default FlashcardsList
