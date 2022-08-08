import React from "react";
import styles from "./Profilebar.module.scss";

const ProfileBar = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="container gap-4">
      <div className={styles.bar_bg}>
        <div className={styles.all_item}>
          <button
            onClick = { () => setSelectedOption("blog")}
            className={`mx-5 ${styles.profile_bar_btn} ${selectedOption == "blog" ? "border border-2" : ""}`}
          >
            Blog
          </button>
          <button
            onClick = { () => setSelectedOption("research")}
            className={`mx-5 ${styles.profile_bar_btn} profile_bar_btn ${selectedOption == "research" ? "border border-2" : ""}`}
          >
            Research
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileBar;
