import React from "react";
import styles from "./Profilebar.module.scss";

const Profilebar = ({ selectedOption, setSelectedOption }) => {
  return (
    <div className="container gap-4">
      <div className={styles.bar_bg}>
        <div className={styles.all_item}>
          <button
            onClick = { () => setSelectedOption("blog")}
            className={`mx-5 ${selectedOption == "blog" ? "border border-2" : ""}`}
          >
            Blog
          </button>
          <button
            onClick = { () => setSelectedOption("career")}
            className={`mx-5 ${selectedOption == "career" ? "border border-2" : ""}`}
          >
            Career
          </button>
          <button
            onClick = { () => setSelectedOption("research")}
            className={`mx-5 ${selectedOption == "research" ? "border border-2" : ""}`}
          >
            Research
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profilebar;