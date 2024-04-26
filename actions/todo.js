import dispatcher from '../dispatch/index.js';

export const addTodo = (text) =>
  dispatcher.dispatch({
    type: 'ADD_TODO',
    data: {
      id: '' + Date.now().valueOf(),
      isDone: false,
      text,
    },
  });

export const deleteTodo = (id, isDone) =>
  dispatcher.dispatch({
    type: 'DELETE_TODO',
    data: { id, isDone },
  });

export const toggleTodo = (id, isDone, text) =>
  dispatcher.dispatch({
    type: 'TOGGLE_TODO',
    data: { id, isDone: !isDone, text },
  });
