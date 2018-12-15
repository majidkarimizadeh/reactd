import axios from 'axios';
import Service from './Service'
import { API_URL } from '../utils/config'

export class RowService {

    deleteRow(apiObject) {
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/destroy/`, apiObject)
    }

    updateRow(apiObject) {
        Service.setToken(apiObject)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post(`${API_URL}/update/`, apiObject, config)
    }

    storeRow(apiObject) {
        Service.setToken(apiObject)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post(`${API_URL}/store/`, apiObject, config)
    }

}