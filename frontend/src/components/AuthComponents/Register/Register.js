import axios from 'axios';
import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../App';

const Register = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    const [img, setImg] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [isDisableButton, setIsDisableButton] = useState(false)
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data)
        const profileInfo = { ...data, img, isAdmin: false, isVerified: false }
        console.log(profileInfo)
        if (data.password == data.confirmPassword) {
            delete profileInfo.confirmPassword

            fetch("https://csecu-community.herokuapp.com/auth/register", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profileInfo)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        const { email, name } = data.user
                        const newLoggedInInfo = { email, name }
                        setLoggedInUser(newLoggedInInfo)
                        localStorage.setItem('auth-token', data.token)
                        navigate("/")
                    } else {
                        alert(data.msg)
                    }

                })
                .catch(err => console.log(err))
        } else {
            alert("Password and confirm password don't match.")
        }

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
                                className='form-control mt-3'
                                {...register("name", { required: true })}
                            />
                            {errors.name && <span className="text-danger">"Name" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Your Email <span className='text-danger'>*</span></h6>
                            <input
                                type="email"
                                placeholder='Email'
                                className='form-control'
                                {...register("email", { required: true })}
                            />
                            {errors.email && <span className="text-danger">"Email" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Password <span className='text-danger'>*</span></h6>
                            <input
                                type="password"
                                placeholder='Password'
                                className='form-control'
                                {...register("password", { required: true })}
                            />
                            {errors.password && <span className="text-danger">"Password" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Confirm Password <span className='text-danger'>*</span></h6>
                            <input
                                type="password"
                                placeholder='Confirm Password'
                                className='form-control'
                                {...register("confirmPassword", { required: true })}
                            />
                            {errors.confirmPassword && <span className="text-danger">"Confirm Password" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Academic ID <span className='text-danger'>*</span></h6>
                            <input
                                type="number"
                                placeholder='Academic ID'
                                className='form-control'
                                {...register("varsityId", { required: true })}
                            />
                            {errors.id && <span className="text-danger">"Academic ID" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Session <span className='text-danger'>*</span></h6>
                            <input
                                type="text"
                                placeholder='Session'
                                className='form-control'
                                {...register("session", { required: true })}
                            />
                            {errors.session && <span className="text-danger">"Session" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Designation <span className='text-danger'>*</span></h6>
                            <input
                                type="text"
                                placeholder='Designation'
                                className='form-control'
                                {...register("designation", { required: true })}
                            />
                            {errors.designation && <span className="text-danger">"Designation" is not allowed to be empty</span>}

                            <h6 className='text-secondary mt-3'>Address <span className='text-danger'>*</span></h6>
                            <input
                                type="text"
                                placeholder='Address'
                                className='form-control'
                                {...register("address", { required: true })}
                            />
                            {errors.address && <span className="text-danger">"Address" is not allowed to be empty</span>}

                        </form>
                    </div>
                    <div className="col-md-6">
                        <h6 className='text-secondary mt-3'>What type of user you are? <span className='text-danger'>*</span></h6>
                        <select {...register("userType", { required: true })} className="form-select mt-3" aria-label="Default select example">
                            <option selected value="">Choose one</option>
                            <option value="Alumni">Alumni</option>
                            <option value="Teacher">Teacher</option>
                            <option value="Student">Student</option>
                        </select>
                        {errors.userType && <span className="text-danger">Please select your type</span>}

                        <h6 className='text-secondary mt-3'>
                            Upload your image <span className='text-danger'>*</span>
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
                            {...register("img", { required: true })}
                            onChange={(e) => uploadImage(e.target.files[0])}
                        />
                        {errors.img && <span className='text-danger'>Please upload your image</span>}

                        <h6 className='text-secondary mt-3'>Facebook profile link</h6>
                        <input
                            type="text"
                            placeholder='Facebook profile'
                            className='form-control'
                            {...register("facebook", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Youtube profile link</h6>
                        <input
                            type="text"
                            placeholder='Youtube profile'
                            className='form-control'
                            {...register("youtube", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Github profile link</h6>
                        <input
                            type="text"
                            placeholder='Github profile'
                            className='form-control'
                            {...register("github", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Medium profile link</h6>
                        <input
                            type="text"
                            placeholder='Medium profile'
                            className='form-control'
                            {...register("medium", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Linkedin profile link</h6>
                        <input
                            type="text"
                            placeholder='Linkedin profile'
                            className='form-control'
                            {...register("linkedin", { required: false })}
                        />

                        <h6 className='text-secondary mt-3'>Mobile Number</h6>
                        <input
                            type="number"
                            placeholder='Mobile Number'
                            className='form-control'
                            {...register("mobileNumber", { required: false })}
                        />
                    </div>
                    <button disabled={isDisableButton} className='custom-large-btn mt-3 mx-auto'>Register</button>
                </div>
            </form>
            <p>Already have an account? Please <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>login</Link></p>
        </div>
    );
};

export default Register;

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}