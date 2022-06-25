import { EditorState, ContentState, convertToRaw } from 'draft-js';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import React, { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { AuthContext } from '../../../App';
import axios from 'axios';
import AppSidebar from '../AppSidebar/AppSidebar';
import { useNavigate, useParams } from 'react-router-dom';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';

const EditBlog = () => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [img, setImg] = useState('')
    const [oldImg, setOldImg] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)
    const imgRef = useRef()

    const [date, setDate] = useState("null")
    const navigate = useNavigate();

    const { id } = useParams()
    const authToken = localStorage.getItem("auth-token");

    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
        setContent(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    };

    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setTitle(data.blog.title)
                    setOldImg(data.blog.img)
                    setContent(data.blog.description)
                    setDate(data.blog.date)

                    const contentBlock = htmlToDraft(data.blog.description);
                    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                    const newEditorState = EditorState.createWithContent(contentState);

                    setEditorState(newEditorState);

                } else {
                    alert(data.msg);
                }
            })
            .catch((error) => console.log(error));
    }, []);

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
        if (title == "" || content == "") {
            alert("Please select all fields")
        }
        else {
            const authToken = localStorage.getItem('auth-token')
            fetch(`http://localhost:5000/blog/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(
                    {
                        title,
                        img: img ? img : oldImg,
                        description: content,
                        authorId: loggedInUser._id,
                        authorName: loggedInUser.name,
                        date
                    })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        alert("blog updated successfully")
                        navigate(-1)
                    } else {
                        alert(data.msg)
                    }
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2 border">
                    <AppSidebar />
                </div>
                <div className="col-md-10 border">
                    <div className="d-flex justify-content-center">
                        <div>
                            <br />

                            <h6 className='text-secondary mt-3'>Enter blog title</h6>
                            <input
                                onChange={(e) => setTitle(e.target.value)}
                                type="text"
                                value={title}
                                placeholder="Enter blog title"
                                className="form-control"
                            />

                            <br />

                            <img src={img ? img : oldImg} className="img-fluid w-25" />

                            <h6 className='text-secondary mt-3'>
                                Upload your new image <span className='text-danger'>*</span>
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
                            <button onClick={submitPost} className="custom-btn">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditBlog;