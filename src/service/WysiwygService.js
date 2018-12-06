import axios from 'axios';
import Service from './Service'
import { WYSIWYG_REMOVE_URL } from '../utils/config'

export class WysiwygService {

    removeFile(name) {
    	let apiObject = new FormData()
    	apiObject.append('name', name)
    	Service.setToken(apiObject)
        return axios.post(WYSIWYG_REMOVE_URL, apiObject)
    }
}