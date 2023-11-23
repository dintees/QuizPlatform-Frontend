import React, { useEffect, useState } from 'react'
import { getData, postData } from '../../helpers/AxiosHelper'
import { IUserSetDto } from '../../Types';
import Table from '../common/UI/Table';
import Button from '../controls/Button';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader';
import Modal from '../common/UI/Modal';
import { formatDate } from '../../utils/dateFormatter';
import { FaClone } from 'react-icons/fa';
import { BsFillLockFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { duplicateTest, deleteTest } from '../../utils/testUtils';
import { AiFillPlayCircle } from 'react-icons/ai';

function MyTests() {

    const [userId, setUserId] = useState<number>(0);
    const [userTest, setUserTest] = useState<IUserSetDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [testIdToDelete, setTestIdToDelete] = useState<number>();
    const navigate = useNavigate();

    const handleDuplicateTest = async (testId: number) => {
        const result = await duplicateTest(testId)
        if (result !== -1)
            navigate(`/test/edit/${result}`)
    }

    const handleOpenModal = (testId: number) => {
        setOpenModal(true);
        setTestIdToDelete(testId)
    }

    const handleDeleteTest = async () => {
        if (!!testIdToDelete) {
            const isDeleted = await deleteTest(testIdToDelete);
            if (isDeleted)
                setUserTest((prev: IUserSetDto[]) => {
                    return prev.filter((e: IUserSetDto) => e.id !== testIdToDelete)
                })
        }
        setOpenModal(false);
    }

    const handleCreateNewSession = async (testId: number) => {
        const result = await postData(`testSession/create`, { testId, useDefaultTestOptions: true }, true);
        if (result?.status === 200)
            navigate(`/solvetest/${result.data}`)
        else
            toast.error("Error occured")
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getData("test", true);

            if (data && data.status === 200) {

                data.data.forEach((i: IUserSetDto) => {
                    i.tsUpdate = formatDate(i.tsUpdate)
                    i.title = <div className='a-link' onClick={() => handleCreateNewSession(i.id)}>{i.title} {!i.isPublic && <span className='color-secondary tooltip' data-tooltip='Private test' style={{ marginLeft: ".5rem" }}><BsFillLockFill /></span>}</div>
                    i.actions = <div className='d-flex flex-start actions-container'>
                        <div className='color-success c-pointer tooltip' data-tooltip='Start!' style={{ marginRight: ".5rem" }} onClick={() => handleCreateNewSession(i.id)}><AiFillPlayCircle /></div>
                        <div className='c-pointer tooltip' data-tooltip='Edit' style={{ marginRight: ".5rem" }} onClick={() => navigate(`/test/edit/${i.id}`)}><BsPencilSquare /></div>
                        <div className='c-pointer tooltip' data-tooltip='Duplicate' style={{ marginRight: ".5rem" }} onClick={() => handleDuplicateTest(i.id)}><FaClone /></div>
                        <div className='color-danger c-pointer tooltip' data-tooltip='Delete' onClick={() => handleOpenModal(i.id)}><BsFillTrashFill /></div>
                    </div>
                })

                setUserTest(data.data);
                setUserId(parseInt(data!.data.length));
            } else {
                toast.error("Unable to connect to the server.")
            }
            setLoading(false)
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Modal open={openModal} title="Remove test" onClose={() => setOpenModal(false)} buttons={
                <>
                    <Button type="danger" value="Delete" onClick={handleDeleteTest} />
                    <Button value="Close" onClick={() => setOpenModal(false)} />
                </>
            }>Are you sure you want to pernamently delete the test?</Modal>

            <Loader loading={loading} />
            <div className='content-title'>My Tests</div>

            <Button value='Add new test' type='success' style={{ fontSize: "1.2rem" }} onClick={() => navigate("/test/edit")} />

            <div className="mt-1 mb-1">All tests: <b>{userId}</b></div>

            <Table data={userTest} columns={[
                { key: "title", header: "Title" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "author", header: "Author" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default MyTests
