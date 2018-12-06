import React from 'react'
import { RoleComponent } from './RoleComponent'
import { Button } from 'primereact/button'

export default function roleToolbar(dispatch, state, growl) 
{
	return <Button 
		onClick={() => onClick(dispatch, state, growl)}
		icon="pi pi-bars" 
		className="p-button-secondary toolbar-btn"
	/>
}

function onClick(dispatch, state, growl) 
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
			customComponent: <RoleComponent {...state} dispatch={dispatch} />
		})
	}
}