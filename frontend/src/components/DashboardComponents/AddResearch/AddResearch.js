import React, { useContext, useState } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../../App';
import AppSidebar from '../AppSidebar/AppSidebar';

const AddResearch = () => {

    const [pdf, setPdf] = useState(null)
    const [pdfError, setPdfError] = useState("")
    const pdfRef = useRef()
    const authToken = localStorage.getItem('auth-token')
    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm()
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    const onSubmit = data => {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("publisherId", loggedInUser._id)
        formData.append("publisherName", loggedInUser.name)
        formData.append("date", new Date().toLocaleDateString())
        formData.append("file", pdf)

        fetch("http://localhost:5000/research/add", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                alert(data.msg)
                if(data.success) {
                    pdfRef.current.value = ""
                    reset()
                }
            })
            .catch(err => console.log(err))
    }

    const getPdf = (e) => {
        let selectedFile = e.target.files[0]
        setPdf(selectedFile)
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AppSidebar />
                </div>
                <div className="col-md-10">
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-6">
                            <form onSubmit={handleSubmit(onSubmit)}
                                enctype="multipart/form-data">

                                <h6 className='text-secondary mt-3'>Research title</h6>
                                <input
                                    type="text"
                                    placeholder='Research title'
                                    className='form-control'
                                    {...register("title", { required: true })}
                                />
                                {errors.title && <span className='text-danger'>Please add Research title</span>}

                                <h6 className='text-secondary mt-3'>Research description</h6>
                                <input
                                    type="text"
                                    placeholder='Research description'
                                    className='form-control'
                                    {...register("description", { required: true })}
                                />
                                {errors.description && <span className='text-danger'>Please add Research description</span>}

                                <h6 className='text-secondary mt-3'>Research paper (PDF)</h6>
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
        </div>
    );
};

export default AddResearch;