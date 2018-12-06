import React from 'react'

export default class Service {
	
	static setToken = (apiObject) => {
		apiObject.append('auth_token', localStorage.getItem('auth_token'))
	}
}