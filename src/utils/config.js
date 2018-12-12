// export const SITE_URL = 'http://localhost:8000/'
export const SITE_URL = 'http://192.168.2.26:8000'
export const API_URL = SITE_URL + '/api'

export const WYSIWYG_UPLOAD_URL = API_URL + '/wysiwyg/upload'
export const WYSIWYG_REMOVE_URL = API_URL + '/wysiwyg/delete'

export const LIKE = 'LIKE';
export const EQ = '=';
export const GT = 3;
export const LT = 4;
export const GTE = 5;
export const LTE = 6;

export const MAP_API_KEY = 'AIzaSyDC5TPGY4g0QPjEIixs0-9CmM2ithq9rZA'
export const MAP_API = 'https://maps.googleapis.com/maps/api/js?key=' + MAP_API_KEY

export const MAP_CENTER = {
    center: {
    	lat: 35.68995,
    	lng: 51.40976
   	},
    zoom: 14
}