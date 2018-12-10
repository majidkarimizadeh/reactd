import { LIKE } from './config'

export default class QueryBuilder {

	getCondition(filter)
    {
        let cluse = new Array()
        let where = []
        Object.keys(filter).forEach((key) => {
            if( filter[key] ) 
            {
                cluse.push({
                    key: key,
                    op: LIKE,
                    value: filter[key]
                })
            }
        })
        if(cluse.length != 0) 
        {
            where = [{
                logic: 'AND',
                cluse: cluse
            }]
        }
        return where
    }
}