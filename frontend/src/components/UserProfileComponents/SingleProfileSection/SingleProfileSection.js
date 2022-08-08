import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../../App';
import styles from "../ProfileSection/ProfileSection.module.scss";

const SingleProfileSection = ({ people = false }) => {

  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const { id } = useParams()
  const authToken = localStorage.getItem('auth-token')

  useEffect(() => {
    fetch(`https://csecu-community.herokuapp.com/auth/user/${id}`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser(data.user)
        }
        else {
          alert(data.msg)
        }
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [])

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center mt-5 pt-5'>
        <div className="spinner-border spinner-border-sm" role="status"></div>
      </div>
    )
  }

  return (
    <>
      <div className='mt-5'>
        <div className={styles.card}>
          <div className={styles.avatar}>
            <img className='image-cropper' src={user.img} />
          </div>
          <div className={styles.title}>
            <h2>{user.name}</h2>
          </div>
          <div className={styles.email}>
            <h6>{user.email}</h6>
          </div>
          <div className={styles.description}>
            <p><span className={styles.other_info}>Designation:</span> {user.designation}</p>
            <p><span className={styles.other_info}>Address:</span> {user.address}</p>
            <p><span className={styles.other_info}>Session:</span> {user.session}</p>
            <p><span className={styles.other_info}>Varsity Id:</span> {user.varsityId}</p>
            <p><span className={styles.other_info}>Mobile Number:</span> {user.mobileNumber}</p>
          </div>
          <div className={styles.social}>
            <ul>
              {user.facebook && <li><a href={user.facebook} target="_blank"><i className="fab fa-facebook"></i></a></li>}
              {user.github && <li><a href={user.github} target="_blank"><i className="fab fa-github"></i></a></li>}
              {user.youtube && <li><a href={user.youtube} target="_blank"><i className="fab fa-youtube"></i></a></li>}
              {user.medium && <li><a href={user.medium} target="_blank"><i className="fab fa-medium"></i></a></li>}
              {user.linkedin && <li ><a href={user.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a></li>}
            </ul>
          </div>
          {
            !people && <Link to="/update-profile"><button className='custom-btn'>Update Profile</button></Link>
          }
        </div>
      </div>
    </>
  );
};

export default SingleProfileSection;