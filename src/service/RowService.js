import axios from 'axios';
import history from '../history'
import { API_URL } from '../config'

export class RowService {

    getRow(tableName, id) {
        return axios.get(`${API_URL}/row/${tableName}/${id}`)
                .then(res => {
                    return {
                        row: res.data.row,
                    }    
                });
    }

    deleteRow(tableName, primary) {
        const apiObject = {
            table_name: tableName,
            table_id: primary
        };
        return axios.post(`${API_URL}/delete-row/`, {delete: apiObject})
                .then(res => { return res.data })
    }

    updateRow(apiObject) {
    	return axios.put(`${API_URL}/update-row/`, apiObject)
    			.then(res => { return res })
    }

    storeRow(apiObject) {
        console.log(apiObject)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post(`${API_URL}/store-row/`, apiObject, config)
    			.then(res => { return res })
    }

}