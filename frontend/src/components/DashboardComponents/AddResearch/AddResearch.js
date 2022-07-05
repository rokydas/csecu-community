import React, { useState } from 'react';
import { useRef } from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';

const AddResearch = () => {

    const [pdf, setPdf] = useState(null)
    const [pdfError, setPdfError] = useState("")
    const pdfRef = useRef()
    const authToken = localStorage.getItem('auth-token')

    const handleSubmitResearch = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("title", "new title")
        formData.append("description", "new description")
        formData.append("publisherId", "new publisherId")
        formData.append("publisherName", "new publisherName")
        formData.append("date", "new date")
        formData.append("file", pdf)
        formData.append("img", "new img")

        fetch("http://localhost:5000/research/add", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
    }

    const getPdf = (e) => {
        let selectedFile = e.target.files[0]
        setPdf(selectedFile)
    }

    return (
        <div className="row">
            <div className="col-md-2">
                <AppSidebar />
            </div>
            <div className="col-md-10">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-10">
                        <form onSubmit={handleSubmitResearch}
                            enctype="multipart/form-data">
                            <input type="file" name="research" id="" className='form-control'
                                required onChange={getPdf} ref={pdfRef} />
                            {pdfError}
                            <br />
                            <button className='btn custom-btn'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddResearch;