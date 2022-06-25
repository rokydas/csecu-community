import React from 'react';
import styles from './PeopleBar.module.scss'

const PeopleBar = ( { selectedOption, setSelectedOption } ) => {
    return (
        <div className="container gap-4">
            <div className={styles.bar_bg}>
                <div className={styles.all_item}>
                    <button
                        onClick={() => setSelectedOption("teacher")}
                        className={`mx-5 ${styles.people_bar_btn} ${selectedOption == "teacher" ? "border border-2" : ""}`}
                    >
                        Teachers
                    </button>
                    <button
                        onClick={() => setSelectedOption("alumni")}
                        className={`mx-5 ${styles.people_bar_btn} ${selectedOption == "alumni" ? "border border-2" : ""}`}
                    >
                        Alumnus
                    </button>
                    <button
                        onClick={() => setSelectedOption("student")}
                        className={`mx-5 ${styles.people_bar_btn} ${selectedOption == "student" ? "border border-2" : ""}`}
                    >
                        Students
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PeopleBar;