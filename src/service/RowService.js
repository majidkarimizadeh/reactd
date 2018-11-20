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

    updateRow(tableName, primary, apiObject) {
    	apiObject['table_name'] = tableName;
    	apiObject['table_id'] = primary;
    	return axios.put('http://localhost:8000/api/update-row/', apiObject)
    			.then(res => { return res })
    }

    storeRow(tableName, apiObject) {
    	apiObject['table_name'] = tableName;
    	return axios.post('http://localhost:8000/api/store-row/', apiObject)
    			.then(res => { return res })
    }

}