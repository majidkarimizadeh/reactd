import axios from 'axios';
import Service from './Service'
import { API_URL } from '../utils/config'

export class AuthService {

    login(email, password) {
    	let apiObject = new FormData()
        apiObject.append('email', email)
        apiObject.append('password', password)
        return axios.post(`${API_URL}/login`, apiObject)
    }

    logout() {
    	let apiObject = new FormData()
    	Service.setToken(apiObject)
        return axios.post(`${API_URL}/logout`, apiObject)
    }
}