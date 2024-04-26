import dispatcher from '../dispatch/index.js';

const store = {
  dones: [],
  count: 0,
};

const reducer = (action) => {
  switch (action.type) {
    case 'DELETE_TODO':
      if (action.data.isDone) {
        store.dones = store.dones.filter((done) => {
          return done.id !== action.data.id;
        });
        store.count--;
      }
      break;

    case 'TOGGLE_TODO':
      if (action.data.isDone) {
        store.dones = [...store.dones, action.data];
        store.count++;
      } else {
        store.dones = store.dones.filter((done) => {
          return done.id !== action.data.id;
        });
        store.count--;
      }
      break;
  }
};

const createStore = () => {
  // 어떤 타입의 Action이 발생했는지에 따라 그에 맞는 데이터 변경을 수행하는 콜백 함수(리듀서)를 Dispatcher에 등록
  dispatcher.register(reducer);
  const data = {
    get() {
      return store;
    },
  };
  return Object.freeze(data);
};

const doneStore = createStore();

export default doneStore;
