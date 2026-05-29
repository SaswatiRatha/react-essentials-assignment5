export default function ExpenseFilter({expenses,filters,updateFilter,clearFilter,sortedData}) {
  
    const categories = ["All","Food","Travel","Bill","Shopping","Entertainment","Others",];

  return (
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
            value={sortedData.sortBy}
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
            value={sortedData.category}
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
        <p>{`Showing ${sortedData.length} of ${expenses.length} expenses`}</p>
        <button className="clear-btn" onClick={clearFilter}>
          Clear Filters
        </button>
      </section>
    </div>
  );
}
