import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BlogDetails.module.scss'

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
            <h1 className={styles.blog_title}>{blog?.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: blog?.description }} />
        </div>
    );
};

export default BlogDetails;