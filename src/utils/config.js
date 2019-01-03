export const SITE_URL = 'http://localhost:8000'
//export const SITE_URL = 'http://192.168.2.26:8000'
export const API_URL = SITE_URL + '/api/v1'

export const WYSIWYG_UPLOAD_URL = API_URL + '/wysiwyg-update'
export const WYSIWYG_REMOVE_URL = API_URL + '/wysiwyg-destroy'

export const LIKE = ' LIKE ';
export const EQ = ' = ';

export const MAP_API_KEY = 'AIzaSyDC5TPGY4g0QPjEIixs0-9CmM2ithq9rZA'
export const MAP_API = 'https://maps.googleapis.com/maps/api/js?key=' + MAP_API_KEY

export const MAP_CENTER = {
    center: {
    	lat: 35.68995,
    	lng: 51.40976
   	},
    zoom: 14
}

export const LANGUAGES = [
    { label: 'فارسی', value: 'fa' },
    { label: 'انگلیسی', value: 'en' },
    { label: 'چینی', value: 'ch' },
]

export const DEFAULT_LANGUAGE = 'fa'

export const CUSTOM_MODES = [
	'cc', // custom create component
	'cv', // custom view component
	'ce', // custom edit component
	'cd', // custom delete component
];