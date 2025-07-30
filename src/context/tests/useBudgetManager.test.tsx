/// <reference types="vitest" />
import { renderHook, act } from '@testing-library/react';
import { useBudgetManager } from '../../hooks/useBudgetManager';
import { SelectedService } from '../../types/types';

const mockServices: SelectedService[] = [
  { name: 'SEO', description: '', code: 'seo', price: 300 },
];

describe('useBudgetManager', () => {
  it('guarda un presupuesto correctamente', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));

    act(() => {
      result.current.saveBudget(
        { name: 'Ana', email: 'ana@example.com', phone: '123' },
        null
      );
    });

    expect(result.current.savedBudgets.length).toBe(1);
    expect(result.current.savedBudgets[0].customerInfo.name).toBe('Ana');
  });

  
  it('order by name', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));

    act(() => {
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
      result.current.ordenarPorNombre();
    });

    expect(result.current.savedBudgets[0].customerInfo.name).toBe('Ana');
  });

  it('order by Date ', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));

    act(() => {
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
      result.current.orderByDate();
    });

    expect(result.current.savedBudgets[0].customerInfo.name).toBe('Ana');
  });
});

it(' save with discount save the discount rigth', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));
  
    act(() => {
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, 150);
    });
  
    expect(result.current.savedBudgets[0].discountedTotal).toBe(150);
  });
  
  it('save budgets without specific order ', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));
  
    act(() => {
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
    });
  
    // Último guardado debe ir primero
    expect(result.current.savedBudgets[0].customerInfo.name).toBe('Ana');
  });
  
  