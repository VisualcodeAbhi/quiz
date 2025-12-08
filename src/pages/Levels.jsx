import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookNameMap } from '../bookNames';
import Loader from '../components/Loader';

const Levels = () => {
    const { book: bookFile } = useParams();
    const navigate = useNavigate();
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookName, setBookName] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                // Dynamic import of JSON data
                const module = await import(`../assets/data/${bookFile}.json`);
                const data = module.default || module;
                setBookData(data);
                // We added bookName to the data in our conversion script
                setBookName(data.bookName);
            } catch (error) {
                console.error("Failed to load book data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [bookFile]);

    if (loading) return <Loader />;
    if (!bookData) return <div className="error-text">Book data not found.</div>;

    // Persistance Logic
    const userProgress = JSON.parse(localStorage.getItem('bibleQuizProgress')) || {};
    const bookProgress = userProgress[bookName] || {};

    const levels = [];
    const totalChapters = bookData.chapters;

    for (let i = 1; i <= totalChapters; i++) {
        const isCompleted = bookProgress[i] && bookProgress[i].completed;
        const isUnlocked = i === 1 || (bookProgress[i - 1] && bookProgress[i - 1].completed);

        levels.push({
            level: i,
            completed: isCompleted,
            unlocked: isUnlocked
        });
    }

    return (
        <div className="container" style={{ justifyContent: 'flex-start', paddingTop: '20px' }}>
            <header>
                <div className="menu-icon" onClick={() => navigate(-1)}>&#8592;</div>
                <h1 id="book-title">{bookNameMap[bookName] || bookName} Levels</h1>
            </header>

            <div className="grid-container" id="levels-grid">
                {levels.map((lvl) => (
                    <button
                        key={lvl.level}
                        className="level-btn"
                        style={{
                            opacity: lvl.unlocked ? 1 : 0.5,
                            cursor: lvl.unlocked ? 'pointer' : 'not-allowed',
                            background: lvl.completed ? "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)" : undefined,
                            color: lvl.completed ? 'white' : 'black'
                        }}
                        onClick={() => {
                            if (lvl.unlocked) {
                                navigate(`/quiz/${bookFile}/${lvl.level}`);
                            }
                        }}
                    >
                        {lvl.level} {lvl.completed && "✓"}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Levels;
