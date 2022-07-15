import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';

const UpdateProfile = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    const authToken = localStorage.getItem("auth-token");

    const [img, setImg] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [isDisableButton, setIsDisableButton] = useState(false)
    const navigate = useNavigate()

    const onSubmit = data => {
        console.log(data)
        const profileInfo = { ...data, img: img ? img : loggedInUser.img }
        
        fetch(`http://localhost:5000/auth/update-profile/${loggedInUser._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(profileInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("Your profile is successfully updated")
                        navigate("/profile")
                        window.location.reload();
                    } else {
                        alert(data.msg)
                    }
                })
                .catch(err => console.log(err))

    }

    function uploadImage(img) {
        if (img) {
            errors.img = undefined
            setIsUploading(true)
            setImg("")
            setIsDisableButton(true)
            let imgData = new FormData()
            imgData.set('key', 'eb1530acc816b285faadaf680e0152b7')
            imgData.append('image', img)

            axios.post('https://api.imgbb.com/1/upload', imgData)
                .then(res => {
                    setImg(res.data.data.display_url);
                    setIsUploading(false)
                    setIsDisableButton(false)
                })
                .catch(error => console.log(error))
        }

    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className='col-md-6'>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <h6 className='text-secondary mt-3'>Your Name <span className='text-danger'>*</span></h6>
                            <input
                                type="text"
                                placeholder='Name'
                                defaultValue={loggedInUser.name}
                                className='form-control mt-3'
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-danger">"Name" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Academic ID <span className='text-danger'>*</span></h6>
                            <input
                                type="number"
                                placeholder='Academic ID'
                                defaultValue={loggedInUser.varsityId}
                                className='form-control'
                                {...register("varsityId", { required: true })}
                            />
                            {errors.id && <span className="text-danger">"Academic ID" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Session <span className='text-danger'>*</span></h6>
                            <input
                                type="text"
                                placeholder='Session'
                                defaultValue={loggedInUser.session}
                                className='form-control'
                                {...register("session", { required: true })}
                            />
                            {errors.session && <span className="text-danger">"Session" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Designation <span className='text-danger'>*</span></h6>
                            <input
                                type="text"
                                placeholder='Designation'
                                defaultValue={loggedInUser.designation}
                                className='form-control'
                                {...register("designation", { required: true })}
                            />
                            {errors.designation && <span className="text-danger">"Designation" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Address <span className='text-danger'>*</span></h6>
                            <input
                                type="text"
                                placeholder='Address'
                                defaultValue={loggedInUser.address}
                                className='form-control'
                                {...register("address", { required: true })}
                            />
                            {errors.address && <span className="text-danger">"Address" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>What type of user you are? <span className='text-danger'>*</span></h6>
                            <select {...register("userType", { required: true })} className="form-select mt-3" aria-label="Default select example">
                                <option selected value={loggedInUser.userType}>{loggedInUser.userType}</option>
                                <option value="Alumni">Alumni</option>
                                <option value="Teacher">Teacher</option>
                                <option value="Student">Student</option>
                            </select>
                            {errors.userType && <span className="text-danger">Please select your type</span>}

                            <h6 className='text-secondary mt-3'>Mobile Number</h6>
                            <input
                                type="number"
                                placeholder='Mobile Number'
                                defaultValue={loggedInUser.mobileNumber}
                                className='form-control'
                                {...register("mobileNumber", { required: false })}
                            />

                        </form>
                    </div>
                    <div className="col-md-6">

                        <div className="d-flex justify-content-center">
                            <img width="150px" src={img ? img : loggedInUser.img} />
                        </div>

                        <h6 className='text-secondary mt-3'>
                            Update your image <span className='text-danger'>*</span>
                            {img && <span className='text-success'>Uploaded</span>}
                            {isUploading &&
                                <div className="spinner-border spinner-border-sm" role="status"></div>
                            }
                        </h6>

                        <input
                            className='form-control mt-2'
                            type="file"
                            accept="image/*"
                            disabled={img}
                            {...register("img", { required: false })}
                            onChange={(e) => uploadImage(e.target.files[0])}
                        />

                        <h6 className='text-secondary mt-3'>Facebook profile link</h6>
                        <input
                            type="text"
                            placeholder='Facebook profile'
                            defaultValue={loggedInUser.facebook}
                            className='form-control'
                            {...register("facebook", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Youtube profile link</h6>
                        <input
                            type="text"
                            placeholder='Youtube profile'
                            defaultValue={loggedInUser.youtube}
                            className='form-control'
                            {...register("youtube", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Github profile link</h6>
                        <input
                            type="text"
                            placeholder='Github profile'
                            defaultValue={loggedInUser.github}
                            className='form-control'
                            {...register("github", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Medium profile link</h6>
                        <input
                            type="text"
                            placeholder='Medium profile'
                            defaultValue={loggedInUser.medium}
                            className='form-control'
                            {...register("medium", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Linkedin profile link</h6>
                        <input
                            type="text"
                            placeholder='Linkedin profile'
                            defaultValue={loggedInUser.linkedin}
                            className='form-control'
                            {...register("linkedin", { required: false })}
                        />


                    </div>
                    <button disabled={isDisableButton} className='custom-large-btn mt-3 mx-auto'>Update Profile</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfile;