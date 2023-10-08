import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { IUserFlashcard } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { Link, useParams } from 'react-router-dom';
import Table from '../common/Table';
import Loader from '../common/Loader';

function MyFlashcards() {

    const [userFlashcards, setUserFlashcards] = useState<IUserFlashcard[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { mode, flashcardId } = useParams();

    useEffect(() => {
        let fetchData: () => void = () => { };

        if (!flashcardId) {
            fetchData = async () => {
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
                }
            }
        }
        else {
            fetchData = async () => {
                const result = await getData(`flashcard/get/${flashcardId}`, true)
                console.log(result);
            }
        }

        fetchData();
    }, [flashcardId])

    return (
        <>
            <Loader loading={loading} />
            {!flashcardId ?
                <>
                    <div className="content-title">Flashcard sets</div>

                    <Table data={userFlashcards} columns={[
                        { key: "title", header: "Title" },
                        { key: "tsUpdate", header: "Last modified" },
                        { key: "actions", header: "Actions" }
                    ]} />
                </>
                : <>
                    <div className="content-title">Flashcard title todo</div>

                    {flashcardId}
                </>}
        </>
    )
}

export default MyFlashcards
