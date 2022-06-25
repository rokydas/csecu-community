import React from 'react';
import styles from './Blog.module.scss';
import authorIcon from '../../../Assets/images/author-icon.jpg'
import { useNavigate } from 'react-router-dom';

const Blog = ({ blog }) => {

    const navigate = useNavigate();

    return (
        <div className={`col-md-4 col-sm-6 col-12`}>
            <div className={`${styles.blog}`}>
                <img className={`${styles.blog_image} img-fluid`} src={blog.img} alt="" />
                <div className={`${styles['blog-text']}`}>
                    <div className='d-flex justify-content-between'>
                        <p><img width="30px" src={authorIcon} /> {blog.authorName}</p>
                        <p><i className="fa fa-calendar" aria-hidden="true"></i> {blog.date}</p>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>
                        {blog.description.substring(0, 100)}
                    </p>
                    <button onClick={() => navigate(`/blog/${blog._id}`)} className='custom-btn'>Read more</button>
                </div>
            </div>
        </div>
    );
};

export default Blog;