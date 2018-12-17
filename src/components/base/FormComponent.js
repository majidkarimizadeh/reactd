import React, { Component } from 'react'
import LanguageSelector from '../partial/LanguageSelector'
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
            isMapLoaded,
            onMapLoad,
            lang,
            onLanguageChange,
        } = this.props

        let modeFields = []
        let imagesFields = []

        if(mode == 'view') 
        { 
            modeFields = table.shw 
        }
        else if(mode == 'edit') 
        {
            modeFields = table.edt
        }
        else if(mode == 'create') 
        {
            modeFields = table.crt
        }

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
                            {table.trs && 
                                <LanguageSelector
                                    value={lang}
                                    refreshData={false}
                                    onLanguageChange={onLanguageChange}
                                />
                            }
                        </div>
                        <h1 className="card-heading-caption">{table.lbl}</h1>
                    </div>
                    <TabView>
                        <TabPanel header='اطلاعات'>
                            <div className='p-grid' style={{direction:'rtl'}}>
                                {!!modeFields && modeFields.map( (item, i) => {
                                    let col = cols.find(function(c) {
                                        return c.no === item
                                    })
                                    let required = (('vld' in col) && ('required' in col.vld));
                                    switch(col.cnt) 
                                    {
                                        case 'lku':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <SelectComponent 
                                                    index={i}
                                                    options={options}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={onInputChange}
                                                    onMouseDown={() => {onLookUp(col.rdf, col.nme)}}
                                                /> 
                                            </div>)

                                        case 'pas':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <PasswordComponent 
                                                    index={i}
                                                    value={row[col.nme]}
                                                    readOnly={mode === 'view'}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={onInputChange}
                                                /> 
                                            </div>)

                                        case 'img':
                                            imagesFields.push(col)
                                            break

                                        case 'num':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <TextComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    type='number'
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={onInputChange}
                                                /> 
                                            </div>)

                                        case 'geo':
                                            return ( <div key={i} className='p-col-12 p-md-12'>
                                                <GeoPointComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    onInputChange={onInputChange}
                                                    isMapLoaded={isMapLoaded}
                                                    onMapLoad={onMapLoad}
                                                /> 
                                            </div>)

                                        case 'str':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <TextComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.nme]}
                                                    name={col.nme}
                                                    required={required}
                                                    label={col.lbl}
                                                    placeholder={col.plh}
                                                    onInputChange={onInputChange}
                                                /> 
                                            </div>)

                                        // case 'wys':
                                        //     return ( <div key={i} className='p-col-12 p-md-6'>
                                        //         <TextAreaComponent 
                                        //             index={i}
                                        //             readOnly={mode === 'view'}
                                        //             value={row[col.nme]}
                                        //             name={col.nme}
                                        //             required={required}
                                        //             label={col.lbl}
                                        //             placeholder={col.plh}
                                        //             onInputChange={onInputChange}
                                        //         />
                                        //     </div>)

                                        case 'wys':
                                            return ( <WysiwygComponent 
                                                index={i}
                                                key={i}
                                                readOnly={mode === 'view'}
                                                value={row[col.nme]}
                                                name={col.nme}
                                                required={required}
                                                label={col.lbl}
                                                placeholder={col.plh}
                                                onInputChange={onInputChange}
                                            />)
                                            
                                        case 'bol':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <SwitchComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={onInputChange}
                                                />
                                            </div>)

                                        case 'dat':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <DatePickerComponent
                                                    index={i}
                                                    showTime={col.tim}
                                                    jalali={col.jal}
                                                    readOnly={mode === 'view'}
                                                    value={row[col.nme]}
                                                    name={col.nme}
                                                    required={required}
                                                    label={col.lbl}
                                                    placeholder={col.plh}
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
                                <TabPanel key={i} header={image.lbl} >
                                    <div className='p-grid'>
                                        <ImageComponent
                                            index={i}
                                            key={i}
                                            value={imageParser(row, image)}
                                            name={image.nme}
                                            label={image.lbl}
                                            readOnly={mode === 'view'}
                                            placeholder={image.lbl}
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