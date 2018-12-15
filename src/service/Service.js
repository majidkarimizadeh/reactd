import React from 'react'

export default class Service {
	
	static setToken = (apiObject) => {
		apiObject.append('token', localStorage.getItem('token'))
	}
}