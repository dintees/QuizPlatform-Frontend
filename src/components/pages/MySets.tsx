import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { UserSetTable } from '../../Types';
import Table from '../common/Table';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../common/Loader';

function MySets() {

    const [userId, setUserId] = useState<number>(0);
    const [userSet, setUserSet] = useState<UserSetTable[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const data = await getData("Set", true);
            console.log(data);


            if (data && data.status === 200) {
                // TODO refactor
                data.data.forEach((i: UserSetTable) => {
                    i.href = <Link className='a-link' to={`/set/edit/${i.id}`} >Edit</Link>
                });
                console.log(data.data);

                setUserSet(data.data);
                setUserId(parseInt(data!.data.length));
            }
            setLoading(false)
        }

        fetchData();
    }, [])

    return (
        <>
            {loading ? <Loader loading={loading} /> : <>
                <div className='content-title'>My sets</div>

                <Button value='Add new set' type='success' style={{ fontSize: "1.2rem" }} onClick={() => navigate("/set/edit")} />

                <div className="mt-1">My sets count: {userId}</div>

                <Table data={userSet} columns={[{ key: "id", header: "Id" }, { key: "title", header: "Title" }, { key: "href", header: "Actions" }]} />
            </>}

        </>
    )
}

export default MySets
