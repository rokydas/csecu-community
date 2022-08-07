import React, { useEffect, useState } from 'react';
import AppSidebar from '../AppSidebar/AppSidebar';
import { AiFillEdit, AiFillEye } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import { useContext } from 'react';

const MyBlogs = () => {

    const authToken = localStorage.getItem("auth-token");
    const [myBlogs, setMyBlogs] = useState([]);
    const [needUpdate, setNeedUpdate] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    useEffect(() => {
        fetch(`https://csecu-community.herokuapp.com/blog/blogByUser/${loggedInUser._id}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setMyBlogs(data.blogs);
                } else {
                    alert(data.msg);
                }
            })
            .catch((error) => console.log(error));
    }, [needUpdate]);

    // delete method 
    const handleDeleteBlog = id => {
        console.log(id);
        const url = `https://csecu-community.herokuapp.com/blog/delete/${id}`
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
                <div className="col-md-10 border" >
                    <div className="table-responsive" style={{ height: "80vh", margin: "0px 200px" }} >
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th scope="col">Serial</th>
                                    <th scope="col">Blog thumbnail</th>
                                    <th scope="col">Blog Name</th>
                                    <th scope="col">View</th>
                                    <th scope="col">Update</th>
                                    <th scope="col">Delete</th>
                                </tr>
                            </thead>
                            {myBlogs.map((blog, index) => (
                                <tbody>
                                    <tr>
                                        <td scope="row">{index + 1}</td>
                                        <td><img width="50px" src={blog.img} /></td>
                                        <td>{blog.title.substring(0, 100)}</td>
                                        <td><Link to={`/blog/${blog._id}`}><AiFillEye size={25} color="#000" /></Link></td>
                                        <td><Link to={`/dashboard/edit-blog/${blog._id}`}><AiFillEdit size={25} color="#000" /></Link></td>
                                        <td><MdDelete onClick={() => handleDeleteBlog(blog._id)} size={25} /></td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyBlogs;