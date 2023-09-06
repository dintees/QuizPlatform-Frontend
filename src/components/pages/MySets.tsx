import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { UserSetDto, UserSetTable } from '../../Types';
import Table from '../common/Table';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';

function MySets() {

    const [userId, setUserId] = useState<number>(0);
    const [userSet, setUserSet] = useState<UserSetTable[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData("Set", true);
            console.log(data);


            if (data && data.status === 200) {
                data.data.forEach((i: UserSetTable) => {
                    i.href = <Link className='a-link' to={`/set/${i.id}`} >View</Link>
                });
                console.log(data.data);
                
                setUserSet(data.data);
                setUserId(parseInt(data!.data.length));
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <div className='content-title'>My sets</div>

            <Button value='Add new set' type='success' style={{ fontSize: "1.2rem" }} onClick={() => navigate("/set")} />

            <div className="mt-1">My sets count: {userId}</div>

            <Table data={userSet} columns={[{ key: "id", header: "Id" }, { key: "title", header: "Title" }, { key: "href", header: "Actions" }  ]} />
            
        </>
    )
}

export default MySets
