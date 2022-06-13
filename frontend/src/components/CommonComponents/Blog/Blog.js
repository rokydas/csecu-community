import React from 'react';
import styles from './Blog.module.scss';

const Blog = ({ blog }) => {
    return (
        <div class="article col-md-4 col-sm-6 col-12 grid__post fadein inview">
            <div class={styles.blog_wrapper}>
                <div class={styles.blog_card}>
                    <div class={styles.card_img}>
                        <img src={blog.img} />

                    </div>
                    <h3 className="mt-3">{blog.title}</h3>
                    <div class={styles.card_details}>
                        <span>
                            <i class="fa fa-calendar"></i>{blog.date}
                        </span>
                        <span>
                            <i class="fa fa-heart"></i>102
                        </span>
                    </div>
                    <div class={styles.card_text}>
                        <p>
                            {blog.description.substring(0, 150)}
                        </p>
                    </div>
                    <div class={styles.read_more}>Read More</div>
                </div>
            </div>
        </div>
    );
};

export default Blog;