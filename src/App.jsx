import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader';
import ScreenRestriction from './components/ScreenRestriction';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const OldTestament = lazy(() => import('./pages/OT'));
const NewTestament = lazy(() => import('./pages/NT'));
const Levels = lazy(() => import('./pages/Levels'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Statistics = lazy(() => import('./pages/Statistics'));

function App() {
    return (
        <ScreenRestriction>
            <Router>
                <div className="app-container">
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/ot" element={<OldTestament />} />
                            <Route path="/nt" element={<NewTestament />} />
                            <Route path="/levels/:book" element={<Levels />} />
                            <Route path="/quiz/:book/:level" element={<Quiz />} />
                            <Route path="/statistics" element={<Statistics />} />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </ScreenRestriction>
    );
}

export default App;

