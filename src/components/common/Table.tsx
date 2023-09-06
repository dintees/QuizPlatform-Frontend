import React from 'react'

type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
}

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}


function Table<T, K extends keyof T>({ data, columns }: TableProps<T, K>): JSX.Element {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {columns.map((i, v) => {
                        return <th key={`table-header-${v}`}>{i.header}</th>
                    })}
                </tr>
            </thead>

            <tbody>
                {data.map((row, v1) => {
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
    )
}

export default Table
