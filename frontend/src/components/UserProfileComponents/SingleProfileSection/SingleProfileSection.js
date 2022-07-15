import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from "../ProfileSection/ProfileSection.module.scss";

const SingleProfileSection = () => {

  const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

  return (
    <>
      <div className='mt-5'>
        <div className={styles.card}>
          <div className={styles.avatar}>
            <img className='img-fluid' src={loggedInUser.img} />
          </div>
          <div className={styles.title}>
            <h2>{loggedInUser.name}</h2>
          </div>
          <div className={styles.email}>
            <h6>{loggedInUser.email}</h6>
          </div>
          <div className={styles.description}>
            <p><span className={styles.other_info}>Designation:</span> {loggedInUser.designation}</p>
            <hr />
            <p><span className={styles.other_info}>Address:</span> {loggedInUser.address}</p>
            <hr />
            <p><span className={styles.other_info}>Session:</span> {loggedInUser.session}</p>
            <hr />
            <p><span className={styles.other_info}>Varsity Id:</span> {loggedInUser.varsityId}</p>
            <hr />
            <p><span className={styles.other_info}>Mobile Number:</span> {loggedInUser.mobileNumber}</p>
            <hr />
          </div>
          <div className={styles.social}>
            <ul>
              {loggedInUser.facebook &&<li><a href={loggedInUser.facebook} target="_blank"><i className="fab fa-facebook"></i></a></li>}
              {loggedInUser.github && <li><a href={loggedInUser.github} target="_blank"><i className="fab fa-github"></i></a></li>}
              {loggedInUser.youtube && <li><a href={loggedInUser.youtube} target="_blank"><i className="fab fa-youtube"></i></a></li>}
              {loggedInUser.medium && <li><a href={loggedInUser.medium} target="_blank"><i className="fab fa-medium"></i></a></li>}
              {loggedInUser.linkedin && <li ><a href={loggedInUser.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a></li>}
            </ul>
          </div>
          <Link to="/update-profile"><button className='custom-btn'>Update Profile</button></Link>
        </div>
      </div>
    </>
  );
};

export default SingleProfileSection;