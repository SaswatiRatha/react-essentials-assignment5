import "./App.css";
import ExpenseInput from "./components/ExpenseInput";
import ExpenseFilter from "./components/ExpenseFilter";
import DisplayExpense from "./components/DisplayExpense";
import DisplaySummary from "./components/DisplaySummary";
import useFilter from "./Hooks/useFilter";
import useExpense from "./Hooks/useExpense";

export default function App() {
  const { expenses, addExpense, removeExpense, editingId, updateExpense, editExpense, totalExpense, monthlyExpense, monthlyTransanctions } =
    useExpense();

  const { filters, updateFilter, clearFilter, sortedData } =
    useFilter(expenses);

  //console.log(filters);

  return (
    <div className="app">
      <h1 className="heading">Personal Expense Tracker</h1>
      <div className="container">
        <ExpenseInput addExpense={addExpense} />
        <ExpenseFilter expenses={expenses} filters={filters} updateFilter={updateFilter} clearFilter={clearFilter} sortedData={sortedData} />
        <DisplayExpense expenses={expenses} sortedData={sortedData} removeExpense={removeExpense} editingId={editingId} updateExpense={updateExpense} editExpense={editExpense} />
        <DisplaySummary expenses={expenses} totalExpense={totalExpense} monthlyExpense={monthlyExpense} monthlyTransanctions={monthlyTransanctions} />
      </div>
    </div>
  );
}
