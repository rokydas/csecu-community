import React, { useContext, useRef } from "react";
import AppSidebar from "../AppSidebar/AppSidebar";
import { Editor } from 'react-draft-wysiwyg';
import { useState } from "react";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import axios from "axios";
import { AuthContext } from "../../../App";
import MyModal from "../../CommonComponents/MyModal/MyModal";

const AddBlog = () => {

    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)
    const imgRef = useRef();
    const [open, setOpen] = useState(false)
    const [modalText, setModalText] = useState("")

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    const uploadImage = img => {
        if (img) {
            setIsUploading(true)
            setImg("")
            let imgData = new FormData()
            imgData.set('key', 'eb1530acc816b285faadaf680e0152b7')
            imgData.append('image', img)

            axios.post('https://api.imgbb.com/1/upload', imgData)
                .then(res => {
                    setImg(res.data.data.display_url);
                    setIsUploading(false)
                })
                .catch(error => console.log(error))
        }
    }

    const submitPost = () => {
        if (title == "" || img == "" || content == "") {
            alert("Please select all fields")
        }
        else {
            var date = new Date();
            const authToken = localStorage.getItem('auth-token')
            fetch("https://csecu-community.herokuapp.com/blog/add", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(
                    {
                        title,
                        img,
                        description: content,
                        authorId: loggedInUser._id,
                        authorName: loggedInUser.name,
                        date: date.toDateString()
                    })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setModalText("blog added successfully")
                        setOpen(true)
                        setTitle("")
                        setImg("")
                        imgRef.current.value = "";
                        setContent("")
                        setEditorState(EditorState.createEmpty())
                    } else {
                        alert(data.msg)
                    }

                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='container-fluid'>
            <MyModal open={open} setOpen={setOpen} title={modalText}/>
            <div className="row">
                <div className="col-md-2 border">
                    <AppSidebar />
                </div>
                <div className="col-md-10 border pb-4">
                    <div className="d-flex justify-content-center">
                        <div className="w-75">
                            <br />
                            <h3 className="text-center">Post a Blog</h3>
                            <h6 className='text-secondary mt-2'>Enter blog title</h6>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                value={title}
                                placeholder="Enter blog title"
                                className="form-control"
                            />

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
                                ref={imgRef}
                                accept="image/*"
                                disabled={img}
                                onChange={(e) => uploadImage(e.target.files[0])}
                            />

                            <img src={img && img} className="img-fluid w-25 mt-3 mb-1" />

                            <h6 className='text-secondary mt-3'>Enter blog body</h6>
                            <div className="border" style={{ minHeight: "300px" }}>
                                <Editor
                                    editorState={editorState}
                                    onEditorStateChange={onEditorStateChange}
                                    toolbar={{
                                        inline: { inDropdown: true },
                                        list: { inDropdown: true },
                                        textAlign: { inDropdown: true },
                                        link: { inDropdown: true },
                                        history: { inDropdown: true },
                                    }}
                                />
                            </div>
                            <br />
                            <button onClick={submitPost} className="custom-btn">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddBlog;
