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
        let className = ""
        if(mode === 'delete') {
        	header = (
        		"حذف ؟"
        	)
        	footer = (
			    <div>
			        <Button label="بله" className="p-button-danger" icon="pi pi-check" onClick={() => {onSubmit(mode)}} />
			        <Button label="لغو" className="p-button-secondary" icon="pi pi-times" onClick={onCancel} />
			    </div>
			);
            className = "p-dialog-titlebar-danger"
        }


		return (
			<Dialog 
                header={header}
                footer={footer}
                visible={mode ? true : false} 
                rtl={true} 
                modal={true} 
                onHide={() => onHideAlertDialog()}
                width="25%"
                className={className}
            >
            	<h3>
                    آیا مطمئن هستید ؟
                </h3>
            </Dialog>
		)
	}
}