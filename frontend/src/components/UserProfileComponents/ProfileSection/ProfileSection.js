import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import ProfileBlogs from "../ProfileBlogs/ProfileBlogs";
import ProfileBar from '../ProfileBar/ProfileBar'
import ProfileResearch from "../ProfileResearch/ProfileResearch";
import SingleProfileSection from "../SingleProfileSection/SingleProfileSection";
import styles from "./ProfileSection.module.scss";

const ProfileSection = () => {
  const authToken = localStorage.getItem("auth-token");
  const [blogs, setBlogs] = useState([])
  const [researches, setResearches] = useState([])
  const [selectedOption, setSelectedOption] = useState("blog")
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

  useEffect(() => {
    fetch(`https://csecu-community.herokuapp.com/blog/blogByUser/${loggedInUser._id}`, {
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
    fetch(`https://csecu-community.herokuapp.com/research/researchByUser/${loggedInUser._id}`, {
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
