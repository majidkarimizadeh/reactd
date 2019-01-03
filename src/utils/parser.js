import React from 'react'
import { SITE_URL } from '../utils/config'
import * as JalaliMoment from 'moment-jalaali'
import moment from 'moment'

export function userParser(user) {
	return {
		name: (user && user.full_name) ? user.full_name : 'Welcome',
		img: (user && user.img) ? `${SITE_URL}/${user.img}` : false
	}
}

export function colParser(cols) {
	if(!cols) return [];
	return JSON.parse(cols);
}

export function detailParser(details) {
	if(!details) return [];

	let standardDetail = [];
	for (var i = 0; i < details.length; i++) {
		standardDetail.push(JSON.parse(details[i]))
	}
	return standardDetail
}

export function tableParser(table) {
	if(!table) return {}
	return JSON.parse(table)
}

export function dataParser(data) {
	if(!data) return []
	return data
}

export function lookupParser(lookups) {
	if(!lookups) return []
	return lookups
}

export function imageParser(record, field, isShow = true) {

	if(field.nme && record[field.nme] && isShow)
	{
		if(record[field.nme] == 'jpeg' || record[field.nme] == 'jpg' || record[field.nme] == 'png') 
		{
			return SITE_URL + "/images/profiles/" + record.id + "/p." + record[field.nme]
		}
		else
		{
			return SITE_URL + "/" + record[field.nme]
		}
	}
	return 'http://destription.com/images/favicon.png';
}

export function getJalDateByGreDate(date, hasTime = false) {
	if(!date) {
		return date
	}
	let format = 'jYYYY-jMM-jDD';
	if(hasTime) {
		format += ' HH:mm:ss'
	}
	return JalaliMoment(date).format(format)
}

export function getGreDateByTimestamp(timestamp, hasTime = false) {
	let format = 'YYYY-MM-DD';
	if(hasTime) {
		format += ' HH:mm:ss'
	}
	return moment(timestamp * 1000).format(format)
}

export function getGreDateByGMT(gmt) {
	return moment(gmt).format('YYYY-MM-DD HH:mm:ss')
}

export function getGMTByGreDate(date) {
	if(!date) {
		return date	
	}
	return moment(date).toDate()
}

export function getFormatedGreDate(date, hasTime = false) {
	let format = 'YYYY-MM-DD';
	if(hasTime) {
		format += ' HH:mm:ss'
	}
	return moment(date).format(format);
}

export function boolParser(value) {
	if(value) 
	{
        return <i className="pi pi-check" style={{color:'green', verticalAlign:'middle'}}/>
    } 
    else 
    {
        return <i className="pi pi-times" style={{color:'red', verticalAlign:'middle'}}/>
    }
}


export function validationErrorParser(errors) {
	let errorMessages = []
	if(Array.isArray(errors))
	{
		errors.forEach( error => {
			let errorMessage = validationErrorParser(error)
			errorMessages.push(errorMessage)
		})
	}
	else if(typeof errors === 'object' && errors !== null)
	{
		Object.keys(errors).forEach( errorKey => {
			let errorMessage = validationErrorParser(errors[errorKey])
			errorMessages.push(errorMessage)
		})
	}
	else if(typeof errors === 'string') 
	{		
		errorMessages.push(<p key={errors}>{errors}</p>)
	}
	return errorMessages
}


export function roleParser(roles) {
	let roleObjects = []
	let tableName = null;
	for (var i = 0; i < roles.length; i++) {
		let meta_value = JSON.parse(roles[i].meta_value);
		if(meta_value.table == undefined) 
		{
			tableName = i;
			roleObjects[tableName] = {
				key: i,
				label: meta_value.lbl,
				data: 'data ' + i,
				icon: 'pi pi-fw pi-lock',
				children: [],
			}
		}
		// else 
		// {
		// 	if(tableName === 0 || tableName) {
		// 		roleObjects[tableName].children.push({
		// 			key: i,
		// 			label: meta_value.label,
		// 			data: 'data ' + i,
		// 			icon: 'pi pi-fw pi-lock',
		// 		})
		// 	}
		// }
	}
	return roleObjects
}

export function geoPointParser(str) {
	if(str.indexOf('_') !== -1) {
		return str.split('_')
	} else {
		return null
	}
}

export function geoPointToStringParser(point) {
	return point.lat.toString() + '_' + point.lng.toString();
}


export function stripTag(text) {
	const regex = /(<([^>]+)>)/ig
	if(text) 
	{
		return text.replace(regex, '')
	} 
	return ''
}