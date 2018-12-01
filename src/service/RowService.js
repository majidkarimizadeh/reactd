import axios from 'axios';
import history from '../history'
import { API_URL } from '../config'

export class RowService {

    deleteRow(apiObject) {
        return axios.post(`${API_URL}/delete-row/`, apiObject)
                .then(res => { return res.data })
    }

    updateRow(apiObject) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post(`${API_URL}/update-row/`, apiObject, config)
    			.then(res => { return res })
    }

    storeRow(apiObject) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post(`${API_URL}/store-row/`, apiObject, config)
    			.then(res => { return res })
    }

}