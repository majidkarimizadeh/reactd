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
        return axios.post(`${API_URL}/select-table/`, apiObject)
                .then(res => {
                    console.log(res)
                    return {
                        details: detailParser(res.data.details),
                        data: dataParser(res.data.data),
                        table: tableParser(res.data.table),
                        cols: colParser(res.data.cols),
                        perm: res.data.perm,
                        totalRows: res.data.totalRows
                    }    
                });
    }

    getTableData(url, startIndex = 0, limitIndex = 9, conditions = []) 
    {
        let apiObject = new FormData();
        apiObject.append('url', url)
        apiObject.append('start', startIndex)
        apiObject.append('limit', limitIndex)
        apiObject.append('conditions', JSON.stringify(conditions))
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/select-data/`, apiObject)
                .then(res => {
                    return {
                        data: dataParser(res.data.data),
                    }    
                });
    }


}