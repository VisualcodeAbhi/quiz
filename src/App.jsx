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
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const handleLoad = () => setIsLoading(false);

        // Wait for connection to be stable and assets to load
        if (document.readyState === 'complete') {
            setTimeout(() => setIsLoading(false), 2000);
        } else {
            window.addEventListener('load', () => {
                setTimeout(() => setIsLoading(false), 2000);
            });
            return () => window.removeEventListener('load', handleLoad);
        }
    }, []);

    if (isLoading) {
        return <Loader />;
    }

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

