import React from 'react';
import blog from '../../../Assets/images/abouts/blog.jpg'
import career from '../../../Assets/images/abouts/career.jpg'
import research from '../../../Assets/images/abouts/research.jpg'
import workshop from '../../../Assets/images/abouts/workshop.jpg'
import SingleAbout from '../../HomeComponents/SingleAbout/SingleAbout'

const About = () => {

    const aboutElements = [
        {
            title: "Blog",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, beatae?",
            img: blog,
            redirect: "/blogs"
        },
        {
            title: "Research",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, beatae?",
            img: research,
            redirect: "/research"
        },
        {
            title: "Workshop",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, beatae?",
            img: workshop,
            redirect: "/workshop"
        }
    ]

    return (
        <section className="container mb-5">
            <h1 className="text-center m-5 colored-heading">Here, you will get ...</h1>
            <div className="row">
                {
                    aboutElements.map(aboutElement => <SingleAbout aboutElement={aboutElement} />)
                }
            </div>
        </section>
    );
};

export default About;