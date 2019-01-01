import React from 'react'
import { Button } from 'primereact/button'

export default function morph(morph, ...rest) 
{
	return <Button 
		key={morph.name}
		onClick={() => onClick(morph, ...rest)}
		label={morph.label}
		icon={morph.icon}
		className='p-button-secondary morph-btn'
	/>
}

function onClick(morph, selectedRow, $this) 
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
			<morph.component 
				{...$this} 
				{...$this.state} 
				morphKey={morph.name}
				dispatch={$this.onCustomChange}
			/>
	})
}