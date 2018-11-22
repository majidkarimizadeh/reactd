import axios from 'axios';
import history from '../history'
import { dataParser, columnParser, tableParser, lookupParser, detailParser } from '../parser/parser'
export class TableService {
    
    getAllTableData(tableName) {
        return axios.get('http://localhost:8000/api/index/' + tableName)
                .then(res => {
                    return {
                        data: dataParser(res.data.data),
                        attr: res.data.attr,
                        table: tableParser(res.data.table),
                    }    
                });
    }

    getAllDataColumn(tableName) {
        return axios.get('http://localhost:8000/api/index/data-column/' + tableName)
                .then(res => {
                    return {
                        data: dataParser(res.data.data),
                        table: tableParser(res.data.table),
                        columns: columnParser(res.data.columns)
                    }    
                });
    }

    getAllDetailData(details) {
        let apiObject = {
            details: details
        }
        return axios.post('http://localhost:8000/api/details', apiObject)
            .then( res => {
                return {
                    details: detailParser(res.data.details),
                    detailData: dataParser(res.data.data),
                    detailTable: tableParser(res.data.table),
                    detailColumns: columnParser(res.data.columns)
                }
            })
    }

}