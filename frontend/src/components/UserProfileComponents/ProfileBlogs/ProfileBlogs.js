import React from "react";
import styles from './ProfileBlogs.module.scss';

const ProfileBlogs = ({ blogs }) => {
  return (
    <div className="container">
      <div className="row">
           {blogs.map((blog) => (
                       <div className="col-md-4">
                       <div className={styles.band}>
                         <div className={styles.card}>
                                 <img className={styles.thumb} src={blog.img} alt=""/>
                             <article>
                               <h5>{blog.title}</h5>
                               <p>
                                 {blog.description}{" "}
                               </p>
                               <span>Read more</span>
                             </article>
                         </div>
                       </div>
                     </div>
          ))}
      </div>
    </div>
  );
};

export default ProfileBlogs;
