import React, {Component} from 'react';
import {Toolbar} from 'primereact/toolbar';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';

export default class DataToolBarComponent extends Component {

	constructor(props) {
        super(props)
    }

	render() {

		const { onShowDialog, onShowAlertDialog } = this.props

		return (
			<Toolbar className="custom-toolbar">
                <div className="p-toolbar-group-right">
                    <Button onClick={() => onShowAlertDialog('delete')} label="Delete" icon="pi pi-trash" className="p-button-secondary" />
                    <Button onClick={() => onShowDialog('view')} label="View" icon="pi pi-check" className="p-button-secondary" />
                    <Button onClick={() => onShowDialog('edit')} label="Edit" icon="pi pi-pencil" className="p-button-secondary" />
                    <Button onClick={() => onShowDialog('create')} label="New" icon="pi pi-plus" className="p-button-secondary"/>
                </div>
                <div className="p-toolbar-group-left">
                    <Button icon="pi pi-search" className="p-button-secondary"/>
                </div>
            </Toolbar>
		)
	}
}