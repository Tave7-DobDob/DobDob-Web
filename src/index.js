import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App';
import './style.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import persistedReducer from './modules';
import { persistStore } from 'redux-persist';	// 추가
import { PersistGate } from 'redux-persist/integration/react';
import dotenv from 'dotenv'
import { composeWithDevTools } from 'redux-devtools-extension';

dotenv.config()
const store = createStore(persistedReducer, composeWithDevTools());
const persistor = persistStore(store)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>

    </Provider >
  </React.StrictMode>
  ,
  document.getElementById('root')
);

