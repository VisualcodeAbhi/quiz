import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="container">
            <img src="/images/Logo1.png" alt="Telugu Bible Quiz Logo" className="logo" />
            <h1>Telugu<br />Bible Quiz</h1>
            <div className="btn-group">
                <button className="action-btn" onClick={() => navigate('/ot')}>
                    <span className="btn-main-text">పాత నిబంధన</span>
                    <span className="btn-sub-text">Old Testament</span>
                </button>
                <button className="action-btn" onClick={() => navigate('/nt')}>
                    <span className="btn-main-text">క్రొత్త నిబంధన</span>
                    <span className="btn-sub-text">New Testament</span>
                </button>
                <button className="action-btn" onClick={() => navigate('/statistics')}>
                    <span className="btn-main-text">గణాంకాలు</span>
                    <span className="btn-sub-text">Statistics</span>
                </button>
            </div>
        </div>
    );
};

export default Home;
