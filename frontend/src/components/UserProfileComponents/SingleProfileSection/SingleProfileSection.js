import React from 'react';
import styles from "../ProfileSection/ProfileSection.module.scss";

const SingleProfileSection = ({ profile }) => {
    return (
      <>
        <div className='mt-5'>
            <div className={styles.card}>
          <div className={styles.avatar}>
            <img className='img-fluid' src={profile.img} />
          </div>
          <div className={styles.title}>
            <h2>{profile.name}</h2>
          </div>
          <div className={styles.email}>
            <h6>{profile.email}</h6>
          </div>
          <div className={styles.description}>
            <p><span className={styles.other_info}>Designation:</span> {profile.designation}</p>
            <hr/>
            <p><span className={styles.other_info}>Address:</span> {profile.address}</p>
            <hr/>
            <p><span className={styles.other_info}>Session:</span> {profile.session}</p>
            <hr/>
            <p><span className={styles.other_info}>Varsity Id:</span> {profile.varsityId}</p>
            <hr/>
            <p><span className={styles.other_info}>Mobile Number:</span> {profile.mobileNumber}</p>
            <hr/>
          </div>
          <div className={styles.social}>
            <ul>
              <li>
                {profile.facebook && <a href={profile.facebook} target="_blank"><i className="fab fa-facebook"></i></a>}
              </li>
              <li>
                {profile.github && <a href={profile.github} target="_blank"><i className="fab fa-github"></i></a>}
              </li>
              <li>
                {profile.youtube && <a href={profile.youtube} target="_blank"><i className="fab fa-youtube"></i></a>}
              </li>
              <li>
                {profile.medium && <a href={profile.medium} target="_blank"><i className="fab fa-medium"></i></a>}
              </li>
              <li >
                {profile.linkedin && <a href={profile.linkedin} target="_blank"><i className="fab fa-linkedin"></i></a>}
              </li>
            </ul>
          </div>
        </div>
        </div>
        </>
    );
};

export default SingleProfileSection;