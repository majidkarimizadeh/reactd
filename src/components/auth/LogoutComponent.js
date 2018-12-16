import React, { Component } from 'react'
import { AuthService } from '../../service/AuthService'
import history from '../../utils/history'
import Loader from 'react-loader-spinner'
import './style.css'

export default class LogoutComponent extends Component {

	componentWillMount() {
		let authService = new AuthService()
        authService.logout()
            .then(() => {
                localStorage.removeItem('token')
                localStorage.removeItem('user_full_name')
                localStorage.removeItem('user_img')
                history.push('/login')
            })
	}

    render() {
    	return (
    		<div style={{textAlign:'center'}}>
	    		<Loader 
		            type="Puff"
		            color="#5867dd"
		            height="100"   
		            width="100"
		    	/>
    		</div>
    	)
    }
}