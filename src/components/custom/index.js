import React from 'react'
import { Button } from 'primereact/button'
import { rowCustoms, tableCustoms, customModes } from './custom'

// Row Custom
export function getRowCustom(key, ...rest) 
{
	if (key in rowCustoms) 
	{
		const customs = rowCustoms[key];
		return customs.map( (custom, i) => {
			return <Button 
				key={i}
				onClick={() => onRowCustomClick(custom, ...rest)}
				label={custom.label}
				icon={custom.icon}
				className="p-button-secondary toolbar-btn"
			/>
		}) 
	}
	return []
}
function onRowCustomClick(custom, selectedRow, $this) 
{	
	const { isSelect, row } = $this.state;
	if(selectedRow) {
		$this.onSelectionChange(selectedRow, false)
	}
	else if(!isSelect) 
	{
		$this.growl.show({
            severity: 'warn',
            summary: 'Not found',
            detail: 'no record selected'
        })
        return
	} 
	$this.onCustomChange({
		mode: 'custom',
		customComponent: 
			<custom.component
				{...$this}
				{...$this.state} 
				row={selectedRow ? selectedRow : row}
				dispatch={$this.onCustomChange}
			/>
	})
}

// Table Custom
export function getTableCustom(key, ...rest)
{
	if (key in tableCustoms) 
	{
		const customs = tableCustoms[key];
		return customs.map( (custom, i) => {
			return <Button 
				key={i}
				onClick={() => onTableCustomClick(custom, ...rest)}
				label={custom.label}
				icon={custom.icon}
				className="p-button-secondary toolbar-btn"
			/>
		}) 
	}
	return []
}
function onTableCustomClick(custom, $this) 
{	
	$this.onCustomChange({
		mode: 'custom',
		customComponent: 
			<custom.component
				{...$this}
				{...$this.state}
				dispatch={$this.onCustomChange}
			/>
	})
}

// Mode Custom
export function getCustomMode(key, selectedRow, mode, $this) 
{
	if (key in customModes) 
	{
		const custom = customModes[key]
		const CustomComponent = custom[mode]
		if(CustomComponent) {
			$this.onCustomChange({
				mode: 'custom',
				customComponent: 
					<CustomComponent
						{...$this}
						{...$this.state}
						dispatch={$this.onCustomChange}
					/>
			})
		}
	}
	return null
}