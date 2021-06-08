import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import rootReducer, { rootSaga } from './modules/index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { tempSetUser, check } from './modules/user';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);
function loadUser() {
  try {
    const user = localStorage.getItem('user');
    if (!user) return; //로그인 상태가 아니라면 아무것도 안함
    console.log(2);
    store.dispatch(tempSetUser());
    console.log(3);
    store.dispatch(check());
    console.log(4);
  } catch (e) {
    console.log(e);
    console.log('localStorage is not working2');
  }
}
sagaMiddleware.run(rootSaga);
loadUser();
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
