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

    getTableInfo(url) 
    {
        let apiObject = new FormData();
        apiObject.append('url', url)
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/get-table/`, apiObject)
                .then(res => {
                    return {
                        details: detailParser(res.data.details),
                        table: tableParser(res.data.table),
                        cols: colParser(res.data.cols),
                        perm: res.data.perm,
                        totalRows: res.data.totalRows
                    }    
                });
    }

    getTableData(url, options = {}) 
    {
        let apiObject = new FormData();
        apiObject.append('url', url)
        Object.keys(options).forEach( key => {
            if( Array.isArray(options[key]) ) 
            {
                apiObject.append(key, JSON.stringify(options[key]))
            }
            else
            {
                apiObject.append(key, options[key])
            }
        }) 
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/get-data/`, apiObject)
                .then(res => {
                    return {
                        data: dataParser(res.data.data),
                        totalRows: res.data.totalRows
                    }    
                });
    }


}