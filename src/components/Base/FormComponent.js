import React, { Component } from 'react'
import SelectComponent from './SelectComponent'
import TextEditComponent from './TextEditComponent'
import DatePickerComponent from './DatePickerComponent'
import LongTextEditComponent from './LongTextEditComponent'
import WysiwygComponent from './WysiwygComponent'
import PasswordEditComponent from './PasswordEditComponent'
import ImageComponent from './ImageComponent'
import BooleanComponent from './BooleanComponent'
import { imageParser } from '../../parser/parser'
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
                                            return ( <SelectComponent 
                                                index={i}
                                                key={i}
                                                options={options}
                                                readOnly={mode === 'view'}
                                                value={row[col.name]}
                                                name={col.name}
                                                label={col.label}
                                                required={required}
                                                placeholder={col.placeholder}
                                                onInputChange={onInputChange}
                                                onMouseDown={() => {onLookUp(col.rdf, col.name)}}
                                            /> )

                                        case 'password':
                                            return ( <PasswordEditComponent 
                                                index={i}
                                                key={i}
                                                value={row[col.name]}
                                                name={col.name}
                                                label={col.label}
                                                required={required}
                                                placeholder={col.placeholder}
                                                onInputChange={onInputChange}
                                            /> )

                                        case 'image':
                                            imagesFields.push(col)
                                            break

                                        case 'number':
                                            return ( <TextEditComponent 
                                                index={i}
                                                key={i}
                                                readOnly={mode === 'view'}
                                                value={row[col.name]}
                                                name={col.name}
                                                label={col.label}
                                                type='number'
                                                required={required}
                                                placeholder={col.placeholder}
                                                onInputChange={onInputChange}
                                            /> )

                                        case 'text_edit':
                                            return ( <TextEditComponent 
                                                index={i}
                                                key={i}
                                                readOnly={mode === 'view'}
                                                value={row[col.name]}
                                                name={col.name}
                                                required={required}
                                                label={col.label}
                                                placeholder={col.placeholder}
                                                onInputChange={onInputChange}
                                            /> )

                                        case 'long_text':
                                            return ( <LongTextEditComponent 
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
                                            return ( <BooleanComponent 
                                                index={i}
                                                key={i}
                                                readOnly={mode === 'view'}
                                                value={row[col.name]}
                                                name={col.name}
                                                label={col.label}
                                                required={required}
                                                placeholder={col.placeholder}
                                                onInputChange={onInputChange}
                                            />)

                                        case 'date':
                                            return ( <DatePickerComponent
                                                index={i}
                                                key={i}
                                                showTime={col.showTime}
                                                jalali={col.showJalali}
                                                readOnly={mode === 'view'}
                                                value={row[col.name]}
                                                name={col.name}
                                                required={required}
                                                label={col.label}
                                                placeholder={col.placeholder}
                                                onInputChange={onInputChange}
                                            />)
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