import axios from 'axios';
import { API_URL } from '../utils/config'
import { 
    dataParser,
    colParser, 
    tableParser,
    detailParser
} from '../utils/parser'

export class TableService {

    getTableInfo(url, primary = null, children = null) {
        let apiObject = {
            url: url,
            primary: primary,
            children: children
        }
        return axios.post(`${API_URL}/select/`, apiObject)
                .then(res => {
                    return {
                        details: detailParser(res.data.details),
                        data: dataParser(res.data.data),
                        table: tableParser(res.data.table),
                        cols: colParser(res.data.cols)
                    }    
                });
    }
}