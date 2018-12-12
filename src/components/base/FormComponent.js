import React, { Component } from 'react'
import TreeComponent from './TreeComponent'
import SelectComponent from './SelectComponent'
import TextComponent from './TextComponent'
import DatePickerComponent from './DatePickerComponent'
import TextAreaComponent from './TextAreaComponent'
import WysiwygComponent from './WysiwygComponent'
import PasswordComponent from './PasswordComponent'
import ImageComponent from './ImageComponent'
import SwitchComponent from './SwitchComponent'
import GeoPointComponent from './GeoPointComponent'
import { imageParser } from '../../utils/parser'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'

export default class FormComponent extends Component {

	render() {

		const {
            table,
            cols,
            onHideDialog,
            row,
            mode,
            onSubmit,
            onInputChange,
            onLookUp,
            options,
            onSelectFile,
            onCropRevert,
            onClearFile,
            onImageLoaded,
            onCropChange,
            onCropComplete,
            baseSrc,
            src,
            crop,
        } = this.props

        let modeFields = []
        let imagesFields = []
        if(mode) { modeFields = table[mode] }

        const footer = <div className='p-col-12 form-footer'>
            <Button 
                label='لغو' 
                onClick={() => onHideDialog()}
                className='p-button-secondary' 
            />
            {mode !== 'view' &&
                <Button 
                    onClick={(e) => onSubmit(mode)} 
                    label='اعمال' 
                    className='p-button-success p-button-raised' 
                />
            }
        </div>

		return (
            <div className='p-col-12'>
                <div className='card card-w-title'>
                    <div className="card-heading">
                        <div className="card-heading-actions">
                        </div>
                        <h1 className="card-heading-caption">{table.label}</h1>
                    </div>
                    <TabView>
                        <TabPanel header='اطلاعات'>
                            <div className='p-grid' style={{direction:'rtl'}}>
                                {!!modeFields && modeFields.map( (item, i) => {
                                    let col = cols.find(function(c) {
                                        return c.no === item
                                    })
                                    let required = (('valid' in col) && ('required' in col.valid));
                                    switch(col.controller) 
                                    {
                                        case 'lookup':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <SelectComponent 
                                                    index={i}
                                                    options={options}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.name]}
                                                    name={col.name}
                                                    label={col.label}
                                                    required={required}
                                                    placeholder={col.placeholder}
                                                    onInputChange={onInputChange}
                                                    onMouseDown={() => {onLookUp(col.rdf, col.name)}}
                                                /> 
                                            </div>)

                                        case 'password':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <PasswordComponent 
                                                    index={i}
                                                    value={row[col.name]}
                                                    readOnly={mode === 'view'}
                                                    name={col.name}
                                                    label={col.label}
                                                    required={required}
                                                    placeholder={col.placeholder}
                                                    onInputChange={onInputChange}
                                                /> 
                                            </div>)

                                        case 'image':
                                            imagesFields.push(col)
                                            break

                                        case 'number':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <TextComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.name]}
                                                    name={col.name}
                                                    label={col.label}
                                                    type='number'
                                                    required={required}
                                                    placeholder={col.placeholder}
                                                    onInputChange={onInputChange}
                                                /> 
                                            </div>)

                                        case 'geopoint':
                                            return ( <div key={i} className='p-col-12 p-md-12'>
                                                <GeoPointComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.name]}
                                                    name={col.name}
                                                    label={col.label}
                                                    required={required}
                                                    onInputChange={onInputChange}
                                                /> 
                                            </div>)

                                        case 'text_edit':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <TextComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.name]}
                                                    name={col.name}
                                                    required={required}
                                                    label={col.label}
                                                    placeholder={col.placeholder}
                                                    onInputChange={onInputChange}
                                                /> 
                                            </div>)

                                        case 'long_text':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <TextAreaComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.name]}
                                                    name={col.name}
                                                    required={required}
                                                    label={col.label}
                                                    placeholder={col.placeholder}
                                                    onInputChange={onInputChange}
                                                />
                                            </div>)

                                        case 'wysiwyg':
                                            return ( <WysiwygComponent 
                                                index={i}
                                                key={i}
                                                readOnly={mode === 'view'}
                                                value={row[col.name]}
                                                name={col.name}
                                                required={required}
                                                label={col.label}
                                                placeholder={col.placeholder}
                                                onInputChange={onInputChange}
                                            />)
                                            
                                        case 'boolean':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <SwitchComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.name]}
                                                    name={col.name}
                                                    label={col.label}
                                                    required={required}
                                                    placeholder={col.placeholder}
                                                    onInputChange={onInputChange}
                                                />
                                            </div>)

                                        case 'date':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <DatePickerComponent
                                                    index={i}
                                                    showTime={col.showTime}
                                                    jalali={col.showJalali}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.name]}
                                                    name={col.name}
                                                    required={required}
                                                    label={col.label}
                                                    placeholder={col.placeholder}
                                                    onInputChange={onInputChange}
                                                />
                                            </div>)
                                        default:
                                    }

                                })}
                            </div>
                        </TabPanel>

                        {!!imagesFields && imagesFields.map( (image, i) => {
                            return (
                                <TabPanel key={i} header={image.label} >
                                    <div className='p-grid'>
                                        <ImageComponent
                                            index={i}
                                            key={i}
                                            value={imageParser(row, image)}
                                            name={image.name}
                                            label={image.label}
                                            readOnly={mode === 'view'}
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