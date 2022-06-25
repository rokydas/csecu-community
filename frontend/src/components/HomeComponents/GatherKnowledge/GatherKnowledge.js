import React from 'react';
import styles from './GatherKnowledge.module.scss';

const GatherKnowledge = () => {
    return (
        <section class={`${styles['show-off']} d-flex align-items-center`}>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h3>Gather as much <br /> knowledge as you can <br /> from here ...</h3>
                            <button className="custom-large-btn">Our Teachers &nbsp;&nbsp;<i className="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default GatherKnowledge;