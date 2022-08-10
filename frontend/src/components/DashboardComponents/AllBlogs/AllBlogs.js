import React, { useEffect, useState } from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';
import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import { useContext } from 'react';
import loader from '.../../../src/Assets/images/loader.gif'

const AllBlogs = () => {

    const authToken = localStorage.getItem("auth-token");
    const [allBlogs, setAllBlogs] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:5000/blog/all`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setAllBlogs(data.blogs.reverse());
                } else {
                    alert(data.msg);
                }
            })
            .catch((error) => console.log(error));
    }, [needUpdate]);

    // delete method 
    const handleDeleteBlog = id => {
        const url = `http://localhost:5000/blog/delete/${id}`
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    alert("Deleted successfully")
                    setNeedUpdate(!needUpdate)
                }
                else {
                    alert(data.msg)
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-2 border">
                    <AppSidebar />
                </div>
                <div className="col-md-10 border pb-4" >
                    <h3 className="text-center my-3">All Blogs</h3>
                    {
                        allBlogs.length == 0 ? (
                            <div className="d-flex justify-content-center mt-5 pt-5">
                                <img className='text-center' width="100px" src={loader} />
                            </div>
                        ) :
                            <div className="table-responsive" style={{ height: "80vh", margin: "0px 200px" }} >
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope="col">Serial</th>
                                            <th scope="col">Blog thumbnail</th>
                                            <th scope="col">Blog Name</th>
                                            <th scope="col">View</th>
                                            <th scope="col">Delete</th>
                                        </tr>
                                    </thead>
                                    {allBlogs.map((blog, index) => (
                                        <tbody>
                                            <tr>
                                                <td scope="row">{index + 1}</td>
                                                <td><img width="50px" src={blog.img} /></td>
                                                <td>{blog.title.substring(0, 100)}</td>
                                                <td><Link to={`/blog/${blog._id}`}><AiFillEye size={25} color="#000" /></Link></td>
                                                <td><MdDelete onClick={() => handleDeleteBlog(blog._id)} size={25} /></td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                    }

                </div>
            </div>
        </div>
    );
};

export default AllBlogs;