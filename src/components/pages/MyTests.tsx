import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { UserSetDto } from '../../Types';
import Table from '../common/Table';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';
import { formatDate } from '../../utils/dateFormatter';

function MyTests() {

    const [userId, setUserId] = useState<number>(0);
    const [userSet, setUserSet] = useState<UserSetDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getData("Set", true);

            if (data && data.status === 200) {
                data.data.forEach((i: UserSetDto) => {
                    i.tsUpdate = formatDate(i.tsUpdate)
                    i.title = <Link className='a-link' to={`/test/edit/${i.id}`}>{i.title}</Link>
                })

                setUserSet(data.data);
                setUserId(parseInt(data!.data.length));
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
                { key: "author", header: "Author" }
            ]} />
        </>
    )
}

export default MyTests
