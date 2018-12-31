import React from 'react'
import roleToolbar from './Role/Role'
import userToolbar from './User/User'
import tourTypeToolbar from './TourType/TourType'
import createTourForm from './Tour/Tour'
import { Button } from 'primereact/button'

const customs = {
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

export function getCustomFun(key) 
{
	if (key in customs) 
	{
		return customs[key]
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