import React from 'react';
import './loader.css';

const Loader = () => {
    return (
        <div className="spinner-container">
            <div className="spinner-wrapper">
                <div className="spinner"></div>
                <img src="/images/Logo1.png" alt="Loading..." className="loader-logo" />
            </div>
        </div>
    );
};

export default Loader;
