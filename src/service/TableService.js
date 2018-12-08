import axios from 'axios';
import Service from './Service'
import { API_URL } from '../utils/config'
import { 
    dataParser,
    colParser, 
    tableParser,
    detailParser,
} from '../utils/parser'

export class TableService {

    getTableInfo(url, primary = '', children = '') {
        let apiObject = new FormData();
        apiObject.append('url', url)
        apiObject.append('primary', primary)
        apiObject.append('children', children)
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/select/`, apiObject)
                .then(res => {
                    return {
                        details: detailParser(res.data.details),
                        data: dataParser(res.data.data),
                        table: tableParser(res.data.table),
                        cols: colParser(res.data.cols),
                        perm: res.data.perm
                    }    
                });
    }
}