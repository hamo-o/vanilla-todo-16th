import { addTodo, deleteTodo, toggleTodo } from './actions/todo.js';
import todoStore from './stores/todo.js';
import doneStore from './stores/done.js';

const myForm = document.querySelector('.input-box__content');
const todoInput = document.querySelector('.input-box__input');

const todoList = document.querySelector('.list-box__list');
const doneList = document.querySelector('.done-box__list');

const todoCount = document.querySelector('.list-box__count');
const doneCount = document.querySelector('.done-box__count');

const createTodo = (e) => {
  e.preventDefault();
  const todoInputVal = todoInput.value;

  if (todoInputVal) {
    addTodo(todoInputVal);
    renderTodoList(todoStore.get());
    todoInput.value = '';
  } else {
    todoInput.focus();
    alert('할 일을 입력해주세요!');
  }
};

myForm.addEventListener('submit', createTodo);

const delTodo = (e) => {
  const node = e.target.parentNode;
  const isDone = node.dataset.isdone === 'true';

  deleteTodo(node.id, isDone);
  isDone ? renderDoneList(doneStore.get()) : renderTodoList(todoStore.get());
};

const togTodo = (e) => {
  const node = e.target.parentNode;

  toggleTodo(node.id, node.dataset.isdone === 'true', e.target.innerText);
  renderTodoList(todoStore.get());
  renderDoneList(doneStore.get());
};

const renderTodoList = (todoStore) => {
  todoCount.innerText = `(${todoStore.count})`;

  todoList.innerHTML = '';
  todoStore.todos.forEach((todo) => {
    const newTodo = document.createElement('li');
    const newTodoSpan = document.createElement('span');
    const todoDelBtn = document.createElement('i');

    newTodoSpan.innerText = todo.text;
    newTodoSpan.className = 'list-box__text';
    newTodoSpan.addEventListener('click', togTodo);

    todoDelBtn.className = 'list-box__btn fa-solid fa-circle-xmark';
    todoDelBtn.addEventListener('click', delTodo);

    newTodo.id = todo.id;
    newTodo.className = 'list-box__item';
    newTodo.setAttribute('data-isdone', false);
    newTodo.append(newTodoSpan, todoDelBtn);

    todoList.appendChild(newTodo);
  });
};

const renderDoneList = (doneStore) => {
  doneCount.innerHTML = `(${doneStore.count})`;

  doneList.innerHTML = '';
  doneStore.dones.forEach((done) => {
    const newTodo = document.createElement('li');
    const newTodoSpan = document.createElement('span');
    const todoDelBtn = document.createElement('i');

    newTodoSpan.innerText = done.text;
    newTodoSpan.className = 'list-box__text';
    newTodoSpan.addEventListener('click', togTodo);

    todoDelBtn.className = 'list-box__btn fa-solid fa-circle-xmark';
    todoDelBtn.addEventListener('click', delTodo);

    newTodo.id = done.id;
    newTodo.className = 'list-box__item';
    newTodo.setAttribute('data-isdone', true);
    newTodo.append(newTodoSpan, todoDelBtn);

    doneList.appendChild(newTodo);
  });
};
