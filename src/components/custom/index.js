import React from 'react'
import roleToolbar from './Role/Role'
import { Button } from 'primereact/button'

const customs = {
	roles: (...rest) => roleToolbar(...rest),
}

export function hasCustomFun(key, ...rest) 
{
	if (key in customs) 
	{
		const customsFunction = customs[key]
		return customsFunction(...rest)
	}
	return null
}