import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../App'
import { getData, postData } from '../../AxiosHelper';
import { IUserSetDto } from '../../Types';
import { formatDate } from '../../utils/dateFormatter';
import { useNavigate } from 'react-router-dom';
import Table from '../common/Table';
import { toast } from 'react-toastify';
import Loader from '../common/Loader';
import TextField from '../common/TextField';

function Tests() {
    const { auth } = useContext(AuthContext);
    const [userTest, setUserTest] = useState<IUserSetDto[]>([]);
    const [currentUserTest, setCurrentUserTest] = useState<IUserSetDto[]>([]);
    const [testFilter, setTestFilter] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleCreateNewSession = async (testId: number) => {
        const result = await postData("testSession/create", { testId, useDefaultTestOptions: true }, true);
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

    const handleChangeTestFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filter = e.target.value;
        const filteredTests = userTest.filter((test: IUserSetDto) => {
            const title = (test.title as JSX.Element).props.children;
            return title.toLowerCase().includes(filter.toLowerCase()) || test.author?.toLowerCase().includes(filter.toLowerCase());
        });
        setCurrentUserTest(filteredTests);
        setTestFilter(filter)
    }

    useEffect(() => {
        if (auth.isAuthenticated) {
            const fetchData = async () => {
                setLoading(true);
                const result = await getData("test/getAllPublic", true);
                if (result?.status === 200) {
                    result.data.forEach((i: IUserSetDto) => {
                        i.tsUpdate = formatDate(i.tsUpdate)
                        i.title = <span onClick={() => handleCreateNewSession(i.id)} className='a-link'>{i.title}</span>
                    })
                    setUserTest(result.data)
                    setCurrentUserTest(result.data)
                }
                setLoading(false);
            }
            fetchData();
        }
        // eslint-disable-next-line
    }, [auth])

    return (
        <>
            <Loader loading={loading} />

            <div className='content-title'>Shared tests</div>

            <TextField style={{ marginBottom: "1rem", width: "33%" }} value={testFilter} onChange={handleChangeTestFilter} placeholder='Search' />

            <Table data={currentUserTest} columns={[
                { key: "title", header: "Title" },
                { key: "tsUpdate", header: "Last modified" },
                { key: "author", header: "Author" },
            ]} />
        </>
    )
}

export default Tests