import uuidv4 from 'uuid/v4';
import moment from 'moment';

// Setup the empty todos array
let todos = [];

// loadTodos
const loadTodos = () => {
	const todosJSON = localStorage.getItem('todos');
	
	try {
		todos = todosJSON ? JSON.parse(todosJSON) : [];
	} catch (e) {
		todos = [];
	}
}

// saveTodos
const saveTodos = () => {
	localStorage.setItem('todos', JSON.stringify(todos));
}

// getTodos
const getTodos = () => todos;

// createTodo
const createTodo = (todoText) => {
	const id = uuidv4();
	const timeStamp = moment().valueOf();
	if (todoText.trim().length > 0) {
			todos.push({
			id: id,
			text: todoText,
			createdAt: timeStamp,
			completed: false
		});
		saveTodos();
	}
}


// removeTodo
const removeTodo = (id) => {
	todos.filter((todo, i) => {
		if (todo.id === id) {
			todos.splice(i, 1);
			saveTodos();
		}
	});
}


// toggleTodo
const toggleTodo = (id) => {
	todos.filter((todo) => {
		if (todo.id === id) {
			todo.completed = !todo.completed;
			saveTodos();
		}
	});
}

// Make sure to call loadTodos and setup the exports
loadTodos();

export { loadTodos, saveTodos, getTodos, createTodo, removeTodo, toggleTodo };