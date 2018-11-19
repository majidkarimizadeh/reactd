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

}