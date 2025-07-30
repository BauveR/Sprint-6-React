/// <reference types="vitest" />
import { renderHook, act } from '@testing-library/react';
import { useBudgetManager } from '../../hooks/useBudgetManager';
import { SelectedService } from '../../types/types';

const mockServices: SelectedService[] = [
  { name: 'SEO', description: '', code: 'seo', price: 300 },
];

describe('useBudgetManager)', () => {
  it('Keep the budget', () => {
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

    const filtered = result.current.savedFilteredBudgets;
    expect(filtered[0].customerInfo.name).toBe('Ana');
    expect(filtered[1].customerInfo.name).toBe('Carlos');
  });

  it('order by date', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));

    act(() => {
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
    });

    // Esperamos 1ms para asegurar diferencia de fecha
    act(() => {
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
    });

    act(() => {
      result.current.orderByDate();
    });

    const filtered = result.current.savedFilteredBudgets;
    expect(filtered[0].customerInfo.name).toBe('Ana'); // El último guardado es el más reciente
  });

  it('keep the budget with discount', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));

    act(() => {
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, 150);
    });

    expect(result.current.savedBudgets[0].discountedTotal).toBe(150);
  });

  it('keep the budget without order', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));

    act(() => {
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
    });

    expect(result.current.savedBudgets[0].customerInfo.name).toBe('Ana');
  });

  it('filter by name rigth', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));

    act(() => {
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
      result.current.filterBudgets('ana');
    });

    const filtered = result.current.savedFilteredBudgets;
    expect(filtered.length).toBe(1);
    expect(filtered[0].customerInfo.name).toBe('Ana');
  });
});

it('filter vooid string returning all budgets', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));
  
    act(() => {
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
      result.current.filterBudgets('');
    });
  
    expect(result.current.savedFilteredBudgets.length).toBe(2);
  });
  
  it('order by name after the filter', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));
  
    act(() => {
      result.current.saveBudget({ name: 'Carlos', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Ana María', email: '', phone: '' }, null);
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
      result.current.filterBudgets('ana');
      result.current.ordenarPorNombre();
    });
  
    const names = result.current.savedFilteredBudgets.map(b => b.customerInfo.name);
    expect(names).toEqual(['Ana', 'Ana María']);
  });
  
  it('keep the services selcted rigth', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));
  
    act(() => {
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
    });
  
    expect(result.current.savedBudgets[0].services).toEqual(mockServices);
  });
  
  it('calculate the total', () => {
    const services: SelectedService[] = [
      { name: 'SEO', description: '', code: 'seo', price: 300 },
      { name: 'Ads', description: '', code: 'ads', price: 200 },
    ];
    const { result } = renderHook(() => useBudgetManager(services));
  
    act(() => {
      result.current.saveBudget({ name: 'Ana', email: '', phone: '' }, null);
    });
  
    expect(result.current.savedBudgets[0].total).toBe(500);
  });
  it('aupdate the state orderedBy (order by date or name)', () => {
    const { result } = renderHook(() => useBudgetManager(mockServices));
  
    act(() => {
      result.current.ordenarPorNombre();
    });
    expect(result.current.orderedBy).toBe('NAME');
  
    act(() => {
      result.current.orderByDate();
    });
    expect(result.current.orderedBy).toBe('DATE');
  });
    