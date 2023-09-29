import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper';
import { toast } from 'react-toastify';
import Table from '../common/Table';
import { IUserTestSessionDto } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { Link } from 'react-router-dom';

function ActiveTestSessions() {
    const [testSessions, setTestSessions] = useState<IUserTestSessionDto[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await getData("testSession", true)
            console.log(result);

            switch (result?.status) {
                case 200:
                    result.data.forEach((i: IUserTestSessionDto) => {
                        i.tsInsert = formatDate(i.tsInsert)
                        i.tsUpdate = formatDate(i.tsUpdate)
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
        }

        fetchData();
    }, [])

    return (
        <>
            <div className="content-title">Active test sessions</div>

            cdn...
            <Table data={testSessions} columns={[
                { key: "testName", header: "Test" },
                { key: "tsInsert", header: "Created" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "actions", header: "Actions" }
            ]} />
        </>
    )
}

export default ActiveTestSessions
