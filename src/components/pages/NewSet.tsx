import React, { useState } from 'react'
import Button from '../common/Button'
import { postData } from '../../AxiosHelper'
import TextField from '../common/TextField'
import Form from '../common/Form'
import { IFormField } from '../../Types'

function NewSet() {

    const [title, setTitle] = useState<string>("New set");
    const [description, setDescription] = useState<string>("");
    const [formFields, setFormFields] = useState<IFormField[]>([]);


    const handleAddSet = () => {

        console.log("Adding set...");
        console.log("Title: " + title);
        console.log("Description: " + description);
        console.log("Content");
        console.log(formFields);


        const fetchData = async () => {
            // const result = await postData("Set/create", { title: "First set AUTO", description: "This is description" }, true);
            // console.log(result);

        }

        fetchData();
    }

    const handleAddNewQuestion = () => {
        setFormFields((prev: IFormField[]) => [...prev, { name: `aa-${prev.length}}`, type: "text", value: "New question" }])
    }


    return (
        <>
            <div className="content-title">New set</div>

            <TextField placeholder='Title' value={title} setValue={setTitle} />
            <TextField placeholder='Description' value={description} setValue={setDescription} style={{ marginTop: "1rem", marginBottom: "1rem" }} />

            <Form formFields={formFields} setFormFields={setFormFields} />

            <Button value="Add new question" type='primary' onClick={handleAddNewQuestion} />

            <Button value='Add' type='success' onClick={handleAddSet} />
        </>
    )
}

export default NewSet
