import { useMemo, useState } from "react";
import useLocalStorage from "./useLocalStorage";

const useExpense = () => {
  const [expenses, setExpenses] = useLocalStorage('expenses',[]);
  const [editingId, setEditingId] = useState(null);

  const addExpense = (expenseData) => {
    setExpenses((prev) => [
      {
        id: new Date(),
        ...expenseData,
        date: new Date().toISOString().split("T")[0],
      },
      ...prev,
    ]);
  };

  const removeExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  const editExpense = (expenseId) => {
    setEditingId(expenseId);
  }

  const updateExpense = (expenseId, updatedData) => {
    setExpenses((prev)=>
        prev.map((expense)=>
            expense.id === expenseId ? (
                {...expense,...updatedData}
            ) : (
                expense
            )
        )
    )

    setEditingId(null)
  }

  const totalExpense = useMemo(() => {
    return expenses.reduce((sum,expense)=>sum+expense.amount,0);
  },[expenses]);

  const monthlyExpense = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return expenses.reduce((sum,expense)=>{
        const expenseDate = new Date(expense.date);
        if(expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear){
            return sum + expense.amount;
        }
        return sum;
    },0);
  },[expenses]);

  const monthlyTransanctions = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return expenses.filter((expense)=>{
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
  },[expenses]);

  return {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
    editExpense,
    editingId,
    totalExpense,
    monthlyExpense,
    monthlyTransanctions,
  };
};

export default useExpense;
