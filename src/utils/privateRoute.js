import React from 'react'
import ErrorBoundary from './errorBoundary'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={props => (
        localStorage.getItem('token')
            ? <ErrorBoundary><Component {...props} /></ErrorBoundary>
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute