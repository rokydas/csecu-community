import React, { useRef, useState } from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import { useForm } from 'react-hook-form'
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import TextField from '@mui/material/TextField';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import MyModal from '../../CommonComponents/MyModal/MyModal';

const ArrangeWorkshop = () => {

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm()
    const [date, setDate] = useState(new Date());
    const imgRef = useRef();
    const [thumbnail, setThumbnail] = useState('')
    const [modalText, setModalText] = useState('')
    const [open, setOpen] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const onSubmit = data => {
        const formattedTime = date.toLocaleTimeString()
        const formattedDate = date.toLocaleDateString()
        const authToken = localStorage.getItem('auth-token')

        if(thumbnail != "") {
            fetch("https://csecu-community.herokuapp.com/workshop/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(
                    {
                        title: data.title,
                        description: data.description,
                        instructorName: data.instructorName,
                        topic: data.topic,
                        date: formattedDate,
                        time: formattedTime,
                        thumbnail: thumbnail,
                        status: "Pending"
                    })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setModalText("workshop added successfully")
                        setOpen(true)
                        imgRef.current.value = "";
                        setThumbnail("")
                        reset()
                    } else {
                        alert(data.msg)
                    }
    
                })
                .catch(err => console.log(err))
        }
        else {
            alert("Please upload thumbnail")
        }
    }

    const uploadThumbnail = thumbnail => {
        if (thumbnail) {
            setIsUploading(true)
            setThumbnail("")
            let thumbnailData = new FormData()
            thumbnailData.set('key', 'eb1530acc816b285faadaf680e0152b7')
            thumbnailData.append('image', thumbnail)

            axios.post('https://api.imgbb.com/1/upload', thumbnailData)
                .then(res => {
                    setThumbnail(res.data.data.display_url);
                    setIsUploading(false)
                })
                .catch(error => console.log(error))
        }
    }

    return (
        <div className="container-fluid">
            <MyModal open={open} setOpen={setOpen} title={modalText} />
            <div className="row">
                <div className="col-md-2">
                    <AppSidebar />
                </div>
                <div className="col-md-10">
                    <div className="row d-flex justify-content-center pb-4">
                        <div className="w-75">
                            <h3 className="text-center my-3">Arrange a workshop</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h6 className='text-secondary mt-3'>Title <span className='text-danger'>*</span></h6>
                                <input
                                    type="text"
                                    placeholder='Title'
                                    className='form-control mt-3'
                                    {...register("title", { required: true })}
                                />
                                {errors.title && <span className="text-danger">"Title" is not allowed to be empty</span>}

                                <h6 className='text-secondary mt-3'>Description <span className='text-danger'>*</span></h6>
                                <textarea
                                    rows={5}
                                    type="text"
                                    placeholder='Description'
                                    className='form-control mt-3'
                                    {...register("description", { required: true })}
                                />
                                {errors.description && <span className="text-danger">"Description" is not allowed to be empty</span>}

                                <h6 className='text-secondary mt-3'>Instructor name<span className='text-danger'>*</span></h6>
                                <input
                                    type="text"
                                    placeholder='Instructor name'
                                    className='form-control mt-3'
                                    {...register("instructorName", { required: true })}
                                />
                                {errors.instructorName && <span className="text-danger">"Instructor name" is not allowed to be empty</span>}

                                <h6 className='text-secondary mt-3'>Topic<span className='text-danger'>*</span></h6>
                                <input
                                    type="text"
                                    placeholder='Topic'
                                    className='form-control mt-3'
                                    {...register("topic", { required: true })}
                                />
                                {errors.topic && <span className="text-danger">"Topic" is not allowed to be empty</span>}

                                <img src={thumbnail && thumbnail} className="img-fluid w-25 my-4" />

                                <h6 className='text-secondary'>
                                    Upload workshop thumbnail <span className='text-danger'>*</span>
                                    {thumbnail && <span className='text-success'>Uploaded</span>}
                                    {isUploading &&
                                        <div className="spinner-border spinner-border-sm" role="status"></div>
                                    }
                                </h6>
                                <input
                                    className='form-control mt-2'
                                    type="file"
                                    ref={imgRef}
                                    accept="image/*"
                                    disabled={thumbnail}
                                    onChange={(e) => uploadThumbnail(e.target.files[0])}
                                />

                                <h6 className='text-secondary mt-3'>Workshop date<span className='text-danger'>*</span></h6>
                                <br />

                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <MobileDateTimePicker
                                        label="Date"
                                        inputFormat="MM/dd/yyyy   hh:mm a"
                                        value={date}
                                        onChange={date => setDate(date)}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </MuiPickersUtilsProvider>

                                <br />
                                <br />

                                <button className='custom-btn'>Submit</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArrangeWorkshop;