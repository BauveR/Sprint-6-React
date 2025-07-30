// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './components /welcome/Welcome';
import { Budget } from './pages/Budget';
import { BudgetProvider } from './context/BudgetProvider';
import { SharedBudget } from './pages/SharedBudget';


export const App = () => {
  return (
    <BrowserRouter>
      <BudgetProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/presupuesto" element={<Budget />} />
          <Route path="/shared-budget" element={<SharedBudget />} /> 
        </Routes>
      </BudgetProvider>
    </BrowserRouter>
  );
};
