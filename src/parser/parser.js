import React from 'react'
import { SITE_URL } from '../config'
import * as JalaliMoment from 'moment-jalaali'
import moment from 'moment'

export function colParser(cols) {
	if(!cols) return [];

	let standardCols = [];
	for (var i = 0; i < cols.length; i++) {
		standardCols.push(JSON.parse(cols[i]))
	}
	return standardCols
}

export function detailParser(details) {
	if(!details) return [];

	let standardDetail = [];
	for (var i = 0; i < details.length; i++) {
		standardDetail.push(JSON.parse(details[i]))
	}
	return standardDetail
}

export function menuParser(menu) {
	if(!menu) return {}
	return JSON.parse(menu)
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
	let format = 'jYYYY/jM/jD';
	if(hasTime) {
		format += ' HH:mm:ss'
	}
	return JalaliMoment(date).format(format)
}

export function getGreDateByTimestamp(timestamp, hasTime = false) {
	let format = 'YYYY/M/D';
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
	let format = 'YYYY/M/D';
	if(hasTime) {
		format += ' HH:mm:ss'
	}
	return moment(date).format(format);
}

export function boolParser(value) {
	if(value) {
        return <i className="pi pi-check" style={{color:'green', verticalAlign:'middle'}}/>
    } else {
        return <i className="pi pi-times" style={{color:'red', verticalAlign:'middle'}}/>
    }
}