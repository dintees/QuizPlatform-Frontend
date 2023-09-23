import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { IUserSetDto } from '../../Types';
import Table from '../common/Table';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { formatDate } from '../../utils/dateFormatter';
import { FaClone } from 'react-icons/fa';
import { BsFillTrashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { duplicateTest, deleteTest } from '../../utils/testUtils';

function MyTests() {

    const [userId, setUserId] = useState<number>(0);
    const [userSet, setUserSet] = useState<IUserSetDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    const handleDuplicateTest = async (testId: number) => {
        const result = await duplicateTest(testId)
        if (result !== -1)
            navigate(`/test/edit/${result}`)
    }

    const handleDeleteSet = async (testId: number) => {
        const isDeleted = await deleteTest(testId);
        if (isDeleted)
            setUserSet((prev: IUserSetDto[]) => {
                return prev.filter((e: IUserSetDto) => e.id !== testId)
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getData("test", true);

            if (data && data.status === 200) {
                data.data.forEach((i: IUserSetDto) => {
                    i.tsUpdate = formatDate(i.tsUpdate)
                    i.title = <Link className='a-link' to={`/test/edit/${i.id}`}>{i.title}</Link>
                    // TODO refactor div = 100% width
                    i.actions = <div className='d-flex flex-start'>
                        <div className='c-pointer' style={{marginRight: ".5rem"}} onClick={() => handleDuplicateTest(i.id)}><FaClone /></div>
                        <div className='color-danger c-pointer' onClick={() => handleDeleteSet(i.id)}><BsFillTrashFill /></div>
                    </div>
                })

                setUserSet(data.data);
                setUserId(parseInt(data!.data.length));
            } else {
                toast.error("Unable to connect to the server.")
            }
            setLoading(false)
        }
        fetchData();
    }, [])

    return (
        <>
            <Loader loading={loading} />
            <div className='content-title'>My Tests</div>

            <Button value='Add new test' type='success' style={{ fontSize: "1.2rem" }} onClick={() => navigate("/test/edit")} />

            <div className="mt-1 mb-1">All tests: <b>{userId}</b></div>

            <Table data={userSet} columns={[
                { key: "title", header: "Title" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "author", header: "Author" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default MyTests
