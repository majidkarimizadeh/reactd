import React from 'react'
import { SITE_URL } from '../utils/config'
import * as JalaliMoment from 'moment-jalaali'
import moment from 'moment'

export function userParser(user) {
	return {
		name: (user && user.first_name && user.last_name) ? `${user.first_name} ${user.last_name}` : 'Welcome',
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

export function imageParser(record, field) {

	if(field.name && record[field.name])
	{
		if(record[field.name] == 'jpeg' || record[field.name] == 'jpg' || record[field.name] == 'png') 
		{
			return SITE_URL + "/images/profiles/" + record.id + "/p." + record[field.name]
		}
		else
		{
			return SITE_URL + "/" + record[field.name]
		}
	}
	return false;
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
	if(Array.isArray(errors)) 
	{
		let errorList = errors.map((item, index) => {
			return <li key={index}> {item} - </li>
		})
		return <ul>{errorList}</ul>
	}
	else
	{
		return <p>{errors}</p>
	}
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
				label: meta_value.label,
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
	const point = str.split('_')
	return [
		new window.google.maps.Marker({
       			position: {
	       			lat: point[0], lng: point[1]
       			}
       	})
	]
}

export function geoPointToStringParser(point) {
	return point.lat().toString() + '_' + point.lng().toString();
}