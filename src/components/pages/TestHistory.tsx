import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper';
import { toast } from 'react-toastify';
import Table from '../common/Table';
import { IUserTestSessionDto } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';
import Loader from '../common/Loader';

function TestHistory() {
    const [testSessions, setTestSessions] = useState<IUserTestSessionDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const result = await getData("testSession", true)
            console.log(result?.data);

            switch (result?.status) {
                case 200:
                    result.data.forEach((i: IUserTestSessionDto) => {
                        i.tsInsert = formatDate(i.tsInsert)
                        i.tsUpdate = formatDate(i.tsUpdate)
                        i.isFinished = i.isFinished ? "YES" : "NO"
                        i.testName = <Link className='a-link' to={`/solvetest/${i.id}`}>{i.testName}</Link>
                        i.actions = <div className='d-flex flex-start'>/todo
                            {/* <div className='c-pointer' style={{marginRight: ".5rem"}} onClick={() => handleDuplicateTest(i.id)}><FaClone /></div>
                            <div className='color-danger c-pointer' onClick={() => handleDeleteSet(i.id)}><BsFillTrashFill /></div> */}
                        </div>
                    })
                    setTestSessions(result.data);
                    break;
                default:
                    toast.error("Something went wrong.");
                    break;
            }
            setLoading(false);
        }

        fetchData();
    }, [])

    return (
        <>
            <Loader loading={loading} />

            <div className="content-title">History</div>

            <Table data={testSessions} columns={[
                { key: "testName", header: "Test" },
                { key: "tsInsert", header: "Created" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "isFinished", header: "Is completed" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default TestHistory
