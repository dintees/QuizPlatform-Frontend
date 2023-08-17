import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'
import { UserSetDto } from '../../Types';
import Table from '../common/Table';

function MySets() {

    const [userId, setUserId] = useState<number>(0);
    const [userSet, setUserSet] = useState<UserSetDto[]>([]);

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

            My sets count: {userId}

            <Table data={userSet} columns={[{key: "id", header: "Id"}, { key: "title", header: "Title" }]} />

            {/* <table>
                <tr>
                    <th>Lp</th>
                    <th>Title</th>
                </tr>
                {userSet.map((i: UserSetDto, v: number) => {
                    return <tr key={i.id}>
                        <td>{v + 1}</td>
                        <td>{i.title}</td>
                    </tr>
                })}
            </table> */}
        </>
    )
}

export default MySets
