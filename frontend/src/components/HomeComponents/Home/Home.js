import React from 'react';
import Header from '../Header/Header';
import About from '../../HomeComponents/About/About'
import GatherKnowledge from '../GatherKnowledge/GatherKnowledge';
import HomeWorkshops from '../HomeWorkshops/HomeWorkshops';
import Footer from '../../CommonComponents/Footer/Footer';

const Home = () => {
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