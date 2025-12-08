import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OldTestament from './pages/OT';
import NewTestament from './pages/NT';
import Levels from './pages/Levels';
import Quiz from './pages/Quiz';
import Statistics from './pages/Statistics';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ot" element={<OldTestament />} />
                    <Route path="/nt" element={<NewTestament />} />
                    <Route path="/levels/:book" element={<Levels />} />
                    <Route path="/quiz/:book/:level" element={<Quiz />} />
                    <Route path="/statistics" element={<Statistics />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

