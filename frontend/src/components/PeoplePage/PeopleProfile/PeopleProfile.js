import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../App";
import ProfileBlogs from "../../../components/UserProfileComponents/ProfileBlogs/ProfileBlogs";
import ProfileResearch from "../../../components/UserProfileComponents/ProfileResearch/ProfileResearch";
import SingleProfileSection from "../../../components/UserProfileComponents/SingleProfileSection/SingleProfileSection";
import styles from "../../../components/UserProfileComponents/ProfileSection/ProfileSection.module.scss";
import PeopleBar from "../PeopleBar/PeopleBar";

const PeopleProfile = () => {
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
    fetch("https://csecu-community.herokuapp.com/research/showravdas11@gmail.com", {
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
      <SingleProfileSection people={true} />
    </div>
    <PeopleBar
      selectedOption={selectedOption} 
      setSelectedOption={setSelectedOption} 
    />

    { selectedOption == "blog" && <ProfileBlogs blogs={blogs} />}
    { selectedOption == "research" && <ProfileResearch researchs={researches} />}

    </>
  );
};

export default PeopleProfile;
