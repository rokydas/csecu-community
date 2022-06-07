import React, { useContext, useEffect } from 'react';
import Header from '../Header/Header';
import About from '../../HomeComponents/About/About'
import GatherKnowledge from '../GatherKnowledge/GatherKnowledge';
import HomeWorkshops from '../HomeWorkshops/HomeWorkshops';
import Footer from '../../CommonComponents/Footer/Footer';
import { AuthContext } from '../../../App';

const Home = () => {

    const authToken = localStorage.getItem('auth-token')
    const [loggedInUser, setLoggedInUser] = useContext(AuthContext)

    useEffect(() => {
        if (authToken != "") {
            fetch("http://localhost:5000/auth/me", {
                headers: {
                    'auth-token': authToken
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
        }
        else {
            setLoggedInUser({})
        }
    }, [])

    return (
        <div>
            <Header />
            <About />
            <GatherKnowledge />
            <HomeWorkshops />
            <Footer />
        </div>
    );
};

export default Home;