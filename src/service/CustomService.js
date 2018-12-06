import axios from 'axios';
import { API_URL } from '../utils/config'

export class CustomService {

	delete(url, apiObject) {
        return axios.delete(`${API_URL}/${url}`, { delete : apiObject })
    }

	put(url, apiObject) {
        return axios.put(`${API_URL}/${url}`, apiObject)
    }

    post(url, apiObject) {
        return axios.post(`${API_URL}/${url}`, apiObject)
    }

    get(url, apiObject) {
        return axios.get(`${API_URL}/${url}`, apiObject)
    }
}