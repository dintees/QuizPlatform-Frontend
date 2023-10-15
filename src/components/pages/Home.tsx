import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import { getData, postData } from '../../AxiosHelper';
import { IUserSetDto } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { useNavigate } from 'react-router-dom';
import Table from '../common/Table';
import { toast } from 'react-toastify';

function Home() {
    const { auth } = useContext(AuthContext);
    const [userTest, setUserTest] = useState<IUserSetDto[]>([]);
    const navigate = useNavigate();

    const handleCreateNewSession = async (testId: number) => {
        const result = await postData("testSession/create", { testId }, true);
        switch (result?.status) {
            case 200:
                navigate(`/solveTest/${result.data}`)
                break;
            case 400:
                toast.error(result.data ?? "Unexpected error")
                break;
            case 403:
                toast.error("Unauthorized")
                break;
            default:
                toast.error("Problem with server connection")
                break;
        }
    }

    useEffect(() => {
        if (auth.isAuthenticated) {
            const fetchData = async () => {
                const result = await getData("test/getAllPublic", true);
                if (result?.status === 200) {
                    result.data.forEach((i: IUserSetDto) => {
                        i.tsUpdate = formatDate(i.tsUpdate)
                        i.title = <span onClick={() => handleCreateNewSession(i.id)} className='a-link'>{i.title}</span>
                    })
                    setUserTest(result.data)
                }
            }
            fetchData();
        }
        // eslint-disable-next-line
    }, [auth])

    return (
        <>
            <div className='content-title'>Home</div>
            {auth.isAuthenticated ?
                <>
                    <h4>Logged as: {auth.firstname} {auth.lastname} [{auth.username}] ({auth.email})</h4>
                    <h3>Shared tests</h3>

                    <Table data={userTest} columns={[
                        { key: "title", header: "Title" },
                        { key: "tsUpdate", header: "Last modified" },
                        { key: "author", header: "Author" },
                    ]} />


                </>
                : <h4>Not authenticated</h4>}
        </>
    )
}

export default Home