const myForm = document.querySelector('.input-box__content');
const todoList = document.querySelector('.list-box__list');
const doneList = document.querySelector('.done-box__list');

let todoCount = 0;
let doneCount = 0;

let todos = [];
let dones = [];

const checkLocal = () => {
  todos = JSON.parse(localStorage.getItem('todos'));
  dones = JSON.parse(localStorage.getItem('dones'));
  renderTodoList(todos);
  renderDoneList(dones);
};

// input 체크하고 Todo 만들기
const createTodo = (e) => {
  e.preventDefault();

  const todoInput = document.querySelector('.input-box__input');
  const todoInputVal = todoInput.value;

  if (todoInputVal) {
    // 입력값을 배열에 넣기
    todos = [...todos, todoInputVal];
    console.log(todos);
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList(todos);
  } else {
    todoInput.focus();
    alert('할 일을 입력해주세요!');
  }
};

// 폼 제출 시 createTodo()
myForm.addEventListener('submit', createTodo);

// To Do 부분 렌더링
const renderTodoList = (todos) => {
  todos.forEach((it) => {
    const newTodo = document.createElement('li');
    const newTodoSpan = document.createElement('span');
    const todoDelBtn = document.createElement('i');

    // item text
    newTodoSpan.innerText = it;
    newTodoSpan.className = 'list-box__text';
    newTodoSpan.addEventListener('click', toggleTodo);

    // item 삭제버튼
    todoDelBtn.className = 'list-box__btn fa-solid fa-circle-xmark';
    todoDelBtn.addEventListener('click', delTodo);

    // li 태그 안에 넣어주기
    newTodo.id = new Date().valueOf();
    newTodo.className = 'list-box__item';
    newTodo.append(newTodoSpan, todoDelBtn);

    // ul 태그 안에 새로운 item 넣어주기
    todoList.appendChild(newTodo);

    todoCount++;

    // input clear
    document.querySelector('.input-box__input').value = '';

    updateTodoCount();
  });
};

// Done 부분 렌더링
const renderDoneList = (dones) => {
  dones.forEach((it) => {
    const newDone = document.createElement('li');
    const newDoneSpan = document.createElement('span');
    const doneDelBtn = document.createElement('i');

    // item text
    newDoneSpan.innerText = it;
    newDoneSpan.className = 'done-box__text';
    newDoneSpan.addEventListener('click', toggleTodo);

    // item 삭제버튼
    doneDelBtn.className = 'done-box__btn fa-solid fa-circle-xmark';
    doneDelBtn.addEventListener('click', delTodo);

    // li 태그 안에 넣어주기
    newDone.className = 'done-box__item';
    newDone.append(newDoneSpan, doneDelBtn);

    // ul 태그 안에 새로운 item 넣어주기
    doneList.appendChild(newDone);

    doneCount++;

    updateDoneCount();
  });
};

const updateTodoCount = () => {
  const countText = document.querySelector('.list-box__count');
  countText.innerText = `(${todoCount})`;
};

const updateDoneCount = () => {
  const countText = document.querySelector('.done-box__count');
  countText.innerText = `(${doneCount})`;
};

// item 삭제
const delTodo = (e) => {
  const target = e.target.parentNode;

  // todos = todos.filter((todo) => {
  //   console.log(todo.id);
  //   todo.id !== parseInt(target.id);
  // });

  // localStorage.setItem('todos', JSON.stringify(todos));
  // console.log('삭제후 : ', todos);

  if (target.className === 'list-box__item') {
    target.remove();
    todoCount--;
    updateTodoCount();
  } else {
    target.remove();
    doneCount--;
    updateDoneCount();
  }
};

// item 토글
const toggleTodo = (e) => {
  const target = e.target.parentNode;

  if (target.className === 'list-box__item') {
    delTodo(e);
    dones = [...dones, e.target.textContent];
    console.log(dones);
    localStorage.setItem('dones', JSON.stringify(dones));
    renderDoneList(dones);
  } else {
    delTodo(e);
    todos = [...todos, e.target.textContent];
    localStorage.setItem('todos', JSON.stringify(todos));
    renderTodoList(e.target.textContent);
  }
};
