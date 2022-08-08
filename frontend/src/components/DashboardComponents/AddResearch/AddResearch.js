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

    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = data => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("publisherId", loggedInUser._id)
        formData.append("publisherName", loggedInUser.name)
        formData.append("date", new Date().toLocaleDateString())
        formData.append("file", pdf)

        fetch("https://csecu-community.herokuapp.com/research/add", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${authToken}`
            },
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                alert(data.msg)
                if (data.success) {
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
                    <div className="row d-flex justify-content-center pb-4">
                        <div className="w-75">
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

                                <h6 className='text-secondary mt-3'>Published Link</h6>
                                <input
                                    type="text"
                                    placeholder='Published Link'
                                    className='form-control'
                                    {...register("publishedLink", { required: true })}
                                />
                                {errors.description && <span className='text-danger'>Please add Published Link</span>}

                                <h6 className='text-secondary mt-3'>Research paper (PDF)</h6>
                                <input type="file" name="research" id="" className='form-control'
                                    accept="application/pdf"
                                    required onChange={getPdf} ref={pdfRef} />
                                {pdfError}

                                {/* <h6 className='text-secondary mt-3'>Title page no.</h6>
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        placeholder='Title start page'
                                        className='form-control'
                                        {...register("titleStartPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add title start page</span>}
                                    <span className='m-3'></span>
                                    <input
                                        type="number"
                                        placeholder='Title end page'
                                        className='form-control'
                                        {...register("titleEndPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add title end page</span>}
                                </div>

                                <h6 className='text-secondary mt-3'>Abstract page no.</h6>
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        placeholder='Abstract start page'
                                        className='form-control'
                                        {...register("abstractStartPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add Abstract start page</span>}
                                    <span className='m-3'></span>
                                    <input
                                        type="number"
                                        placeholder='Abstract end page'
                                        className='form-control'
                                        {...register("abstractEndPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add Abstract end page</span>}
                                </div>


                                <h6 className='text-secondary mt-3'>Introduction page no.</h6>
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        placeholder='Introduction start page'
                                        className='form-control'
                                        {...register("introductionStartPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add Introduction start page</span>}
                                    <span className='m-3'></span>
                                    <input
                                        type="number"
                                        placeholder='Introduction end page'
                                        className='form-control'
                                        {...register("introductionEndPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add Introduction end page</span>}
                                </div>

                                <h6 className='text-secondary mt-3'>Materials and Methods page no.</h6>
                                <div className="d-flex">
                                    <input
                                        type="number"
                                        placeholder='Materials and Methods start page'
                                        className='form-control'
                                        {...register("methodStartPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add Materials and Methods start page</span>}
                                    <span className='m-3'></span>
                                    <input
                                        type="number"
                                        placeholder='Materials and Methods end page'
                                        className='form-control'
                                        {...register("methodEndPage", { required: true })}
                                    />
                                    {errors.description && <span className='text-danger'>Please add Materials and Methods end page</span>}
                                </div> */}

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