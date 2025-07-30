import { Routes, Route } from 'react-router-dom';
import { Welcome } from '../components /welcome/Welcome';
import { Budget } from '../pages/Budget';
import { SharedBudget } from '../pages/SharedBudget';

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/presupuesto" element={<Budget />} />
    <Route path="/shared-budgets" element={<SharedBudget />} />

  </Routes>
);
