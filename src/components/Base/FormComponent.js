import React, {Component} from 'react';
import { imageParser } from '../../parser/parser'

import SelectComponent from './SelectComponent'
import TextEditComponent from './TextEditComponent'
import DatePickerComponent from './DatePickerComponent'
import LongTextEditComponent from './LongTextEditComponent'
import PasswordEditComponent from './PasswordEditComponent'
import ImageComponent from './ImageComponent'
import BooleanComponent from './BooleanComponent'

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
            
            onSwitchChange,
            onSelectFile,
            onCropRevert,
            onClearFile,
            onImageLoaded,
            onCropChange,
            onCropComplete,
            baseSrc,
            src,
            crop,
            onDateChange,

        } = this.props

        let modeFields = [];
        let imagesFields = [];
        if(mode) { modeFields = table[mode] }

        const footer = <div className="p-col-12 form-footer">
            <Button label="لغو" onClick={() => onHideDialog()} className="p-button-secondary" />
            {mode !== 'view' &&
                <Button onClick={(e) => onSubmit(mode)} label="اعمال" className="p-button-success p-button-raised" />
            }
        </div>

		return (
            <div className="p-col-12">
                <div className="card card-w-title">
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

                                    case 'boolean':
                                        return ( <BooleanComponent 
                                            index={i}
                                            key={i}
                                            readOnly={mode === 'view'}
                                            value={row[col.name]}
                                            name={col.name}
                                            label={col.label}
                                            placeholder={col.label}
                                            onChange={onSwitchChange}
                                        />)
                                        break;

                                    case 'date':
                                        return ( <DatePickerComponent
                                            index={i}
                                            key={i}
                                            showTime={col.showTime}
                                            jalali={col.showJalali}
                                            readOnly={mode === 'view'}
                                            value={row[col.name]}
                                            name={col.name}
                                            label={col.label}
                                            placeholder={col.label}
                                            onChange={onDateChange}
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
                                            baseSrc={baseSrc}
                                            src={src}
                                            crop={crop}
                                            onSelectFile={onSelectFile}
                                            onCropRevert={onCropRevert}
                                            onClearFile={onClearFile}
                                            onImageLoaded={onImageLoaded}
                                            onCropChange={onCropChange}
                                            onCropComplete={onCropComplete}
                                        />
                                    </div>
                                </TabPanel>
                            )
                        })}
                    </TabView>
                    {footer}
                </div>
            </div>
		)
	}
}