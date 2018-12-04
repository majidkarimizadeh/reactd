import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';
import registerServiceWorker from './utils/registerServiceWorker';
import { Router } from 'react-router-dom'
import history from './utils/history'

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();