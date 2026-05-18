import { useState } from "react";
import useExpense from "./Hooks/useExpense";
import "./App.css";
import useFilter from "./Hooks/useFilter";

export default function App() {
  const {
    expenses,
    addExpense,
    removeExpense,
    editingId,
    updateExpense,
    editExpense,
    totalExpense,
    monthlyExpense,
    monthlyTransanctions,
  } = useExpense();
  const { filters, updateFilter, clearFilter, sortedData } =
    useFilter(expenses);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [editedData, setEditedData] = useState({});

  const categories = [
    "All",
    "Food",
    "Travel",
    "Bill",
    "Shopping",
    "Entertainment",
    "Others",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      description: description.trim(),
      amount: parseFloat(amount),
      category: category,
      date: date || new Date().toISOString().split("T")[0],
    });
    setAmount("");
    setDescription("");
    setCategory("Food");
    setDate("");
  };
  //console.log(filters);

  const handleEdit = (expense) => {
    editExpense(expense.id);

    setEditedData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      date: expense.date,
    });
  };

  const handleEditChange = (field, value) => {
    setEditedData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveEdit = () => {
    updateExpense(editingId, {
      description: editedData.description.trim(),
      amount: parseFloat(editedData.amount),
      category: editedData.category,
      date: editedData.date,
    });

    setEditedData({
      description: "",
      amount: "",
      category: "Food",
      date: "",
    });
  };

  return (
    <div className="app">
      <h1 className="heading">Personal Expense Tracker</h1>
      <div className="container">
        <form onSubmit={handleSubmit} className="new-expense">
          <header>
            <h2>Add New Expense</h2>
          </header>
          <section className="form-grid">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                className="form-description"
                value={description}
                placeholder="What did you spend on?"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <input
                type="number"
                step="0.01"
                id="amount"
                className="form-amount"
                value={amount}
                placeholder="0.00"
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                className="form-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                {categories.slice(1).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="form-date"
                value={date}
                placeholder="0.00"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="add-btn">
              Add Expense
            </button>
          </section>
        </form>

        <div className="filter-section">
          <header>
            <h2>Filters & Search</h2>
          </header>
          <section className="all-filters">
            <div className="filter-search">
              <p>Search</p>
              <input
                type="text"
                value={filters.searchTerm}
                placeholder="Search description..."
                onChange={(e) => updateFilter("searchTerm", e.target.value)}
              />
            </div>
            <div className="sort-data">
              <p>Sort By</p>
              <select
                className="input-sort"
                value={editedData.sortBy}
                onChange={(e) => updateFilter("sortBy", e.target.value)}
              >
                <option value="default">Default</option>
                <option value="dateAsc">Date (Oldest First)</option>
                <option value="dateDesc">Date (Newest First)</option>
                <option value="amountAsc">Amount (Min to Max)</option>
                <option value="amountDesc">Amount (Max to Min)</option>
                <option value="category">Category</option>
              </select>
            </div>
            <div className="filter-category">
              <p>Categories</p>
              <select
                id="category"
                className="input-category"
                value={editedData.category}
                onChange={(e) => updateFilter("category", e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="filter-todate">
              <p>Min Date</p>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => updateFilter("dateFrom", e.target.value)}
              />
            </div>
            <div className="filter-fromdate">
              <p>Max Date</p>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => updateFilter("dateTo", e.target.value)}
              />
            </div>
            <div className="filter-minamount">
              <p>Min Amount</p>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={filters.minAmount}
                onChange={(e) => updateFilter("minAmount", e.target.value)}
              />
            </div>
            <div className="filter-maxamount">
              <p>Max Amount</p>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={filters.maxAmount}
                onChange={(e) => updateFilter("maxAmount", e.target.value)}
              />
            </div>
          </section>
          <section className="filter-clear-btn">
            <p>{`Showing ${sortedData.length} of ${expenses.length} results`}</p>
            <button className="clear-btn" onClick={clearFilter}>
              Clear Filters
            </button>
          </section>
        </div>

        <div className="display-expense">
          {sortedData.length === 0 ? (
            expenses.length === 0 ? (
              <p className="no-expense">
                <i>No expense yet. Add your first expense above!</i>
              </p>
            ) : (
              <p className="no-expense">
                <i>No matches found. Try refining your filter!</i>
              </p>
            )
          ) : (
            <>
              <div className="expense-headers">
                <p className="header-description">Description</p>
                <div className="expense-header-details">
                  <p className="header-category">Category</p>
                  <p className="header-date">Date</p>
                  <p className="header-amount">Amount</p>
                </div>
                <p className="header-actions">Actions</p>
              </div>
              <div>
                {sortedData.map((expense) =>
                  editingId === expense.id ? (
                    <div key={expense.id} className="edit-form">
                      <input
                        type="text"
                        id="description"
                        className="edit-description"
                        value={editedData.description}
                        onChange={(e) =>
                          handleEditChange("description", e.target.value)
                        }
                      />
                      <div className="edit-info">
                        <select
                          id="category"
                          className="edit-category"
                          value={editedData.category}
                          onChange={(e) =>
                            handleEditChange("category", e.target.value)
                          }
                        >
                          {categories.slice(1).map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                        <input
                          type="date"
                          value={editedData.date}
                          onChange={(e) =>
                            handleEditChange("date", e.target.value)
                          }
                        />
                        <input
                          type="number"
                          step="0.01"
                          id="amount"
                          className="edit-amount"
                          value={editedData.amount}
                          onChange={(e) =>
                            handleEditChange("amount", e.target.value)
                          }
                        />
                      </div>
                      <div className="edit-actions">
                        <button className="save-btn" onClick={handleSaveEdit}>
                          Save
                        </button>
                        <button
                          className="cancel-btn"
                          onClick={() => editExpense(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={expense.id} className="expense-card">
                      <h3 className="display-description">
                        {expense.description}
                      </h3>
                      <div className="expense-details">
                        <p className="display-category">{expense.category}</p>

                        <p className="display-date">{expense.date}</p>

                        <p className="display-amount">
                          ₹{expense.amount.toFixed(2)}
                        </p>
                      </div>

                      <div className="expense-actions">
                        <button
                          className="edit-btn"
                          onClick={() => handleEdit(expense)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => removeExpense(expense.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </>
          )}
        </div>

        <div className="display-summary">
          <div className="display-total">
            <h3>Total Expenses:</h3>
            <h4>₹{totalExpense.toFixed(2)}</h4>
          </div>
          <div className="display-transactions">
            <h3>Total Transactions</h3>
            <h4>{expenses.length}</h4>
          </div>
          <div className="monthly-total">
            <h3>This Month</h3>
            <h4>Total Expenses: ₹{monthlyExpense.toFixed(2)}</h4>
            <h4>Total transactions: {monthlyTransanctions.length}</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
