import React, {Component} from 'react';
import { imageParser } from '../../parser/parser'
import SelectComponent from './SelectComponent'
import TextEditComponent from './TextEditComponent'
import LongTextEditComponent from './LongTextEditComponent'
import PasswordEditComponent from './PasswordEditComponent'
import ImageComponent from './ImageComponent'

import {TabView,TabPanel} from 'primereact/tabview';
import {Button} from 'primereact/button';
import {Dialog} from 'primereact/dialog';

export default class FormComponent extends Component {

	constructor(props) {
        super(props)
    }

	render() {

		const {

            label,
            table,
            visible,
            cols,
            onHideDialog,
            row,
            mode,
            onSubmit,
            onChange,
            onInputFileChange,
            cropWindowVisibles,
            onLookUp,
            options,
            imageUrls,

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
                            let col = cols.find(function(c) {
                                return c.no === item;
                            });

                            switch(col.controller) 
                            {
                                case 'lookup':
                                    return ( <SelectComponent 
                                        index={i}
                                        key={i}
                                        options={options}
                                        readOnly={mode === 'view'}
                                        value={row[col.name]}
                                        name={col.name}
                                        label={col.label}
                                        placeholder={col.label}
                                        onChange={onChange}
                                        onMouseDown={() => {onLookUp(col.rdf)}}
                                    /> )
                                    break;

                                case 'password':
                                    return ( <PasswordEditComponent 
                                        index={i}
                                        key={i}
                                        value={row[col.name]}
                                        name={col.name}
                                        label={col.label}                                    
                                        placeholder={col.label}
                                        onChange={onChange}
                                    /> )
                                    break;

                                case 'image':
                                    {imagesFields.push(col)}
                                    break;

                                case 'number':
                                    return ( <TextEditComponent 
                                        index={i}
                                        key={i}
                                        readOnly={mode === 'view'}
                                        value={row[col.name]}
                                        name={col.name}
                                        label={col.label}
                                        type='number'
                                        placeholder={col.label}
                                        onChange={onChange}
                                    /> )
                                    break;

                                case 'text_edit':
                                    return ( <TextEditComponent 
                                        index={i}
                                        key={i}
                                        readOnly={mode === 'view'}
                                        value={row[col.name]}
                                        name={col.name}
                                        label={col.label}
                                        placeholder={col.label}
                                        onChange={onChange}
                                    /> )
                                    break;

                                case 'long_text':
                                    return ( <LongTextEditComponent 
                                        index={i}
                                        key={i}
                                        readOnly={mode === 'view'}
                                        value={row[col.name]}
                                        name={col.name}
                                        label={col.label}
                                        placeholder={col.label}
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
                                key={i}
                                header={image.label}
                                headerStyle={{float:'right', margin:'0px 0px 0px 2px', top:'0px'}}
                            >
                                <div className="p-grid">
                                    <ImageComponent
                                        index={i}
                                        key={i}
                                        value={imageParser(row, image)}
                                        name={image.name}
                                        label={image.label}
                                        placeholder={image.label}
                                        onInputFileChange={onInputFileChange}
                                        imageUrls={imageUrls}
                                        cropWindowVisibles={cropWindowVisibles}
                                    />
                                </div>
                            </TabPanel>
                        )
                    })}

                </TabView>
            </Dialog>
		)
	}
}