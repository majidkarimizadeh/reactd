import axios from 'axios';
import { WYSIWYG_REMOVE_URL } from '../config'

export class WysiwygService {

    removeFile(name) {
    	let apiObject = new FormData()
    	apiObject.append('name', name)
        return axios.post(WYSIWYG_REMOVE_URL, apiObject)
    }
}