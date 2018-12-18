import axios from 'axios';
import Service from './Service'
import { API_URL } from '../utils/config'

export class LookUpService {

    getLookUpByRdf(apiObject) {
        Service.setToken(apiObject)
        return axios.post(`${API_URL}/look-up`, apiObject)
                .then(res => res.data);
    }
}