import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import history from './history'

ReactDOM.render(
    <Router history={history}>
        <ScrollToTop>
            <App></App>
        </ScrollToTop>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();