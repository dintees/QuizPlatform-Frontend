import React, { useEffect, useState } from 'react'
import { getData } from '../../AxiosHelper';
import Table from '../common/Table';
import { toast } from 'react-toastify';
import { IUserSessionDto } from '../../Types';
import TextField from '../common/TextField';
import Loader from '../common/Loader';
import { formatDate } from '../../utils/dateFormatter';

function UserSessions() {
    const [userSessions, setUserSessions] = useState<IUserSessionDto[]>([]);
    const [queryUser, setQueryUser] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        setLoading(true);
        const result = await getData(`user/getUserSessions/${queryUser}`, true);

        switch (result?.status) {
            case 200:
                result.data.map((r: IUserSessionDto) => {
                    r.loggedInTime = formatDate(r.loggedInTime)
                    return r;
                })
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
        setLoading(false);
    }

    useEffect(() => setLoading(true), [])

    useEffect(() => {
        const timeout = setTimeout(fetchData, 1000);
        return () => clearTimeout(timeout);
    }, [queryUser])

    return (
        <>
            <Loader loading={loading} />

            <div className="content-title">User sessions</div>

            <TextField value={queryUser} setValue={setQueryUser} placeholder='Username' style={{ width: "33%", marginBottom: "1rem" }} />

            <Table data={userSessions} columns={[
                { key: "username", header: "Username" },
                { key: "loggedInTime", header: "Login time" },
                { key: "ipAddress", header: "IP address" },
                { key: "browser", header: "Browser" },
            ]} rowsPerPage={20} />

        </>
    )
}

export default UserSessions
