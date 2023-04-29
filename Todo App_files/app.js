let todos = [];
const TODO_KEY = 'TODO_KEY';


const todosContainer = document.getElementById('days');
const nextTodo = document.querySelector('.todo__day')
const inputDay = document.getElementById("day");

function loadData() {
  const todosString = localStorage.getItem(TODO_KEY);
  const todoArray = JSON.parse(todosString);
  if (Array.isArray(todoArray)) {
    todos = todoArray;
  }
}

let inputValue;
inputDay.addEventListener('input', (e) => {
  inputValue = e.target.value;
})


function saveData() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function rerender() {
  todosContainer.innerHTML = '';
  for (const index in todos) {
    const element = document.createElement('div');
    element.classList.add('todo');
    element.innerHTML = `<div class="todo__day" contenteditable="true" onblur="editDay(${index}, this)">${todos[index].day}</div>
              <div class="todo__comment" contenteditable="true" onblur="editComment(${index}, this)">${todos[index].comment}</div>
              <div class="todo__checkbox">
                <input type="checkbox" ${todos[index].checked ? 'checked' : ''} onchange="toggleChecked(${index}, this)">
              </div>
              <button class="todo__delete" onclick="deleteTodo(${index})">
                <img src="./Todo App_files/delete.svg" alt="Удалить дело ${index + 1}" />
              </button>`;
    todosContainer.appendChild(element);
  }
  nextTodo.innerHTML = `Дело ${todos.length + 1}`;
}

function editDay(index, element) {
  todos[index].day = element.innerHTML;
  saveData();
}

function editComment(index, element) {
  todos[index].comment = element.innerHTML;
  saveData();
}

function toggleChecked(index, element) {
  todos[index].checked = element.checked;
  saveData();
}

/* work with todos */
function addTodo(event) {
  event.preventDefault();
  
  const todo = {
    day: inputValue || `Дело ${todos.length + 1}`,
    comment: event.target['comment'].value,
  };
  
  todos.push(todo);
  event.target['comment'].value = '';
  inputDay.value = ''
  
  
  rerender();
  saveData();
}

function deleteTodo(index) {
  todos.splice(index, 1);
  rerender();
  saveData();
}

/* init */
(() => {
  loadData();
  rerender();
})();