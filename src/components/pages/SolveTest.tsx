import React from 'react'
import { useParams } from 'react-router-dom'

function SolveTest() {

    const { testId } = useParams();

    return (
        <>
            <div className='content-title'>Solving test</div>

            <h3>TestId: {testId}</h3>
        </>
    )
}

export default SolveTest
