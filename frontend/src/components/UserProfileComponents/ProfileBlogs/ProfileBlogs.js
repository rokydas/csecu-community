import React from "react";
import Blog from "../../CommonComponents/Blog/Blog";
import styles from './ProfileBlogs.module.scss';

const ProfileBlogs = ({ blogs }) => {

  if(blogs.length == 0) {
    return <h4 className="text-center my-3">There is no blog</h4>
  }

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
