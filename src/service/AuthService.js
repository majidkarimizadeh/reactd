import axios from 'axios';
import { API_URL } from '../utils/config'

export class AuthService {

    login(email, password) {
    	let apiObject = new FormData()
        apiObject.append('email', email)
        apiObject.append('password', password)

        return axios.post(`${API_URL}/login`, apiObject)
                .then(res => {
                	console.log(res.data)
                });
    }
}