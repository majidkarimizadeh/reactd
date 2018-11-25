import axios from 'axios';
import history from '../history'

export class RowService {

    getRow(tableName, id) {
        return axios.get('http://localhost:8000/api/row/' + tableName + '/' + id)
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
        return axios.post('http://localhost:8000/api/delete-row/', {delete: apiObject})
                .then(res => { return res.data })
    }

    updateRow(apiObject) {
    	return axios.put('http://localhost:8000/api/update-row/', apiObject)
    			.then(res => { return res })
    }

    storeRow(apiObject) {
        console.log(apiObject)
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
    	return axios.post('http://localhost:8000/api/store-row/', apiObject, config)
    			.then(res => { return res })
    }

}