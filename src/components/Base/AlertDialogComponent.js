import React, {Component} from 'react';
import TextEditComponent from './TextEditComponent'
import LongTextEditComponent from './LongTextEditComponent'
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';

export default class DataFormComponent extends Component {

	constructor(props) {
        super(props)
    }

	render() {

		const {

            onHideAlertDialog,
            mode,
            onSubmit,
            onCancel,

        } = this.props

        let header = <div></div>
        let footer = <div></div>
        if(mode === 'delete') {
        	header = (
        		"Delete"
        	)
        	footer = (
			    <div>
			        <Button label="Delete" icon="pi pi-check" onClick={() => {onSubmit(mode)}} />
			        <Button label="Cancel" icon="pi pi-times" onClick={onCancel} />
			    </div>
			);
        }


		return (
			<Dialog 
                header={header}
                footer={footer}
                visible={mode ? true : false} 
                rtl={true} 
                modal={true} 
                onHide={() => onHideAlertDialog()}
            >
            	Are you sure?
            </Dialog>
		)
	}
}