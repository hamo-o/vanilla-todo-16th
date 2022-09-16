const myForm = document.querySelector('.input-box__content');
const todoList = document.querySelector('.list-box__list');
const doneList = document.querySelector('.done-box__list');

let todoCount = 0;
let doneCount = 0;

// input 체크하고 Todo 만들기
const createTodo = (e) => {
  e.preventDefault();

  const todoInput = document.querySelector('.input-box__input');
  const todoInputVal = todoInput.value;

  if (todoInputVal) {
    renderTodoList(todoInputVal);
  } else {
    todoInput.focus();
    alert('할 일을 입력해주세요!');
  }
};

// 폼 제출 시 createTodo()
myForm.addEventListener('submit', createTodo);

// To Do 부분 렌더링
const renderTodoList = (text) => {
  const newTodo = document.createElement('li');
  const newTodoSpan = document.createElement('span');
  const todoDelBtn = document.createElement('i');

  // item text
  newTodoSpan.innerText = text;
  newTodoSpan.className = 'list-box__text';
  newTodoSpan.addEventListener('click', toggleTodo);

  // item 삭제버튼
  todoDelBtn.className = 'list-box__btn fa-solid fa-circle-xmark';
  todoDelBtn.addEventListener('click', delTodo);

  // li 태그 안에 넣어주기
  newTodo.className = 'list-box__item';
  newTodo.appendChild(newTodoSpan);
  newTodo.appendChild(todoDelBtn);

  // ul 태그 안에 새로운 item 넣어주기
  todoList.appendChild(newTodo);

  todoCount++;

  // input clear
  document.querySelector('.input-box__input').value = '';

  updateTodoCount();
};

const updateTodoCount = () => {
  const countText = document.querySelector('.list-box__count');
  countText.innerText = `(${todoCount})`;
};

const updateDoneCount = () => {
  const countText = document.querySelector('.done-box__count');
  countText.innerText = `(${doneCount})`;
};

const delTodo = (e) => {
  const target = e.target.parentNode;

  if (target.className === 'list-box__item') {
    todoList.removeChild(target);
    todoCount--;
    updateTodoCount();
  } else {
    doneList.removeChild(target);
    doneCount--;
    updateDoneCount();
  }
};

const toggleTodo = (e) => {
  console.log('move!');
};
