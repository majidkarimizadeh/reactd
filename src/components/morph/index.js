import React from 'react'
import morph from './Morph'
import { Button } from 'primereact/button'

const morphs = {
	gallery: [
		'countries',
		'tourism_areas'
	],
	rate: [
		'countries',
		'tourism_areas'
	],
}

export function getMorph(key, ...rest) 
{
	let morphEntity = [];
	Object.keys(morphs).forEach( morphKey => 
	{
		if (morphs[morphKey].includes(key)) 
		{
			morphEntity.push(morph(morphKey, ...rest))
		}
	}) 
	return morphEntity
}