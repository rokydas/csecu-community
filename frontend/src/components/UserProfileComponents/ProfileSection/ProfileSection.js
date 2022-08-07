import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import Profilebar from "../ProfileBar/Profilebar";
import ProfileBlogs from "../ProfileBlogs/ProfileBlogs";
import ProfileCareer from "../ProfileCareer/ProfileCareer";
import ProfileResearch from "../ProfileResearch/ProfileResearch";
import SingleProfileSection from "../SingleProfileSection/SingleProfileSection";
import styles from "./ProfileSection.module.scss";

const ProfileSection = () => {
  const authToken = localStorage.getItem("auth-token");
  const [blogs, setBlogs] = useState([])
  const [careers, setCareers] = useState([])
  const [researchs, setResearchs] = useState([])

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


//career
  useEffect(() => {
    fetch("https://csecu-community.herokuapp.com/career/62962cb9e56d8a09587dc22a", {
        headers: {
            'Authorization': `Bearer ${authToken}`
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.success) {
              setCareers(data.careers)
            }
            else {
                alert(data.msg)
            }
        })

        .catch(error => console.log(error))
}, []) 

// ProfileResearch
  useEffect(() => {
    fetch("https://csecu-community.herokuapp.com/research/showravdas11@gmail.com", {
        headers: {
            'Authorization': `Bearer ${authToken}`
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
    <>
    <div className={styles.card_main}>
      <SingleProfileSection />
    </div>
    <Profilebar 
      selectedOption={selectedOption} 
      setSelectedOption={setSelectedOption} 
    />

    { selectedOption == "blog" && <ProfileBlogs blogs={blogs} />}
    { selectedOption == "career" && <ProfileCareer careers={careers} />}
    { selectedOption == "research" && <ProfileResearch researchs={researchs} />}

    </>
  );
};

export default ProfileSection;
