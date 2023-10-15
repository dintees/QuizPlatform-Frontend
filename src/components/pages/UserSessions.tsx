import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper';
import Table from '../common/Table';
import { toast } from 'react-toastify';
import { IUserSessionDto } from '../../Types';

function UserSessions() {
    const [userSessions, setUserSessions] = useState<IUserSessionDto[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getData("user/getUserSessions", true);

            switch (result?.status) {
                case 200:
                    setUserSessions(result.data)
                    break;
                case 400:
                    toast.error("Bad request")
                    break;
                case 401:
                    toast.error("Unauthorized")
                    break;
                default:
                    toast.error("Problem with server connection")
                    break;
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <div className="content-title">User sessions</div>

            <Table data={userSessions} columns={[
                { key: "loggedInTime", header: "Login time" },
                { key: "ipAddress", header: "IP address" },
                { key: "browser", header: "Browser" },
            ]} />

        </>
    )
}

export default UserSessions
