import axios from 'axios';
import Service from './Service'
import { API_URL } from '../utils/config'

export class LookUpService {

    getLookUpByRdf(rdf) {
    	let apiObject = new FormData()
        apiObject.append('rdf', rdf)
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/look-up`, apiObject)
                .then(res => res.data);
    }
}