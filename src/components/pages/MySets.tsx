import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { UserSetDto } from '../../Types';
import Table from '../common/Table';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

function MySets() {

    const [userId, setUserId] = useState<number>(0);
    const [userSet, setUserSet] = useState<UserSetDto[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData("Set", true);
            console.log(data);


            if (data && data.status === 200) {
                setUserSet(data.data);
                setUserId(parseInt(data!.data.length));
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <div className='content-title'>My sets</div>

            <Button value='Add new set' type='success' style={{ fontSize: "1.2rem" }} onClick={() => navigate("/newSet")} />

            <div className="mt-1">My sets count: {userId}</div>

            <Table data={userSet} columns={[{ key: "id", header: "Id" }, { key: "title", header: "Title" }]} />
        </>
    )
}

export default MySets
