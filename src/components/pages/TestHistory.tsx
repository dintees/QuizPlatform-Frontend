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

            switch (result?.status) {
                case 200:
                    result.data.forEach((i: IUserTestSessionDto) => {
                        i.tsInsert = formatDate(i.tsInsert)
                        i.tsUpdate = formatDate(i.tsUpdate)
                        i.isCompleted = i.isCompleted ? "Completed" : "During solving"
                        i.testName = <Link className='a-link' to={`/solvetest/${i.id}`}>{i.testName}</Link>
                    })
                    setTestSessions(result.data);
                    break;
                default:
                    toast.error("Problem with server conenction.");
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

            <Table data={testSessions} rowsPerPage={15} columns={[
                { key: "testName", header: "Title" },
                { key: "tsInsert", header: "Start time" },
                { key: "tsUpdate", header: "Modification time" },
                { key: "isCompleted", header: "Status" },
            ]} />
        </>
    )
}

export default TestHistory
