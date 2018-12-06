import axios from 'axios';
import Service from './Service'
import { API_URL } from '../utils/config'
export class CustomService {

	delete(url, apiObject) {
        Service.setToken(apiObject)
        return axios.delete(`${API_URL}/${url}`, { delete : apiObject })
    }

	put(url, apiObject) {
        Service.setToken(apiObject)
        return axios.put(`${API_URL}/${url}`, apiObject)
    }

    post(url, apiObject) {
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/${url}`, apiObject)
    }

    get(url, apiObject) {
        Service.setToken(apiObject)
        return axios.get(`${API_URL}/${url}`, apiObject)
    }
}