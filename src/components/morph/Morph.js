import React from 'react'
import MorphComponent from './MorphComponent'
import { Button } from 'primereact/button'

export default function morph(morphKey, dispatch, state, growl) 
{
	return <Button 
		key={morphKey}
		onClick={ () => onClick(morphKey, dispatch, state, growl)}
		label={morphKey}
		className='p-button-secondary morph-btn'
	/>
}

function onClick(morphKey, dispatch, state, growl) 
{
	const { isSelect } = state;
	if( !isSelect ) 
	{
		growl.show({
            severity: 'warn',
            summary: 'سطر انتخاب نشده است',
            detail: 'لطفا ابتدا سطر مورد نظر خود را انتخاب کنید'
        })
	}
	else 
	{
		dispatch({
			mode: 'custom',
			customComponent: 
				<MorphComponent 
					{...state} 
					morphKey={morphKey}
					dispatch={dispatch}
					growl={growl}
				/>
		})
	}
}