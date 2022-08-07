import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AppSidebar.module.scss';

const AppSidebar = () => {
    return (
        <div className={styles.sidebar}>
            <br />
            <br />
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-blog"><h5>Post blog</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/my-blogs"><h5>My blogs</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/all-blogs"><h5>All blogs</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/arrange-workshop"><h5>Arrange workshop</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/manage-workshop"><h5>Manage workshop</h5></Link>
            <Link style={{ textDecoration: "none" }} to="/dashboard/add-research"><h5>Post research paper</h5></Link>
        </div>
    );
};

export default AppSidebar;