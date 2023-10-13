import React, { useState } from 'react'

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
            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </>
    )
}

export default Table
