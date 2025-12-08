import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { bookNameMap } from '../bookNames';

const Quiz = () => {
    const { book: bookFile, level } = useParams();
    const navigate = useNavigate();

    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(30); // 30s timer like legacy
    const [quizFinished, setQuizFinished] = useState(false);

    // Feedback State
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackType, setFeedbackType] = useState(null); // 'correct' or 'wrong'
    const [showConfetti, setShowConfetti] = useState(false);

    const timerRef = useRef(null);

    // Load Data
    useEffect(() => {
        const loadData = async () => {
            // Reset state when level changes
            setQuizFinished(false);
            setCurrentQuestionIndex(0);
            setScore(0);
            setTimer(30);
            setShowConfetti(false);

            try {
                const module = await import(`../assets/data/${bookFile}.json`);
                const data = module.default || module;
                setBookData(data);

                const levelQuestions = data.levels[level];
                if (levelQuestions) {
                    setQuestions(levelQuestions);
                } else {
                    console.error("Level not found");
                }
            } catch (error) {
                console.error("Failed to load book data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [bookFile, level]);

    // Timer Logic
    useEffect(() => {
        if (loading || quizFinished || selectedOption !== null) return;

        if (timer > 0) {
            timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
        } else {
            handleOptionClick(-1);
        }
        return () => clearTimeout(timerRef.current);
    }, [timer, loading, quizFinished, selectedOption]);

    const handleOptionClick = (index) => {
        if (selectedOption !== null) return;

        setSelectedOption(index);
        const currentQuestion = questions[currentQuestionIndex];
        const correct = index === currentQuestion.correct;

        setIsCorrect(correct);
        setFeedbackType(correct ? 'correct' : 'wrong');
        setShowFeedback(true);

        if (correct) {
            setScore(s => s + 1);
            setShowConfetti(true);
        }

        // Wait 2.5s then move to next (matching legacy 2500ms)
        setTimeout(() => {
            setShowFeedback(false);
            setShowConfetti(false);

            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsCorrect(null);
                setTimer(30);
            } else {
                finishQuiz(correct ? score + 1 : score);
            }
        }, 2500);
    };

    const finishQuiz = (finalScore) => {
        setQuizFinished(true);
        saveProgress(finalScore);
    };

    const saveProgress = (finalScore) => {
        const bookName = bookData.bookName;
        const userProgress = JSON.parse(localStorage.getItem('bibleQuizProgress')) || {};
        if (!userProgress[bookName]) userProgress[bookName] = {};

        // Always save attempt like legacy
        userProgress[bookName][level] = {
            completed: true,
            score: finalScore
        };

        localStorage.setItem('bibleQuizProgress', JSON.stringify(userProgress));
    };

    if (loading) return <div>Loading...</div>;
    if (!questions.length) return <div>No questions for this level.</div>;

    if (quizFinished) {
        // Did they pass? Legacy didn't have strict pass/fail, just congratulations. 
        // But let's keep the trophy vs try again logic for better UX.
        // Assuming > 60% is good? Questions are usually 5. So 3/5.
        const passed = (score / questions.length) >= 0.5;

        return (
            <div className="container">
                {passed && <Confetti recycle={true} numberOfPieces={200} />}

                <img src="/images/Logo1.png" alt="Quiz Logo" className="logo" style={{ width: '200px', marginBottom: '20px' }} />

                <div className="scoreboard" style={{ textAlign: 'center', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '36px', marginBottom: '10px', color: passed ? '#4CAF50' : '#F44336' }}>
                        {passed ? "Congratulations!" : "Try Again!"}
                    </h2>

                    <div className="score-box" style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        padding: '20px 40px',
                        borderRadius: '20px',
                        marginBottom: '30px',
                        border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                        <p className="score-text" style={{ margin: 0, fontSize: '28px' }}>
                            Score: {score} / {questions.length}
                        </p>
                    </div>

                    <div className="btn-group">
                        <button className="action-btn" onClick={() => navigate(`/levels/${bookFile}`)}>
                            <span className="btn-main-text">Levels</span>
                        </button>
                        {parseInt(level) < bookData.chapters && passed && (
                            <button className="action-btn" onClick={() => {
                                navigate(`/quiz/${bookFile}/${parseInt(level) + 1}`);
                            }}>
                                <span className="btn-main-text">Next Level</span>
                            </button>
                        )}
                        {!passed && (
                            <button className="action-btn" onClick={() => {
                                setQuizFinished(false);
                                setCurrentQuestionIndex(0);
                                setScore(0);
                                setTimer(30);
                                setShowConfetti(false);
                            }}>
                                <span className="btn-main-text">Retry</span>
                            </button>
                        )}
                        <button className="action-btn" onClick={() => navigate('/')}>
                            <span className="btn-main-text">Home</span>
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-wrapper">
            {/* Feedback Overlay */}
            {showFeedback && (
                <div className="feedback-overlay" style={{
                    display: 'flex',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    pointerEvents: 'none',
                    background: 'rgba(0,0,0,0.3)' // Subtle dim
                }}>
                    <div className={`feedback-icon ${feedbackType}`} style={{
                        fontSize: '100px',
                        fontWeight: 'bold',
                        color: feedbackType === 'correct' ? '#4CAF50' : '#F44336',
                        textShadow: feedbackType === 'correct' ? '0 0 20px rgba(76, 175, 80, 0.8)' : '0 0 20px rgba(244, 67, 54, 0.8)',
                        animation: 'popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}>
                        {feedbackType === 'correct' ? '✓' : '✗'}
                    </div>
                </div>
            )}

            {/* Per-question Confetti */}
            {showFeedback && feedbackType === 'correct' && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99 }}>
                    <Confetti recycle={false} numberOfPieces={100} gravity={0.5} />
                </div>
            )}

            <header className="header">
                <div className="back-arrow" onClick={() => navigate(-1)}>&#8592;</div>
                <div className="title-container" style={{ textAlign: 'center', width: '100%' }}>
                    <h1 id="book-title">{bookNameMap[bookData.bookName] || bookData.bookName}</h1>
                    <div className="chapter-info">Chapter {level} - {currentQuestionIndex + 1}/{questions.length}</div>
                </div>
                <div className="timer-circle" style={{ margin: 0, justifySelf: 'end' }}>{timer}</div>
            </header>

            <img src="/images/Logo1.png" alt="Quiz Logo" style={{ width: '230px', height: 'auto', marginBottom: '20px' }} />

            <div className="question-box">
                <p>{currentQuestion.question}</p>
            </div>

            <div className="options-container">
                {currentQuestion.options.map((option, idx) => {
                    let className = "option-btn";
                    if (selectedOption !== null) {
                        if (idx === currentQuestion.correct) className += " correct";
                        if (idx === selectedOption && idx !== currentQuestion.correct) className += " wrong";
                    }

                    return (
                        <button
                            key={idx}
                            className={className}
                            onClick={() => handleOptionClick(idx)}
                            disabled={selectedOption !== null}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Quiz;
