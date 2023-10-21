import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import { getData } from '../../AxiosHelper';
import { IUserSetDto } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { useNavigate } from 'react-router-dom';
import Table from '../common/Table';
import { Role } from '../../Enums';
import Modal from '../common/Modal';
import Button from '../common/Button';
import { deleteTest } from '../../utils/testUtils';
import { BsFillTrashFill } from 'react-icons/bs';

function UserTests() {
    const { auth } = useContext(AuthContext);
    const [userTest, setUserTest] = useState<IUserSetDto[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [testIdToDelete, setTestIdToDelete] = useState<number>();
    const navigate = useNavigate();

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
        if (auth.isAuthenticated && auth.role === Role.Admin) {
            const fetchData = async () => {
                const result = await getData("test/getAllUserTests", true);

                if (result?.status === 200) {
                    result.data.forEach((i: IUserSetDto) => {
                        i.tsUpdate = formatDate(i.tsUpdate)
                        i.title = <span onClick={() => navigate(`/test/edit/${i.id}`)} className='a-link'>{i.title}</span>
                        i.actions = <div className='d-flex flex-start actions-container'>
                            <div className='color-danger c-pointer tooltip' data-tooltip='Delete' onClick={() => handleOpenModal(i.id)}><BsFillTrashFill /></div>
                        </div>
                    })
                    setUserTest(result.data)
                }
            }
            fetchData();
        }
        // eslint-disable-next-line
    }, [auth])

    return (
        <>
            <Modal open={openModal} title="Remove test" onClose={() => setOpenModal(false)} buttons={
                <>
                    <Button type="danger" value="Delete" onClick={handleDeleteTest} />
                    <Button value="Close" onClick={() => setOpenModal(false)} />
                </>
            }>Are you sure you want to pernamently delete the test?</Modal>

            <div className='content-title'>All user tests</div>
            <Table data={userTest} columns={[
                { key: "title", header: "Title" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "author", header: "Author" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default UserTests