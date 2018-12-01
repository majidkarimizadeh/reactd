import axios from 'axios';
import history from '../history'
import { API_URL } from '../config'
import { 
    dataParser,
    colParser, 
    tableParser,
    detailParser
} from '../parser/parser'

export class TableService {
    
    getAllTableData(tableName) {
        return axios.get(`${API_URL}/select/${tableName}`)
                .then(res => {
                    return {
                        data: dataParser(res.data.data),
                        attr: res.data.attr,
                        table: tableParser(res.data.table),
                    }    
                });
    }

    getAllDataCol(tableName, primary = null, foreignTable = null) {
        let apiObject = {
            table_name: tableName,
            row_id: primary,
            foreign_table: foreignTable
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

    getAllDetailData(details) {
        let apiObject = {
            details: details
        }
        return axios.post(`${API_URL}/details`, apiObject)
            .then( res => {
                return {
                    details: detailParser(res.data.details),
                    detailData: dataParser(res.data.data),
                    detailTable: tableParser(res.data.table),
                    detailCols: colParser(res.data.cols)
                }
            })
    }

}