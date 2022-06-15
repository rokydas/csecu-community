import { useEffect, useState } from "react";
import Blog from "../../CommonComponents/Blog/Blog";
import styles from "./Blogs.module.scss";

const Blogs = () => {
  const authToken = localStorage.getItem("auth-token");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blog/all", {
      headers: {
        "auth-token": authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBlogs(data.blogs);
        } else {
          alert(data.msg);
        }
      })

      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="m-5 text-center">Our Blogs</h1>
        <div className="row">
          {blogs.map((blog) => (
            <Blog blog={blog} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
