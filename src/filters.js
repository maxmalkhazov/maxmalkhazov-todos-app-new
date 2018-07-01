// Set up filters default object
const filters = {
	searchText: '',
	hideCompleted: false
}

// getFilters
const getFilters = () => filters;

// setFilters
const setFilters = (updates) => {
	if (typeof updates.searchText === 'string') {
		filters.searchText = updates.searchText;
	}
	
	if (typeof updates.hideCompleted === 'boolean') {
		filters.hideCompleted = updates.hideCompleted;
	}
}

// Make sure to set up the exports
export { getFilters, setFilters };