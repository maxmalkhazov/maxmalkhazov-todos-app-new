import { getFilters, setFilters } from './filters';
import { getTodos, toggleTodo, saveTodos, removeTodo } from './todos';
import moment from 'moment';

// renderTodos
const renderTodos = () => {
	const todosElement = document.querySelector('#todos');
	const filters = getFilters();
	const todos = getTodos();
	const nonCompleted = todos.filter((todo) => !todo.completed);
	const filteredTodos = todos.filter((todo) => {
		const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !todo.completed || !filters.hideCompleted;
		return searchTextMatch && hideCompletedMatch;
	});
	
	todosElement.innerHTML = '';
	
	if (todos.length > 0) {
		todosElement.appendChild(generateSummaryDOM(nonCompleted));
	}
	
	if (todos.length > 0) {
		filteredTodos.forEach((todo) => {
			todosElement.appendChild(generateTodoDOM(todo));
		});
	} else {
		const emptyP = document.createElement('p');
		emptyP.classList.add('empty-message');
		emptyP.textContent = 'Your list is empty. Type something below to start!';
		todosElement.appendChild(emptyP);
	}
}

// generateTodoDOM
const generateTodoDOM = (todo) => {
	
	//Set up div
	const newTodo = document.createElement('label');
	const container = document.createElement('div');
	
	//Set up checkbox
	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	container.appendChild(checkbox);
	checkbox.checked = todo.completed;
	checkbox.addEventListener('change', (e) => {
		toggleTodo(todo.id);
		renderTodos();
	});
	
	//Set up todo text
	const textElement = document.createElement('span');
	textElement.textContent = todo.text;
	container.appendChild(textElement);
	
	const textTimestamp = document.createElement('span');
	textTimestamp.textContent = moment(todo.createdAt).fromNow();
	textTimestamp.classList.add('list-item__timestamp')
	container.appendChild(textTimestamp);
	
	// Set up container
	newTodo.classList.add('list-item');
	container.classList.add('list-item__container');
	newTodo.appendChild(container);
	
	//Set up remove button
	const button = document.createElement('button');
	button.textContent = 'Remove';
	button.classList.add('button', 'button--text');
	newTodo.appendChild(button);
	button.addEventListener('click', () => {
		removeTodo(todo.id);
		renderTodos();
	});
	
	return newTodo;
}

// generateSummaryDOM
const generateSummaryDOM = (nonCompleted) => {
	let todosLeft;
	const summary = document.createElement('p');
	summary.classList.add('list-title');
	if (nonCompleted.length === 1) {
		todosLeft = 'todo';
	} else {
		todosLeft = 'todos';
	}
	summary.textContent = `You have ${nonCompleted.length} ${todosLeft} left!`;
	return summary;
}


// Make sure to set up the exports
export { renderTodos, generateTodoDOM, generateSummaryDOM };