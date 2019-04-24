import React from 'react';
import ReactDOM from 'react-dom';
import 'babel-polyfill';
import { Router, Switch, Route, Redirect } from 'react-router-dom'
import registerServiceWorker from './utils/registerServiceWorker';
import history from './utils/history'
import PrivateRoute from './utils/privateRoute'
import App from './App';
import LoginComponent from './components/auth/LoginComponent'
import LogoutComponent from './components/auth/LogoutComponent'
import RegisterComponent from './components/auth/RegisterComponent'

ReactDOM.render(
    <Router history={history}>
	   	<Switch>
	      	<Route exact path='/logout' component={LogoutComponent} />
	      	<Redirect exact path='/' to='/login' />
	      	<Route exact path='/login' component={LoginComponent} />
	      	<Route exact path='/register' component={RegisterComponent} />
	      	<PrivateRoute path='/admin' component={App} />
	   	</Switch>
    </Router>,
    document.getElementById('root')
);

registerServiceWorker();