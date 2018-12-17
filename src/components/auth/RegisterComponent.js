import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { AuthService } from '../../service/AuthService'
import { Message } from 'primereact/message'
import './style.css'

export default class RegisterComponent extends Component {

	constructor(props) {
        super(props)
        this.state = {
        	name: '',
        	email: '',
        	password: '',
        	error: ''
        }
        this.onChange = this.onChange.bind(this)
        this.register = this.register.bind(this)
        this.authService = new AuthService()
    }

    onChange(e) {
    	this.setState({
    		[e.target.name]: e.target.value
    	})
    }

    register() {
    	// const { name, email, password } = this.state
    	// this.setState({ error: '' })
    	// if(name && email && password) {
    	// 	this.authService.register(name, email, password)
    	// } else {
    	// 	this.setState({
    	// 		error: 'نام, نام کاربری و رمز عبور الزامی است.'
    	// 	})
    	// }
    }

    render() {
    	const { error } = this.state
        return (
        	<div className='container p-col-12'>
	        	<div className='logo p-lg-3 p-md-4 p-sm-8 p-xs-12'>
	                <img src='assets/layout/images/logo.png' alt='' />
		        </div>
	        	<div className='login-container p-lg-4 p-md-6 p-sm-8 p-xs-12'>
	        		<h3 className='form-title'>
	        			Register
	        		</h3>
	        		{error &&
		        		<div className='p-col-12 p-md-12'>
	                        <Message severity='error' text={error} />
	                    </div>
	        		}

	        		<div className='p-col-12 p-md-12'>
                        <Message severity='error' text='Registration is not available right now' />
                    </div>
	        		{/*<div className='p-col-12 p-md-12'>
	                    <InputText 
	                    	name='name'
	                    	placeholder='نام'
	                    	className='form-control'
	                    	onChange={this.onChange}
	                    />
	                </div>
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
	                    	className='form-control'
	                    	onChange={this.onChange}
	                    />
	                </div>
	                <div className='p-col-12 p-md-12'>
		                <Button 
		                	onClick={this.register}
		                	label='ثبت نام'
		                />
		            </div>*/}
	        	</div>
	        	<div className='bottom-layout p-lg-4 p-md-6 p-sm-8 p-xs-12'>
		        	<Link to='/login'>
		        		Login
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