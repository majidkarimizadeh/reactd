import React, { Component } from 'react'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'

export default class DialogComponent extends Component {

	render() {

		const {
            onHideAlertDialog,
            mode,
            onSubmit,
            onCancel,
        } = this.props

        let header = <div></div>
        let footer = <div></div>
        let className = ''
        let content = ''

        if(mode === 'delete') 
        {
        	header = 'حذف ؟'
        	footer = <div>
                <Button 
                    label='لغو' 
                    className='p-button-secondary' 
                    icon='pi pi-times' 
                    onClick={onCancel} 
                />
			    <Button 
                    label='بله' 
                    className='p-button-danger' 
                    icon='pi pi-check'
                    onClick={() => {onSubmit(mode)}}
                />
			</div>
            className = 'p-dialog-titlebar-danger'
            content = 'آیا مطمئن هستید ؟'
        }


		return (
			<Dialog 
                header={header}
                footer={footer}
                visible={mode ? true : false} 
                rtl={true} 
                modal={true} 
                onHide={() => onHideAlertDialog()}
                width='25%'
                className={className}
            >
            	<h3>
                    {content}
                </h3>
            </Dialog>
		)
	}
}