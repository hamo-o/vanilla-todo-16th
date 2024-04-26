const reducers = [];

const dispatcher = {
  // 스토어에서 등록할 콜백 함수들
  register(callback) {
    reducers.push(callback);
  },
  dispatch(action) {
    reducers.forEach((reducer) => reducer(action));
  },
};

export default dispatcher;
