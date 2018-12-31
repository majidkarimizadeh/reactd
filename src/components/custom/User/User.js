import React from 'react'
import UserComponent from './UserComponent'
import { Button } from 'primereact/button'

export default function userToolbar(...rest) 
{
	return <Button 
		onClick={() => onClick(...rest)}
		icon="fa fa-lock" 
		className="p-button-secondary toolbar-btn"
	/>
}

function onClick(selectedRow, $this) 
{
	const { isSelect, row } = $this.state;
	if(selectedRow) {
		$this.onSelectionChange(selectedRow, false)
	}
	else if( !isSelect ) 
	{
		$this.growl.show({
            severity: 'warn',
            summary: 'سطر انتخاب نشده است',
            detail: 'لطفا ابتدا سطر مورد نظر خود را انتخاب کنید'
        })
        return
	}
	
	$this.onCustomChange({
		mode: 'custom',
		customComponent: 
			<UserComponent 
				{...$this.state} 
				row={selectedRow ? selectedRow : row}
				dispatch={$this.onCustomChange}
			/>
	})
}