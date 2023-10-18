import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { IUserSetDto } from '../../Types';
import Table from '../common/Table';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import Modal from '../common/Modal';
import { formatDate } from '../../utils/dateFormatter';
import { FaClone } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { duplicateTest, deleteTest } from '../../utils/testUtils';

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getData("test", true);

            if (data && data.status === 200) {
                data.data.forEach((i: IUserSetDto) => {
                    i.tsUpdate = formatDate(i.tsUpdate)
                    i.title = <Link className='a-link' to={`/test/edit/${i.id}`}>{i.title}</Link>
                    i.actions = <div className='d-flex flex-start'>
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
