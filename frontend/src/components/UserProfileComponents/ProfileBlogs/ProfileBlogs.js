import React from "react";
import Blog from "../../CommonComponents/Blog/Blog";
import styles from './ProfileBlogs.module.scss';

const ProfileBlogs = ({ blogs }) => {
  return (
    <div className="container">
      <div className="row">
        {blogs.map((blog) => (
          <Blog blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default ProfileBlogs;
