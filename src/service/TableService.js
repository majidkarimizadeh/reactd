import axios from 'axios';
import history from '../history'

export class TableService {
    
    getAllTableData(tableName) {
        return axios.get('http://localhost:8000/api/index/' + tableName)
                .then(res => {
                    return {
                        data: res.data.data,
                        attr: res.data.attr,
                        table: JSON.parse(res.data.table),
                    }    
                });
    }

    getAllDataColumn(tableName) {
        return axios.get('http://localhost:8000/api/index/data-column/' + tableName)
                .then(res => {
                    return {
                        data: res.data.data,
                        columns: res.data.columns,
                    }    
                });
    }

}