// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

// Add necessary imports
import { setFilters, getFilters } from './filters';
import { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo } from './todos';
import { renderTodos } from './views';

// Render initial todos
renderTodos();

// Set up search text handler
document.querySelector('#search-text').addEventListener('input', (e) => {
	setFilters({
		searchText: e.target.value
	});
	renderTodos();
});

// Set up checkbox handler
document.querySelector("#is-completed").addEventListener('change', (e) => {
	const filters = getFilters();
	filters.hideCompleted = e.target.checked;
	renderTodos();
});

// Set up form submission handler
document.querySelector('#todo-form').addEventListener('submit', (e) => {
	e.preventDefault();
	createTodo(e.target.elements.todoItem.value);
	e.target.elements.todoItem.value = '';
	renderTodos();
});

// Add a watcher for local storage
window.addEventListener('storage', (e) => {
	if (e.key === 'todos') {
		loadTodos();
		renderTodos();		
	}
});