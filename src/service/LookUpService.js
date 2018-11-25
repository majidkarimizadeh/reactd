import axios from 'axios';

export class LookUpService {

    getLookUpByRdf(rdf) {
    	let apiObject = new FormData()
        apiObject.append('rdf', rdf)

        return axios.post('http://localhost:8000/api/look-up', apiObject)
                .then(res => res.data);
    }
}