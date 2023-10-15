import React, { useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
}

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}


function Table<T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element {
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const totalPages = Math.ceil(data.length / rowsPerPage);

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    const handleNextPage = () => {
        if (currentPage < totalPages)
            setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1)
            setCurrentPage(currentPage - 1);
    };

    return (
        <>
            {currentData.length === 0 ?
                <table className='table'>
                    <thead>
                        <tr><th>No data</th></tr>
                    </thead>
                </table>
                :
                <>
                    <table className='table'>
                        <thead>
                            <tr>
                                {columns.map((i, v) => {
                                    return <th key={`table-header-${v}`}>{i.header}</th>
                                })}
                            </tr>
                        </thead>

                        <tbody>
                            {currentData.map((row, v1) => {
                                return (
                                    <tr key={`table-row-${v1}`}>
                                        {columns.map((column, v2) => {
                                            return (
                                                <td key={`table-cell-${v2}`}>
                                                    <>{row[column.key]}</>
                                                </td>
                                            )
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    <div style={{ textAlign: "right" }}>
                        <button className='btn' onClick={handlePrevPage} disabled={currentPage === 1}><BsArrowLeftCircleFill /></button>
                        <button className='btn' onClick={handleNextPage} disabled={currentPage === totalPages}><BsArrowRightCircleFill /></button>
                    </div>
                </>
            }
        </>
    )
}

export default Table
