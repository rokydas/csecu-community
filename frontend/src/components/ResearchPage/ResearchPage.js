import { useEffect, useState } from "react";
import styles from '../UserProfileComponents/ProfileBlogs/ProfileBlogs.module.scss';
import Research from "./Research/Research";
const ResearchPage = () => {
    const authToken = localStorage.getItem("auth-token");
    const [researches, setResearches] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/research/all", {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success) {
                  setResearches(data.researches)
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
          {researches.map((research) => <Research research={research} />)}
        </div>
      </div>
    );
};

export default ResearchPage;