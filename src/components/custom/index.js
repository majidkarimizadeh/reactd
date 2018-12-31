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
export function getRowCustom(key) 
{
	if (key in rowCustoms) 
	{
		return rowCustoms[key]
	}
	return []
}

const tableCustoms = {}
export function getTableCustom(key)
{
	if (key in tableCustoms) 
	{
		return tableCustoms[key]
	}
	return []
}


const customModes = {
	tours: (...rest) => createTourForm(...rest),
}
export function getCustomMode(key, ...rest) 
{
	if (key in customModes) 
	{
		const customsFormFunction = customModes[key]
		return customsFormFunction(...rest)
	}
	return null
}