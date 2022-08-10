import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import ProfileBlogs from "../ProfileBlogs/ProfileBlogs";
import ProfileBar from '../ProfileBar/Profilebar'
import ProfileResearch from "../ProfileResearch/ProfileResearch";
import SingleProfileSection from "../SingleProfileSection/SingleProfileSection";
import styles from "./ProfileSection.module.scss";
import { useParams } from "react-router-dom";

const ProfileSection = () => {
  const authToken = localStorage.getItem("auth-token");
  const [blogs, setBlogs] = useState([])
  const [researches, setResearches] = useState([])
  const [selectedOption, setSelectedOption] = useState("blog")
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

  useEffect(() => {
    fetch(`http://localhost:5000/blog/blogByUser/${loggedInUser._id}`, {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success) {
                setBlogs(data.blogs)
            }
            else {
                alert(data.msg)
            }
        })

        .catch(error => console.log(error))
}, []) 

  // ProfileResearch
  useEffect(() => {
    fetch(`http://localhost:5000/research/researchByUser/${loggedInUser._id}`, {
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
    <>
    <div className={styles.card_main}>
      <SingleProfileSection />
    </div>
    <ProfileBar
      selectedOption={selectedOption} 
      setSelectedOption={setSelectedOption} 
    />

    { selectedOption == "blog" && <ProfileBlogs blogs={blogs} />}
    { selectedOption == "research" && <ProfileResearch researchs={researches} />}

    </>
  );
};

export default ProfileSection;
