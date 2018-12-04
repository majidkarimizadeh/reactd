import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button';
import { AuthService } from '../../service/AuthService'
import { Message } from 'primereact/message';
import history from '../../utils/history'
import './style.css'

export default class LoginComponent extends Component {

	constructor(props) {
        super(props)
        this.state = {
        	email: '',
        	password: '',
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
    	this.setState({ error: '' })
    	if(email && password) {

    		this.authService.login(email, password)
    		.then(res => {
    			if(res.data) 
    			{
	    			localStorage.setItem('auth_token', res.data.auth_token)
	                history.push('/admin/users')
    			} 
    			else
    			{
	    			this.setState({
	    				error: 'Server Error !'
	    			})
    			}
    		})
    		.catch(err => {
    			window.scrollTo(0, 0)
    			if(err && err.response) {
	    			this.setState({
	    				error: err.response.data
	    			})
    			}
    		})

    	} else {
    		this.setState({
    			error: 'نام کاربری و رمز عبور الزامی است.'
    		})
    	}
    }

    render() {
    	const { error } = this.state
        return (
        	<div className='container p-col-12'>
	        	<div className="logo p-lg-3 p-md-4 p-sm-6 p-xs-8">
	                <img src="http://destription.com/images/logo.png" alt="" />
		        </div>
	        	<div className='login-container p-lg-4 p-md-6 p-sm-8 p-xs-12'>
	        		<h3 className="form-title">
	        			ورود
	        		</h3>
	        		{error &&
		        		<div className="p-col-12 p-md-12">
	                        <Message severity="error" text={error} />
	                    </div>
	        		}
	        		<div className='p-col-12 p-md-12'>
	                    <InputText 
	                    	name='email'
	                    	placeholder='نام کاربری'
	                    	className='form-control'
	                    	onChange={this.onChange}
	                    />
	                </div>
	                <div className='p-col-12 p-md-12'>
	                    <Password
	                    	name='password'
	                    	placeholder='رمز عبور'
	                    	feedback={false}
	                    	className='form-control'
	                    	onChange={this.onChange}
	                    />
	                </div>
	                <div className="p-col-12 p-md-12">
		                <Button 
		                	onClick={this.login}
		                	label="ورود"
		                />
		            </div>
	        	</div>
	            <div className='bottom-layout p-lg-4 p-md-6 p-sm-8 p-xs-12'>
		        	<Link to='/register'>
		        		ایجاد حساب کاربری
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