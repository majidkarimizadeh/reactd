import React, {Component} from 'react';
import SelectComponent from './SelectComponent'
import TextEditComponent from './TextEditComponent'
import LongTextEditComponent from './LongTextEditComponent'
import PasswordEditComponent from './PasswordEditComponent'
import ImageComponent from './ImageComponent'

import {TabView,TabPanel} from 'primereact/tabview';
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
            mode,
            onSubmit,
            onChange,
            onLookUp,
            options

        } = this.props

        let modeFields = [];
        let imagesFields = [];
        if(mode) { modeFields = table[mode] }

        const footer = <div style={{textAlign:'left'}}>
            <Button label="Close" onClick={() => onHideDialog()} className="p-button-default p-button-raised" />
            {mode !== 'view' &&
                <Button onClick={(e) => onSubmit(mode)} label="Success" className="p-button-success p-button-raised" />
            }
        </div>

		return (
			<Dialog 
                header={label}
                footer={footer}
                visible={mode ? true : false} 
                rtl={true} 
                maximizable={true}
                modal={true} 
                width="75%"
                onHide={() => onHideDialog()}
            >
                <TabView>
                    <TabPanel 
                        header="Information"
                        headerStyle={{float:'right', margin:'0px 0px 0px 2px', top:'0px'}}
                    >
                    <div className="p-grid">
                        {!!modeFields && modeFields.map( (item, i) => {
                            let column = columns.find(function(c) {
                                return c.no === item;
                            });

                            switch(column.controller) 
                            {
                                case 'lookup':
                                    return ( <SelectComponent 
                                        index={i}
                                        key={i}
                                        options={options}
                                        readOnly={mode === 'view'}
                                        value={record[column.name]}
                                        name={column.name}
                                        label={column.label}
                                        placeholder={column.label}
                                        onChange={onChange}
                                        onMouseDown={() => {onLookUp(column.rdf)}}
                                    /> )
                                    break;

                                case 'password':
                                    return ( <PasswordEditComponent 
                                        index={i}
                                        key={i}
                                        value={record[column.name]}
                                        name={column.name}
                                        label={column.label}                                    
                                        placeholder={column.label}
                                        onChange={onChange}
                                    /> )
                                    break;

                                case 'image':
                                    {imagesFields.push(column)}
                                    break;

                                case 'number':
                                    return ( <TextEditComponent 
                                        index={i}
                                        key={i}
                                        readOnly={mode === 'view'}
                                        value={record[column.name]}
                                        name={column.name}
                                        label={column.label}
                                        type='number'
                                        placeholder={column.label}
                                        onChange={onChange}
                                    /> )
                                    break;

                                case 'text_edit':
                                    return ( <TextEditComponent 
                                        index={i}
                                        key={i}
                                        readOnly={mode === 'view'}
                                        value={record[column.name]}
                                        name={column.name}
                                        label={column.label}
                                        placeholder={column.label}
                                        onChange={onChange}
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
                                        onChange={onChange}
                                    />)
                                    break;
                            }

                        })}
                    </div>
                    </TabPanel>

                    {!!imagesFields && imagesFields.map( (image, i) => {
                        return (
                            <TabPanel
                                header={image.label}
                                headerStyle={{float:'right', margin:'0px 0px 0px 2px', top:'0px'}}
                            >
                                <ImageComponent
                                    index={i}
                                    key={i}
                                    value={record[image.name]}
                                    name={image.name}
                                    label={image.label}
                                    placeholder={image.label}
                                    onChange={onChange}
                                />
                            </TabPanel>
                        )
                    })}

                </TabView>
            </Dialog>
		)
	}
}