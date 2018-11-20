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
            table,
            visible,
            columns,
            onHideDialog,
            record,
            mode

        } = this.props

        let modeFields = [];
        if(mode) { modeFields = table[mode] }

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

                    {!!modeFields && modeFields.map( (item, i) => {
                        let column = columns.find(function(c) {
                            return c.no === item;
                        });

                        switch(column.controller) 
                        {
                            case 'text_edit':
                                return ( <TextEditComponent 
                                    index={i}
                                    key={i}
                                    readOnly={mode === 'view'}
                                    value={record[column.name]}
                                    name={column.name}
                                    label={column.label}
                                    placeholder={column.label}
                                    onChange={e => this.onTextChange(e)}
                                /> )
                                break;

                            case 'long_text':
                                return ( <LongTextEditComponent 
                                    index={i}
                                    key={i}
                                    readOnly={mode === 'view'}
                                    value={record[column.name]}
                                    name={column.name}
                                    label={column.label}
                                    placeholder={column.label}
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