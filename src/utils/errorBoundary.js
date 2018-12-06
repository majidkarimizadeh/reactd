import React, { Component } from 'react'
import history from './history'

export default class ErrorBoundary extends Component {

  	constructor(props) {
    	super(props)
    	this.state = { 
    		error: null, 
    		errorInfo: null
    	}
  	}
  
  	componentDidCatch(error, errorInfo) {
    	this.setState({
      		error: error,
      		errorInfo: errorInfo
    	})
  	}
  
  	render() {
  		const { error } = this.state 
    	if (error) {
      		return (
	        	<div className='error-page'>
	          		<div>
	          			<h1 className='status'>{error.status}</h1>
	          			<div className='message'>
	          				<div>{error.data}</div>
	          				<div>
	          					<a onClick={() => history.goBack()} className='back'>
		          					back
		          				</a>
	          				</div>
          				</div>
	          		</div>
	        	</div>
	      	)
    	}
    	return this.props.children
  	}  
}