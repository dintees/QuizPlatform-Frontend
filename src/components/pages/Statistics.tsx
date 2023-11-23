import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getData } from '../../helpers/AxiosHelper';
import { IUserStatisticsData, IUserStatisticsDto } from '../../Types';
import Table from '../common/UI/Table';
import { toast } from 'react-toastify';
import Loader from '../layout/Loader';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Statistics() {
    const [statistics, setStatistics] = useState<Map<string, IUserStatisticsDto>>(new Map<string, IUserStatisticsDto>());
    const [tabularStatistics, setTabularStatistics] = useState<IUserStatisticsData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const result = await getData("testSession/getStatisticsForUser", true);
            if (result?.status === 200) {
                let resultMap = new Map<string, IUserStatisticsDto>();
                let resultArray: IUserStatisticsData[] = [];
                Object.keys(result.data).forEach((key, index) => {
                    const val = result.data[key];
                    resultMap.set(key, val);
                    resultArray.push({
                        date: key,
                        average: val.average.toFixed(2) + '%',
                        numberOfSolvedTests: val.numberOfSolvedTests
                    })
                })
                setTabularStatistics(resultArray.reverse())
                setStatistics(resultMap)
            }
            else
                toast.error("Unexpected error")

            setLoading(false)
        }

        fetchData();
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            //   title: {
            //     display: true,
            //     text: 'Statistics per day',
            //   },
        },
    };

    const data1 = {
        labels: Array.from(statistics.keys()),
        datasets: [
            {
                label: "Average score",
                data: Array.from(statistics.values()).map(e => e.average),
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
        ]
    };

    const data2 = {
        labels: Array.from(statistics.keys()),
        datasets: [
            {
                label: "Number of solved tests",
                data: Array.from(statistics.values()).map(e => e.numberOfSolvedTests),
                fill: false,
                borderColor: "#742774"
            }
        ]
    };


    return (
        <>
            <Loader loading={loading} />
            <div className="content-title">Statistics</div>

            <Table data={tabularStatistics} rowsPerPage={15} columns={[
                { key: "date", header: "Date" },
                { key: "average", header: "Average score" },
                { key: "numberOfSolvedTests", header: "Number of solved test" },
            ]} />

            <div className='d-flex'>
                <div className="chart">
                    <Line options={options} data={data1} />
                </div>
                <div className="chart">
                    <Line options={options} data={data2} />
                </div>
            </div>
        </>
    )
}

export default Statistics
