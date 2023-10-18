import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../../AxiosHelper';
import { IUserDto } from '../../Types';
import { toast } from 'react-toastify';
import Table from '../common/Table';
import Modal from '../common/Modal';
import Button from '../common/Button';
import Loader from '../common/Loader';
import { BsFillTrashFill } from 'react-icons/bs';

function Admin() {
    const [users, setUsers] = useState<IUserDto[]>([]);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<number>(0);

    const handleDeleteUser = async () => {
        if (!!userToDelete) {
            const result = await deleteData(`user/delete/${userToDelete}`, true)
            if (result?.status === 200) {
                setUsers((prev: IUserDto[]) => {
                    return prev.filter((e: IUserDto) => e.id !== userToDelete)
                })
                toast.success("Successfully removed user")
            }
            setOpenModal(false);
        }
    }

    const handleOpenModal = (id: number) => {
        setOpenModal(true);
        setUserToDelete(id);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData("user/getAllUsers", true)
            switch (result?.status) {
                case 200:
                    result.data.map((r: IUserDto) => {
                        r.actions = <div className='d-flex flex-start'>
                            <div className='color-danger c-pointer' onClick={() => handleOpenModal(r.id)}><BsFillTrashFill /></div>
                        </div>
                        return r;
                    })
                    setUsers(result.data)
                    break;
                case 401:
                case 403:
                    toast.error("You do not have enough permiossions")
                    break;
                default:
                    toast.error("Problem with server connection")
                    break;
            }
        }

        fetchData();
    }, [])
    return (
        <>
            <Modal open={openModal} title="Remove user" onClose={() => setOpenModal(false)} buttons={
                <>
                    <Button type="danger" value="Delete" onClick={handleDeleteUser} />
                    <Button value="Close" onClick={() => setOpenModal(false)} />
                </>
            }>Are you sure you want to pernamently delete the user?</Modal>

            <Loader loading={false} />

            <div className="content-title">Admin panel</div>

            <h3>User list</h3>

            <Table data={users} columns={[
                { key: "id", header: "Id" },
                { key: "role", header: "Role" },
                { key: "firstname", header: "Firstname" },
                { key: "lastname", header: "Lastname" },
                { key: "username", header: "Username" },
                { key: "email", header: "Email" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default Admin
