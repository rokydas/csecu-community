import { useEffect, useState } from "react";
import styles from '../UserProfileComponents/ProfileBlogs/ProfileBlogs.module.scss';
import Research from "./Research/Research";
const ResearchPage = () => {
    const authToken = localStorage.getItem("auth-token");
    // const [publishedResearches, setPublishedResearches] = useState([])
    // const [underReviewResearches, setUnderReviewResearches] = useState([])
    const [researches, setResearches] = useState([])

    useEffect(() => {
        fetch("https://csecu-community.herokuapp.com/research/all", {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.success) {
                    // const pResearch = data.researches.filter(r => r.status == "published")
                    // const rResearch = data.researches.filter(r => r.status == "under-review")
                    // setPublishedResearches(pResearch)
                    // setUnderReviewResearches(rResearch)
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
            {/* <h2 className="m-3 text-center">Published Researches</h2>
            {publishedResearches.map((research) => <Research research={research} underReview = {false} />)}
            <h2 className="m-3 text-center">Under Review Researches</h2>
            {underReviewResearches.map((research) => <Research research={research} underReview = {true} />)} */}

            {
                researches.map((research) => <Research research={research} underReview = {false} />)
            }
        </div>
      </div>
    );
};

export default ResearchPage;