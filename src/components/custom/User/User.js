import React from 'react'
import UserComponent from './UserComponent'
import { Button } from 'primereact/button'

export default function userToolbar(dispatch, state, growl) 
{
	return <Button 
		onClick={() => onClick(dispatch, state, growl)}
		icon="fa fa-lock" 
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
			customComponent: 
				<UserComponent 
					{...state} 
					dispatch={dispatch}
					growl={growl}
				/>
		})
	}
}