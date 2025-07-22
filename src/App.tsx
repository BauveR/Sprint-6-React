import { BudgetProvider } from './context/BudgetContext';
import { Home } from './pages/Home';

function App() {
    return (
        <BudgetProvider>
            <Home />
        </BudgetProvider>
    );
}

export default App;