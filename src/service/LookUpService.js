import axios from 'axios';
import { API_URL } from '../utils/config'

export class LookUpService {

    getLookUpByRdf(rdf) {
    	let apiObject = new FormData()
        apiObject.append('rdf', rdf)

        return axios.post(`${API_URL}/look-up`, apiObject)
                .then(res => res.data);
    }
}