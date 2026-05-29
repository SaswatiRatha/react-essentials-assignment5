import { useState } from "react";

export default function ExpenseInput({addExpense}) {

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

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

  return (
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
  );
}
