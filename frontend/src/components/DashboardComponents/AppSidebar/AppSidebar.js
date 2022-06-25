import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AppSidebar.module.scss';

const AppSidebar = () => {
    return (
        <div className={styles.sidebar}>
            <br />
            <br />
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-blog"><h4>Post blog</h4></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/my-blogs"><h4>My blogs</h4></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/manage-blogs"><h4>Manage blogs</h4></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/arrange-workshop"><h4>Arrange workshop</h4></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/manage-workshop"><h4>Manage workshop</h4></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-career"><h4>Post career opportunity</h4></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-research"><h4>Post research paper</h4></Link>
        </div>
    );
};

export default AppSidebar;