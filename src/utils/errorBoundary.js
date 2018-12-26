import React, { Component } from 'react'
import history from './history'

export default class ErrorBoundary extends Component {

  	constructor(props) {
    	super(props)
    	this.state = { 
    		error: null, 
    		errorMessage: ''
    	}
  	}
  
  	componentDidCatch(error, errorInfo) {

        let errorMessage = ''

        if(error.status && error.status === 401) 
        {
            history.push('/login')
        }
        else if(error.status && error.status === 500)
        {
            errorMessage = 'Server Error';
        }
        else if(error.data) 
        {
            if(typeof error.data === 'string' || error.data instanceof String) 
            {
                errorMessage = error.data;
            }
            else 
            {
                errorMessage = error.data.error;
            }
        }
        else if(error.response && error.response.data) 
        {
            errorMessage = error.response.data;
        }

        this.setState({
            error, errorMessage
        })
  	}
  
  	render() {
  		const { error, errorMessage } = this.state 

    	if (error) {
      		return (
	        	<div className='error-page'>
	          		<div>
	          			<h1 className='status'>{error.status}</h1>
	          			<div className='message'>
	          				<div>
                                {errorMessage}
                            </div>
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