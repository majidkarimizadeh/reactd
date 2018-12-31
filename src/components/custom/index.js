import React from 'react'
import roleToolbar from './Role/Role'
import userToolbar from './User/User'
import tourTypeToolbar from './TourType/TourType'
import createTourForm from './Tour/Tour'
import { Button } from 'primereact/button'

const rowCustoms = {
	roles: [
		(...rest) => roleToolbar(...rest),
	],
	users: [
		(...rest) => userToolbar(...rest),
	],
	tour_types: [
		(...rest) => tourTypeToolbar(...rest),
	],
}

const tableCustoms = {}

export function getRowCustom(key) 
{
	if (key in rowCustoms) 
	{
		return rowCustoms[key]
	}
	return []
}

export function getTableCustom(key)
{
	if (key in tableCustoms) 
	{
		return tableCustoms[key]
	}
	return []
}


const customForms = {
	tours: (...rest) => createTourForm(...rest),
}
export function getCustomForm(table, ...rest) 
{
	let key = table.nme 
	if (key in customForms) 
	{
		const customsFormFunction = customForms[key]
		return customsFormFunction(...rest)
	}
	return null
}