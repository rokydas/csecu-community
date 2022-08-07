import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from './AppSidebar.module.scss';

const AppSidebar = () => {

    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    return (
        <div className={styles.sidebar}>
            <br />
            <br />
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-blog"><h5>Post blog</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/my-blogs"><h5>My blogs</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-research"><h5>Post research paper</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/my-research"><h5>My research papers</h5></Link>

            {
                loggedInUser.isAdmin &&
                <>
                    <Link style={{ textDecoration: "none" }} to="/dashboard/all-blogs"><h5>All blogs</h5></Link>
                    <Link style={{ textDecoration: "none" }} to="/dashboard/all-research"><h5>All research papers</h5></Link>
                    <Link style={{ textDecoration: "none" }} to="/dashboard/arrange-workshop"><h5>Arrange workshop</h5></Link>
                    <Link style={{ textDecoration: "none" }} to="/dashboard/manage-workshop"><h5>Manage workshop</h5></Link>
                    <Link style={{ textDecoration: "none" }} to="/dashboard/make-admin"><h5>Make Admin</h5></Link>
                </>
            }
        </div>
    );
};

export default AppSidebar;