import styles from '../ProfileBlogs/ProfileBlogs.module.scss';

const ProfileCareer = ({ careers }) => {
    return (
        <div className="container">
        <div className="row">
             {careers.map((career) => (
                         <div className="col-md-4">
                         <div className={styles.band}>
                           <div className={styles.card}>
                                   <img className={styles.thumb} src={career.img} alt=""/>
                               <article>
                                 {/* <h1>Created by You, July Edition</h1> */}
                                 <h5>{career.type}</h5>
                                 <p>
                                   {career.title}{" "}
                                 </p>
                                 <p>
                                   {career.description .substring(0, 100)}
                                 </p>
                                 <p>
                                   {career.link}{" "}
                                 </p>
                                 <p>
                                   {career.deadline}{" "}
                                 </p>
                                 <span>Read more</span>
                               </article>
                           </div>
                         </div>
                       </div>
            ))}
        </div>
      </div>
    );
};
export default ProfileCareer;