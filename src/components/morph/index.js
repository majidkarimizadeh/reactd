import React from 'react'
import morph from './Morph'
import GalleryComponent from './GalleryComponent'
import { Button } from 'primereact/button'

const morphs = {
	galleries: [
		'countries',
		'tourism_areas'
	],
}
const morphOptions = {
	galleries: {
		name: 'galleries',
		label: '',
		icon: 'fa fa-image',
		component: GalleryComponent
	}
}

export function getRowMorph(key, ...rest) 
{
	console.log(key, rest)
	let morphEntity = [];
	Object.keys(morphs).forEach( morphKey => 
	{
		if (morphs[morphKey].includes(key)) 
		{
			morphEntity.push(
				morph(morphOptions[morphKey], ...rest)
			)
		}
	}) 
	return morphEntity
}