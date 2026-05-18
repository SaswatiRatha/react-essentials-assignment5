import { useMemo, useState } from "react"

const useFilter = (expenses) => {
    const [filters, setFilters] = useState({
        category: 'All',
        dateTo: '',
        dateFrom: '',
        minAmount: '',
        maxAmount: '',
        searchTerm: '',
        sortBy: 'default',
    })


    const updateFilter = (key,value) => {
        setFilters(prev=> ({
            ...prev,
            [key]:value,
        }))
    }

    const clearFilter = () => {
        setFilters({
            category: 'All',
            dateTo: '',
            dateFrom: '',
            minAmount: '',
            maxAmount: '',
            searchTerm: '',
            sortBy: 'default',
        })
    }

    const filteredData = useMemo(()=>{
        return expenses.filter(expense=>{
            if(filters.category !== 'All' && expense.category !== filters.category){
                return false;
            }

            if(filters.dateFrom && expense.date < filters.dateFrom){
                return false;
            }

            if(filters.dateTo && expense.date > filters.dateTo){
                return false;
            }

            if(filters.minAmount && expense.amount < filters.minAmount){
                return false;
            }

            if(filters.maxAmount && expense.amount > filters.maxAmount){
                return false;
            }

            if(filters.searchTerm && !expense.description.toLowerCase().includes(filters.searchTerm.toLowerCase())){
                return false;
            }

            return true;
        }); 
    },[expenses,filters]);

    const sortedData = useMemo(()=>{
        if(filters.sortBy === 'dateAsc'){
            return [...filteredData].sort((a,b)=> new Date(a.date) - new Date(b.date));
        }
        if(filters.sortBy === 'dateDesc'){
            return [...filteredData].sort((a,b)=> new Date(b.date) - new Date(a.date));
        }
        if(filters.sortBy === 'amountAsc'){
            return [...filteredData].sort((a,b)=> a.amount - b.amount);
        }
        if(filters.sortBy === 'amountDesc'){
            return [...filteredData].sort((a,b)=> b.amount - a.amount);
        }
        if(filters.sortBy === 'category'){
            return [...filteredData].sort((a,b)=> a.category.localeCompare(b.category));
        }
        return filteredData;
    },[filteredData,filters.sortBy]);

    const activeFilterCount = useMemo(() => {
        return Object.entries(filters).filter(([key, value]) => {
            if(key === 'category'){
                return value !== 'all';
            }
            return value !== '';
        }).length;

    }, [filters]);

    return {
        filters,
        updateFilter,
        clearFilter,
        filteredData,
        sortedData,
        activeFilterCount,
    }

}

export default useFilter;