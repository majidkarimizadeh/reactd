import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Router, Switch, Route } from 'react-router-dom'
import registerServiceWorker from './utils/registerServiceWorker';
import history from './utils/history'
import App from './App';
import Auth from './Auth';

ReactDOM.render(
    <Router history={history}>
	   	<Switch>
	      	<Route exact path="/login" component={Auth} />
	      	<Route path="/" component={App} />
	   	</Switch>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();