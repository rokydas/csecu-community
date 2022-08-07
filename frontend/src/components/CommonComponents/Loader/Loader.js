import React from 'react';
import loader from '.../../../src/Assets/images/loader.gif'

const Loader = () => {

    return (
        <div className="loader-div">
            <img width="100px" src={loader} />
        </div>
    );
};

export default Loader;