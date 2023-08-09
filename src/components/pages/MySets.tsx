import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper'

function MySets() {

    const [userId, setUserId] = useState<number>(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getData("Set", true);

            setUserId(parseInt(data!.data));
        }

        fetchData();
    }, [])

    return (
        <>
            <div className='content-title'>My sets</div>

            {userId}
        </>
    )
}

export default MySets
