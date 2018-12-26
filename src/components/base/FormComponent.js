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
import { LookUpService } from '../../service/LookUpService'
import { getPixelCrop } from 'react-image-crop'
import { imageParser } from '../../utils/parser'
import { TabView, TabPanel } from 'primereact/tabview'
import { Button } from 'primereact/button'

export default class FormComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emptyRow: {},
            baseSrc: [],
            src: [],
            crop: [],
            options: [],
            isMapLoaded: false,
        }
        this.onInputChange = this.onInputChange.bind(this)

        this.onLookUp = this.onLookUp.bind(this)

        this.onSelectFile = this.onSelectFile.bind(this)
        this.onCropRevert = this.onCropRevert.bind(this)
        this.onClearFile = this.onClearFile.bind(this)
        this.onImageLoaded = this.onImageLoaded.bind(this)
        this.onCropChange = this.onCropChange.bind(this)
        this.onCropComplete = this.onCropComplete.bind(this)
        this.makeClientCrop = this.makeClientCrop.bind(this)
        this.getCroppedImg = this.getCroppedImg.bind(this)

        this.lookUpService = new LookUpService()
    }

    componentWillMount() {
        const { row } = this.props
        this.setState({
            emptyRow: row
        })
    }

    componentDidUpdate(prevProps) {
        if(prevProps.lang !== this.props.lang)
        {
            this.setState({
                emptyRow: this.props.row
            })
        }
    }    

    onInputChange(data, name) {
        let emptyRow = {...this.state.emptyRow}
        emptyRow[name] = data
        this.setState({ emptyRow })
    }

    onClearFile(index) {
        let src = [...this.state.src]
        src[index] = null

        let baseSrc = [...this.state.baseSrc]
        baseSrc[index] = null

        this.setState({
            src, baseSrc
        })
    }

    onSelectFile(e, name, index) {
        if (e.files && e.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                let src = [...this.state.src]
                src[index] = reader.result

                let baseSrc = [...this.state.baseSrc]
                baseSrc[index] = reader.result

                this.setState({ src, baseSrc })
            })

            this.setState({ 
                emptyRow: {
                    ...this.state.emptyRow,
                    [name]: e.files[0]
                }
            })
            reader.readAsDataURL(e.files[0])
        }
    }

    onImageLoaded(image, pixelCrop, index) {
        this.imageRef = image

        const { crop } = this.state

        if (crop[index] && crop[index].aspect && crop[index].height && crop[index].width) {
            let crops = [...this.state.crop]
            crops[index] = { ...crop, height: null }
            this.setState({ crop: crops })
        } else {
            this.makeClientCrop(crop[index], pixelCrop, index)
        }
    }

    onCropComplete(colName, index) {
        const { crop } = this.state
        this.makeClientCrop(crop[index], getPixelCrop(this.imageRef, crop[index]), colName, index)
    }

    onCropRevert(index) {
        let src = [...this.state.src]
        src[index] = this.state.baseSrc[index]

        let crop = [...this.state.crop]
        crop[index] = {
            x: 10,
            y: 10,
            width: 50,
            height:null
        }

        this.setState({ src, crop  })
    }

    onCropChange(cr, index) {
        let crop = [...this.state.crop]
        crop[index] = cr
        this.setState({ crop })
    }

    async makeClientCrop(crop, pixelCrop, colName, index) {
        if (this.imageRef && crop && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
                colName
            )

            let src = [...this.state.src]
            src[index] = croppedImageUrl

            let crops = [...this.state.crop] 
            crops[index] = {
                x: 10,
                y: 10,
                width: 50,
                height:null
            }
            this.setState({ src, crop:crops })
        }
    }

    getCroppedImg(image, pixelCrop, fileName, colName) {
        const canvas = document.createElement('canvas')
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                this.setState({
                    emptyRow: {
                        ...this.state.emptyRow,
                        [colName]: blob
                    }  
                })
                blob.name = fileName
                window.URL.revokeObjectURL(this.fileUrl)
                this.fileUrl = window.URL.createObjectURL(blob)
                resolve(this.fileUrl)
            }, 'image/jpeg')
        })
    }

    onMapLoad(loading) {
        this.setState({
            isMapLoaded: loading
        })
    }

    onLookUp(rdf, name) {
        let { options } = this.state
        let { lang } = this.props
        let apiObject = new FormData()
        apiObject.append('rdf', rdf)
        if(lang) 
        {
            apiObject.append('lang', lang)
        }
        this.lookUpService.getLookUpByRdf(apiObject)
            .then( opts => {
                options[name] = opts
                this.setState({ options }) 
            })
    }

    onCancelForm() {
        const { onCancelForm } = this.props
        onCancelForm();
    }

    onSubmitForm() {
        const { onSubmitForm, mode } = this.props
        const { emptyRow } = this.state
        onSubmitForm(emptyRow, mode);
    }


	render() {

        const { 
            emptyRow,
            baseSrc,
            src,
            crop,
            isMapLoaded,
            options,
        } = this.state

		const {
            table,
            cols,
            row,
            mode,
            lang,
            onLanguageChange,
            showHeader,
            cardContainerStyle
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
        else if(mode == 'custom') 
        {
            modeFields = table.crt
        }

        const footer = <div className='p-col-12 form-footer'>
            <Button 
                label='لغو' 
                onClick={() => this.onCancelForm()}
                className='p-button-secondary' 
            />
            {mode !== 'view' &&
                <Button 
                    onClick={(e) => this.onSubmitForm()} 
                    label='اعمال' 
                    className='p-button-success p-button-raised' 
                />
            }
        </div>

		return (
            <div className='p-col-12'>
                <div className='card card-w-title' style={cardContainerStyle}>
                    {showHeader && 
                        <div className="card-heading">
                            <div className="card-heading-actions">
                                {table.trs && 
                                    <LanguageSelector
                                        value={lang}
                                        readOnly={mode === 'create'}
                                        refreshData={false}
                                        onLanguageChange={onLanguageChange}
                                    />
                                }
                            </div>
                            <h1 className="card-heading-caption">{table.lbl}</h1>
                        </div>
                    }
                    <TabView>
                        <TabPanel header='اطلاعات'>
                            <div className='p-grid' style={{direction:'rtl'}}>
                                {!!modeFields && modeFields.map( (item, i) => {
                                    let col = cols.find(function(c) {
                                        return c.no === item
                                    })
                                    let required = (('vld' in col) && ('required' in col.vld))
                                    switch(col.cnt) 
                                    {
                                        case 'lku':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <SelectComponent 
                                                    index={i}
                                                    options={options}
                                                    readOnly={mode === 'view'}
                                                    value={emptyRow[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={this.onInputChange}
                                                    onMouseDown={() => {this.onLookUp(col.rdf, col.nme)}}
                                                /> 
                                            </div>)

                                        case 'pas':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <PasswordComponent 
                                                    index={i}
                                                    value={emptyRow[col.nme]}
                                                    readOnly={mode === 'view'}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={this.onInputChange}
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
                                                    value={emptyRow[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    type='number'
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={this.onInputChange}
                                                /> 
                                            </div>)

                                        case 'geo':
                                            return ( <div key={i} className='p-col-12 p-md-12'>
                                                <GeoPointComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={emptyRow[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    onInputChange={this.onInputChange}
                                                    isMapLoaded={isMapLoaded}
                                                    onMapLoad={this.onMapLoad}
                                                /> 
                                            </div>)

                                        case 'str':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <TextComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={emptyRow[col.nme]}
                                                    name={col.nme}
                                                    required={required}
                                                    label={col.lbl}
                                                    placeholder={col.plh}
                                                    onInputChange={this.onInputChange}
                                                /> 
                                            </div>)

                                        case 'txt':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <TextAreaComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={emptyRow[col.nme]}
                                                    name={col.nme}
                                                    required={required}
                                                    label={col.lbl}
                                                    placeholder={col.plh}
                                                    onInputChange={this.onInputChange}
                                                />
                                            </div>)

                                        case 'wys':
                                            return ( <WysiwygComponent 
                                                index={i}
                                                key={i}
                                                readOnly={mode === 'view'}
                                                value={emptyRow[col.nme]}
                                                name={col.nme}
                                                required={required}
                                                label={col.lbl}
                                                placeholder={col.plh}
                                                onInputChange={this.onInputChange}
                                            />)
                                            
                                        case 'bol':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <SwitchComponent 
                                                    index={i}
                                                    readOnly={mode === 'view'}
                                                    value={emptyRow[col.nme]}
                                                    name={col.nme}
                                                    label={col.lbl}
                                                    required={required}
                                                    placeholder={col.plh}
                                                    onInputChange={this.onInputChange}
                                                />
                                            </div>)

                                        case 'dat':
                                            return ( <div key={i} className='p-col-12 p-md-6'>
                                                <DatePickerComponent
                                                    index={i}
                                                    showTime={col.tim}
                                                    jalali={col.jal}
                                                    readOnly={mode === 'view'}
                                                    value={emptyRow[col.nme]}
                                                    name={col.nme}
                                                    required={required}
                                                    label={col.lbl}
                                                    placeholder={col.plh}
                                                    onInputChange={this.onInputChange}
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
                                            value={imageParser(emptyRow, image)}
                                            name={image.nme}
                                            label={image.lbl}
                                            readOnly={mode === 'view'}
                                            placeholder={image.lbl}
                                            baseSrc={baseSrc}
                                            src={src}
                                            crop={crop}
                                            onSelectFile={this.onSelectFile}
                                            onCropRevert={this.onCropRevert}
                                            onClearFile={this.onClearFile}
                                            onImageLoaded={this.onImageLoaded}
                                            onCropChange={this.onCropChange}
                                            onCropComplete={this.onCropComplete}
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

FormComponent.defaultProps = {
    showHeader: true
};