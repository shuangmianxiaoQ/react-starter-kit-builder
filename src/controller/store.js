import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import initialState from './initialState';
import history from './history';

import {
  logger,
  makeRootReducer,
  sagaMiddleware as saga,
  rootSaga,
  runSaga
} from './middleware';

//创建`root store`配置
const rootStore = () => {
  const middleware = [];

  // 添加路由
  middleware.push(routerMiddleware(history));

  // 添加`Saga`
  middleware.push(saga);

  // 添加`logger`
  middleware.push(logger);

  const enhancers = [];

  // 使用`redux-devtools`
  if (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }

  // 创建`redux store`
  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  // 代码分隔期间注入`saga`
  store.runSaga = runSaga;
  runSaga(rootSaga);
  store.asyncReducers = {};

  return store;
};

export default rootStore();
