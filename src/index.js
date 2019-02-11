import React from 'react';
import ReactDOM from 'react-dom';
import RedBox from 'redbox-react';

import store from './controller/store';
import history from './controller/history';
import AppContainer from './containers/AppContainer';

const ENTRY_POINT = document.querySelector('#react-app-root');

// 创建应用的起始点
const render = () => {
  ReactDOM.render(<AppContainer store={store} history={history} />, ENTRY_POINT);
};

// 有助于了解应用程序崩溃后出现问题的位置
const renderError = error => {
  ReactDOM.render(<RedBox error={error} />, ENTRY_POINT);
};

// 注册`serviceWorker`
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./serviceWorker')
    .then(registration => {
      console.log('Excellent, registered with scope: ', registration.scope);
    })
    .catch(e => console.error('ERROR IN SERVICE WORKERS: ', e));
}

if (__DEV__) {
  // -------------------------------------
  // 开发阶段！激活`HMR`！
  // -------------------------------------
  const devRender = () => {
    if (module.hot) {
      module.hot.accept('./containers/AppContainer', () => render());
    }
  };

  try {
    devRender();
  } catch (error) {
    console.error(error);
    renderError(error);
  }
} else {
  render();
}
