import axios from 'axios';
import { API_URL } from '../utils/config'

export class RowService {

    deleteRow(apiObject) {
        return axios.post(`${API_URL}/delete/`, apiObject)
    }

    updateRow(apiObject) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post(`${API_URL}/update/`, apiObject, config)
    }

    storeRow(apiObject) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post(`${API_URL}/store/`, apiObject, config)
    }

}