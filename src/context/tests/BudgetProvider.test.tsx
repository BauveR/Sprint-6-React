import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { BudgetProvider, useBudget } from '../BudgetProvider';

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <BudgetProvider>{children}</BudgetProvider>
);

describe('Presupuestos - Filtrado y ordenación', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('filtra presupuestos por nombre', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });

    act(() => {
      result.current.saveBudget({ name: 'Carlos', email: 'carlos@example.com', phone: '123' });
      result.current.saveBudget({ name: 'Ana', email: 'ana@example.com', phone: '456' });
      result.current.saveBudget({ name: 'María', email: 'maria@example.com', phone: '789' });
    });

    act(() => {
      result.current.filterBudgets('an');
    });

    const names = result.current.savedFilteredBudgets.map(b => b.customerInfo.name);
    expect(names).toEqual(expect.arrayContaining(['Ana', 'María']));
  });

  it('ordena presupuestos por nombre', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });

    act(() => {
      result.current.ordenarPorNombre();
    });

    const names = result.current.savedFilteredBudgets.map(b => b.customerInfo.name);
    const sorted = [...names].sort((a, b) => a.localeCompare(b));
    expect(names).toEqual(sorted);
  });

  it('ordena presupuestos por fecha descendente', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });

    act(() => {
      result.current.orderByDate();
    });

    const timestamps = result.current.savedFilteredBudgets.map(b => new Date(b.date).getTime());
    const sorted = [...timestamps].sort((a, b) => b - a);
    expect(timestamps).toEqual(sorted);
  });

  it('aplica descuento del 20% al guardar presupuesto', () => {
    const { result } = renderHook(() => useBudget(), { wrapper });
  
    // Añadir un servicio (ej. web = $500)
    act(() => {
      result.current.toggleService({
        name: 'Página web',
        description: 'Sitio básico',
        code: 'web',
        price: 500,
        hasCustomOptions: true,
      });
    });
  
    act(() => {
      result.current.applyAnnualDiscount();
    });
  
    act(() => {
      result.current.saveBudget({
        name: 'Descuento Test',
        email: 'test@descuento.com',
        phone: '000',
      });
    });
  
    const last = result.current.savedBudgets.at(-1);
  
    expect(last?.total).toBe(500);
    expect(last?.discountedTotal).toBeCloseTo(400); // 20% descuento
  });  

});


