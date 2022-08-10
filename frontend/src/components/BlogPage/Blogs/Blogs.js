import { useEffect, useState } from "react";
import Blog from "../../CommonComponents/Blog/Blog";

const Blogs = () => {
  const authToken = localStorage.getItem("auth-token");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blog/all", {
      headers: {
        'Authorization': `Bearer ${authToken}`,
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

  if (blogs.length == 0) {
    return (
      <div className='d-flex justify-content-center mt-5 pt-5'>
          <div className="spinner-border spinner-border-sm" role="status"></div>
      </div>
  )
  }

  return (
    <>
      <div className="container">
        <h1 className="my-2 text-center">Our Blogs</h1>
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
