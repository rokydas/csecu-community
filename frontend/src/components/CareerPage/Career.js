import { useEffect, useState } from "react";
import styles from '../UserProfileComponents/ProfileBlogs/ProfileBlogs.module.scss';
const Career = () => {
    const authToken = localStorage.getItem("auth-token");
    const [careers, setCareers] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/career/all", {
            headers: {
                'auth-token': authToken
            }
        })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                  setCareers(data.careers)
                }
                else {
                    alert(data.msg)
                }
            })
    
            .catch(error => console.log(error))
    }, []) 
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

export default Career;