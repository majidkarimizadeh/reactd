import { LIKE, EQ } from './config'

export default class QueryBuilder {

	getCondition(filter)
    {
        let cluse = []
        let where = []
        Object.keys(filter).forEach((key) => {            
            if( filter[key] !== '') 
            {
                cluse.push({
                    key: key,
                    op: typeof filter[key] === 'number' ? EQ : LIKE,
                    value: filter[key]
                })
            }
        })
        if(cluse.length !== 0) 
        {
            where = [{
                logic: 'AND',
                cluse: cluse
            }]
        }
        return where
    }
}