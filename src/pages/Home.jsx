import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [showSplash, setShowSplash] = React.useState(true);
    const [fading, setFading] = React.useState(false);

    React.useEffect(() => {
        // Wait 2s then start fade out
        const timer1 = setTimeout(() => {
            setFading(true);
        }, 2000);

        // Wait another 1s for fade to finish, then remove splash
        const timer2 = setTimeout(() => {
            setShowSplash(false);
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);

    if (showSplash) {
        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: 'rgb(0, 39, 75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: fading ? 0 : 1,
                transition: 'opacity 1s ease-out',
                zIndex: 9999
            }}>
                <img src="/images/Logo.png" alt="Quiz Splash Logo" style={{ maxWidth: '80%', height: 'auto' }} />
            </div>
        );
    }

    return (
        <div className="container" style={{ animation: 'fadeIn 1s ease-in' }}>
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
