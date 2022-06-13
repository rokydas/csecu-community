import { useEffect, useState } from "react";
import Profilebar from "../ProfileBar/Profilebar";
import ProfileBlogs from "../ProfileBlogs/ProfileBlogs";
import ProfileCareer from "../ProfileCareer/ProfileCareer";
import ProfileResearch from "../ProfileResearch/ProfileResearch";
import SingleProfileSection from "../SingleProfileSection/SingleProfileSection";
import styles from "./ProfileSection.module.scss";

const ProfileSection = () => {
  const authToken = localStorage.getItem("auth-token");
  const [profiles, setProfiles] = useState({});
  const [blogs, setBlogs] = useState([])
  const [careers, setCareers] = useState([])
  const [researchs, setResearchs] = useState([])

  const [selectedOption, setSelectedOption] = useState("blog")

  useEffect(() => {
    fetch("http://localhost:5000/blog/62962cb9e56d8a09587dc22a", {
        headers: {
            'auth-token': authToken
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
    fetch("http://localhost:5000/career/62962cb9e56d8a09587dc22a", {
        headers: {
            'auth-token': authToken
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
    fetch("http://localhost:5000/research/showravdas11@gmail.com", {
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

  useEffect(() => {
    fetch("http://localhost:5000/auth/me", {
      headers: {
        "auth-token": authToken,
      },
    })
      .then((res) => res.json())
      .then((data) => setProfiles(data))

      .catch((error) => console.log(error));
  }, []);
  return (
    <>
    <div className={styles.card_main}>
      <SingleProfileSection profile={profiles} />
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
