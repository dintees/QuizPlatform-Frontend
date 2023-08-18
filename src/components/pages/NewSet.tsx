import React from 'react'
import Button from '../common/Button'
import { postData } from '../../AxiosHelper'
import TextField from '../common/TextField'

function NewSet() {

    const handleAddSet = () => {
        const fetchData = async () => {
            const result = await postData("Set/create", { title: "First set AUTO", description: "This is description" }, true);
            console.log(result);

        }

        fetchData();

    }

    return (
        <>
            <div className="content-title">New set</div>
            <div>Many of inputs with title, questions etc...</div>

            <TextField placeholder='Type sth...' />

            <Button value='Add' type='success' onClick={handleAddSet} />
        </>
    )
}

export default NewSet
