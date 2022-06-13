import { useEffect, useState } from "react";
import styles from '../UserProfileComponents/ProfileBlogs/ProfileBlogs.module.scss';
const ResearchPage = () => {
    const authToken = localStorage.getItem("auth-token");
    const [researchs, setResearchs] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/research/all", {
            headers: {
                'auth-token': authToken
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success) {
                  setResearchs(data.researches)
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
          {researchs.map((research) => (
            <div className="col-md-4">
              <div className={styles.band}>
                <div className={styles.card}>
                  <img className={styles.thumb} src={research.img} alt="" />
                  <article>
                    <h6 className={styles.publisher_Name}>{research.publisherName} </h6>
                    <h6 className={styles.date}>{research.date}</h6>
                    <h5 className={styles.research_title}>{research.title}</h5>
                    <p className={styles.research_desc}>{research.description.substring(0, 100)} </p>
                  </article>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default ResearchPage;