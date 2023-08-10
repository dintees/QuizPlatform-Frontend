import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'

function MySets() {

    const [userId, setUserId] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData("Set", true);
            console.log(data);


            if (data && data.status === 200) {
                setUserId(parseInt(data!.data.length));
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <div className='content-title'>My sets</div>

            My sets count: {userId}
        </>
    )
}

export default MySets
