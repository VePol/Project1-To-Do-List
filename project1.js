document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todos');
    const todosHeader = document.querySelector('.todosheader'); // Select the header div
    const todoList = document.querySelector('.todoList');
    const countSpan = document.querySelector('.count');
    const allButton = document.getElementById('allButton');
    const activeButton = document.getElementById('activeButton');
    const completedButton = document.getElementById('completedButton');
    const clearButton = document.getElementById('clearButton');
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error';
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    todoInput.parentNode.insertBefore(errorMessage, todoInput.nextSibling);

    let todos = [];

    // Update the count of tasks
    function updateCount() {
        const activeTodos = todos.filter(todo => !todo.completed).length;
        countSpan.textContent = `${activeTodos} items left`;
    }

    // Render the to-do list based on current filter
    function render(filter = 'all') {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            if ((filter === 'active' && todo.completed) || (filter === 'completed' && !todo.completed)) return;

            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : 'normal';

            const label = document.createElement('label');
            label.textContent = todo.text;
            label.className = todo.completed ? 'completed' : 'normal';
            label.addEventListener('click', () => toggleComplete(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '❌';
            deleteBtn.className = 'delete';
            deleteBtn.addEventListener('click', () => deleteItem(index));

            li.appendChild(label);
            li.appendChild(deleteBtn);
            todoList.appendChild(li);
        });

        updateCount();
    }

    // Add a new to-do item
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const inputValue = todoInput.value.trim();
            // Validate input
            if (inputValue.length === 0) {
                errorMessage.textContent = 'Error: Task cannot be empty.';
                todosHeader.classList.add('error-border'); // Add error border class to header
                return;
            } else if (inputValue.length < 5) {
                errorMessage.textContent = 'Error: Task must be at least 5 characters long.';
                todosHeader.classList.add('error-border'); // Add error border class to header
                return;
            } else {
                errorMessage.textContent = ''; // Clear error message
                todosHeader.classList.remove('error-border'); // Remove error border class
            }
            todos.push({ text: inputValue, completed: false });
            todoInput.value = '';
            render();
        }
    });

    // Toggle completion status
    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        render();
    }

    // Delete a to-do item
    function deleteItem(index) {
        todos.splice(index, 1);
        render();
    }

    // Filter event listeners
    allButton.addEventListener('click', () => render('all'));
    activeButton.addEventListener('click', () => render('active'));
    completedButton.addEventListener('click', () => render('completed'));
    clearButton.addEventListener('click', () => {
        todos = todos.filter(todo => !todo.completed);
        render();
    });

    // Initial render
    render();
});

