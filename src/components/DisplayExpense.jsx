import { useState } from "react";

export default function DisplayExpense({expenses,sortedData,removeExpense,editingId,updateExpense,editExpense}) {
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
                      onChange={(e) => handleEditChange("date", e.target.value)}
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
                  <h3 className="display-description">{expense.description}</h3>
                  <div className="expense-details">
                    <p className="display-category">{expense.category}</p>

                    <p className="display-date">{expense.date}</p>

                    <p className="display-amount">
                      {expense.amount.toFixed(2)}
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
  );
}
