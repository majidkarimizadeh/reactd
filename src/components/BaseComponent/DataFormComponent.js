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

            label,
            columns,
            visible,
            onHideDialog,
            record,
            mode

        } = this.props

		return (
			<Dialog 
                header={label}
                visible={mode ? true : false} 
                rtl={true} 
                maximizable={true}
                modal={true} 
                width="75%"
                onHide={() => onHideDialog(mode)}
            >
                <div className="p-grid p-fluid" style={{textAlign:'right'}}>

                    {columns.map( (item, index) => {
                        switch(JSON.parse(item.meta_value).controller) 
                        {
                            case 'text_edit':
                                return ( <TextEditComponent 
                                    index={index}
                                    key={index}
                                    readOnly={mode === 'view'}
                                    value={record[JSON.parse(item.meta_value).name]}
                                    name={JSON.parse(item.meta_value).name}
                                    label={JSON.parse(item.meta_value).label}
                                    placeholder={JSON.parse(item.meta_value).label}
                                    onChange={e => this.onTextChange(e)}
                                /> )
                                break;

                            case 'long_text':
                                return ( <LongTextEditComponent 
                                    index={index}
                                    key={index}
                                    readOnly={mode === 'view'}
                                    value={record[JSON.parse(item.meta_value).name]}
                                    name={JSON.parse(item.meta_value).name}
                                    label={JSON.parse(item.meta_value).label}
                                    placeholder={JSON.parse(item.meta_value).label}
                                    onChange={e => this.onTextChange(e)}
                                />)
                                break;
                        }
                    })}
                    
                    <div className="p-col-12 p-md-offset-10 p-md-2">
                        {mode !== 'view' &&
                            <Button label="Success" className="p-button-success p-button-raised" />
                        }
                        <Button label="Close" className="p-button-default p-button-raised" />
                    </div>
                </div>
            </Dialog>
		)
	}
}