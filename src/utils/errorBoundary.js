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

        if(error.status && error.status === 401) 
        {
            history.push('/login')
        }
  	}
  
  	render() {
  		const { error } = this.state 

    	if (error) {

      		return (
	        	<div className='error-page'>
	          		<div>
	          			<h1 className='status'>{error.status}</h1>
	          			<div className='message'>
	          				<div>
                                {error.data ? error.data.error : ''}
                            </div>
                            <div>
                                {(error.response && error.response.data) ? error.response.data.error : ''}
                            </div>
	          				<div>
                                {(error.status === 401) && 
                                    <a onClick={() => history.push('/login')} className='back'>
                                        login
                                    </a>
                                }
                                {(error.status !== 401) && 
    	          					<a onClick={() => history.goBack()} className='back'>
    		          					back
    		          				</a>
                                }
	          				</div>
          				</div>
	          		</div>
	        	</div>
	      	)
    	}
    	return this.props.children
  	}  
}