const myForm = document.querySelector('.input-box__content');
const todoInput = document.querySelector('.input-box__input');
const todoList = document.querySelector('.list-box__list');

// input 체크하고 Todo 만들기
const createTodo = (e) => {
  e.preventDefault();
  if (todoInput.value) {
    renderTodoList(todoInput.value);
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

  // item 삭제버튼
  todoDelBtn.className = 'list-box__btn fa-solid fa-circle-xmark';

  // li 태그 안에 넣어주기
  newTodo.appendChild(newTodoSpan);
  newTodo.appendChild(todoDelBtn);

  // ul 태그 안에 새로운 item 넣어주기
  todoList.appendChild(newTodo);

  // input clear
  document.querySelector('.input-box__input').value = '';
};
