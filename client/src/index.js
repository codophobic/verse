import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";


const reduxStore = configureStore(window.REDUX_INITIAL_DATA);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={reduxStore}>
    <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
