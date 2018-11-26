import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom'
import history from './history'

ReactDOM.render(
    <Router history={history}>
        <App></App>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();