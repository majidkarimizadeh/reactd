import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Messages } from 'primereact/messages'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button';
import { AuthService } from '../../service/AuthService'
import { Message } from 'primereact/message';
import { validationErrorParser } from '../../utils/parser'
import history from '../../utils/history'
import Loader from 'react-loader-spinner'
import './style.css'

export default class LoginComponent extends Component {

	constructor(props) {
        super(props)
        this.state = {
        	email: '',
        	password: '',
        	isLoading: false,
        	error: ''
        }
        this.onChange = this.onChange.bind(this)
        this.login = this.login.bind(this)
        this.authService = new AuthService()
    }

    onChange(e) {
    	this.setState({
    		[e.target.name]: e.target.value
    	})
    }

    login() {
    	const { email, password } = this.state;
    	this.setState({ 
    		error: '',
    		isLoading: true,
    	})
    	this.messages.clear()
    	if(email && password) {

    		this.authService.login(email, password)
    		.then(res => {
    			if(res.data) 
    			{
    				let data = res.data
	    			localStorage.setItem('token', data.token)
	    			if(data.user)
	    			{
	    				let user = data.user;
	    				localStorage.setItem('user_full_name', user.full_name)
	    				localStorage.setItem('user_img', user.img)
	    			}
	                history.push('/admin/users')
    			}
    		})
    		.catch(err => {
    			window.scrollTo(0, 0)
    			if(err && err.response) {
    				if(err.response.status === 422) 
    				{
    					this.messages.show({
                            severity: 'error',
                            sticky: true,
                            detail: validationErrorParser(err.response.data)
                        })
    				}
    				else if(err && err.response) 
    				{
	    				let errorData = err.response.data
		    			this.setState({
		    				error: errorData.message
		    			})
	    			}	
    			}
    		})

    	} else {
    		this.setState({
    			error: 'Please fill username and password'
    		})
    	}
    	this.setState({ isLoading: false })
    }

    render() {
    	const { error, isLoading } = this.state
        return (
        	<div className='container p-col-12'>
	        	<div className="logo p-lg-3 p-md-4 p-sm-6 p-xs-8">
	                <img src='assets/layout/images/logo.png' alt="" />
		        </div>
	        	<div className='login-container p-lg-4 p-md-6 p-sm-8 p-xs-12'>
	        		<h3 className="form-title">
	        			Login
	        		</h3>
	        		<Messages className='validation-error' ref={(el) => this.messages = el}></Messages>
	        		{error &&
		        		<div className="p-col-12 p-md-12">
	                        <Message severity="error" text={error} />
	                    </div>
	        		}
	        		{isLoading && 
	        			<div style={{width:'100%', textAlign:'center'}}>
		        			<Loader 
		                        type="Puff"
		                        color="#5867dd"
		                        height="100"   
		                        width="100"
	                    	/>
	        			</div>
                    }
	        		{!isLoading && 
	        			<>
	        			<div className='p-col-12 p-md-12'>
		                    <InputText 
		                    	name='email'
		                    	placeholder='Email'
		                    	className='form-control'
		                    	onChange={this.onChange}
		                    />
		                </div>
		                <div className='p-col-12 p-md-12'>
		                    <Password
		                    	name='password'
		                    	placeholder='Password'
		                    	feedback={false}
		                    	className='form-control'
		                    	onChange={this.onChange}
		                    />
		                </div>
		                <div className="p-col-12 p-md-12 login-btn">
			                <Button 
			                	onClick={this.login}
			                	label="Login"
			                />
			            </div>
			            </>
	        		}
        		</div>
	            <div className='bottom-layout p-lg-4 p-md-6 p-sm-8 p-xs-12'>
		        	<Link to='/register'>
		        		Create an account
	        		</Link>
	        	</div>
	        	<span className='powered'>
	        		Powered by&#160;
	        		<Link target="_blank" to="//github.com/majidkarimizadeh/reactd">
		        		Reactd
	        		</Link>
	        	</span>
        	</div>
        )
    }
}