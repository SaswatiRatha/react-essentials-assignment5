export default function DisplaySummary({expenses, totalExpense, monthlyExpense, monthlyTransanctions}){
    
    return(
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
    )
}