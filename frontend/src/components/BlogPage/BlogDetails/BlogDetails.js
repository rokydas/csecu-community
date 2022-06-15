import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {

    const { id } = useParams()
    const authToken = localStorage.getItem("auth-token");

    const [blog, setBlog] = useState({})

    useEffect(() => {
        fetch(`http://localhost:5000/blog/${id}`, {
            headers: {
                "auth-token": authToken,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setBlog(data.blog);
                } else {
                    alert(data.msg);
                }
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <div className='container mt-5'>
            <div className="d-flex justify-content-center mx-5">
                <img className='img-fluid' src={blog?.img} alt="" />
            </div>
            <br />
            <h1>{blog?.title}</h1>
            <p>{blog?.description}</p>
        </div>
    );
};

export default BlogDetails;