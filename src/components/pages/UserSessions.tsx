import React, { useEffect, useState } from 'react'
import { getData } from '../../helpers/AxiosHelper';
import Table from '../common/UI/Table';
import { toast } from 'react-toastify';
import { IUserSessionDto } from '../../Types';
import TextField from '../controls/TextField';
import Loader from '../layout/Loader';
import { formatDate } from '../../utils/dateFormatter';

function UserSessions() {
    const [userSessions, setUserSessions] = useState<IUserSessionDto[]>([]);
    const [currentUserSession, setCurrentUserSession] = useState<IUserSessionDto[]>([]);
    const [queryUser, setQueryUser] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQueryUser(value)
        setCurrentUserSession(() => {
            return userSessions.filter(e => e.username.toLowerCase().includes(value.toLowerCase()))
        })
    }

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            const result = await getData(`user/getUserSessions/`, true);

            switch (result?.status) {
                case 200:
                    result.data.map((r: IUserSessionDto) => {
                        r.loggedInTime = formatDate(r.loggedInTime)
                        return r;
                    })
                    setUserSessions(result.data)
                    setCurrentUserSession(result.data)
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

        fetchData();
    }, [])

    return (
        <>
            <Loader loading={loading} />

            <div className="content-title">User sessions</div>

            <TextField value={queryUser} onChange={handleChangeUsername} placeholder='Username' style={{ width: "33%", marginBottom: "1rem" }} />

            <Table data={currentUserSession} columns={[
                { key: "username", header: "Username" },
                { key: "loggedInTime", header: "Login time" },
                { key: "ipAddress", header: "IP address" },
                { key: "browser", header: "Browser" },
            ]} rowsPerPage={15} />

        </>
    )
}

export default UserSessions
