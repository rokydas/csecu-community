import React, { useEffect, useState } from 'react';
import PeopleBar from '../PeopleBar/PeopleBar';
import Peoples from '../Peoples/Peoples';

const PeopleSection = () => {
    const [selectedOption, setSelectedOption] = useState("teacher")
    const [students, setStudents] = useState([])
    const [alumnus, setAlumnus] = useState([])
    const [teachers, setTeachers] = useState([])
    const authToken = localStorage.getItem('auth-token')

    useEffect(() => {
        fetch("https://csecu-community.herokuapp.com/auth/all", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const users = data.users
                    const newStudents = users.filter(user => user.userType == "Student")
                    setStudents(newStudents)
                    const newAlumnus = users.filter(user => user.userType == "Alumni")
                    setAlumnus(newAlumnus)
                    const newTeachers = users.filter(user => user.userType == "Teacher")
                    setTeachers(newTeachers)
                }
                else {
                    alert(data.msg)
                }
            })
            .catch(err => console.log(err))
    }, [])


    return (
        <>
            <PeopleBar
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
            />
            {selectedOption == "teacher" && <Peoples peoples={teachers} />}
            {selectedOption == "alumni" && <Peoples peoples={alumnus} />}
            {selectedOption == "student" && <Peoples peoples={students} />}
        </>
    );
};

export default PeopleSection;