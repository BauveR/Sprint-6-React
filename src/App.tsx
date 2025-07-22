import { BudgetProvider } from './context/BudgetContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Welcome } from './pages/Welcome';

function App() {
    return (
        <BudgetProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome />} />
                    <Route path="/presupuesto" element={<Home />} />
                </Routes>
            </Router>
        </BudgetProvider>
    );
}

export default App;