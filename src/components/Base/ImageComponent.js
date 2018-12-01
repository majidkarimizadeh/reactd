import React, { Component } from 'react';
import ReactCrop, {getPixelCrop} from 'react-image-crop';
import {FileUpload} from 'primereact/fileupload';
import {Button} from 'primereact/button';
import 'react-image-crop/dist/ReactCrop.css';

export default class ImageComponent extends Component {

    render() {

        const { 

            label, 
            index, 
            name, 
            readOnly,
            value,

            baseSrc,
            src,
            crop,
            onSelectFile,
            onCropRevert,
            onClearFile,
            onImageLoaded,
            onCropChange,
            onCropComplete,

        } = this.props;

        return (
            <>
                <div className="p-col-12 p-md-5" style={{textAlign:'center'}}>
                    {(value && !src[index])  &&
                        <img style={{width:'100%'}} src={value} />
                    }

                    {src[index] && (
                        <ReactCrop
                            src={src[index]}
                            crop={crop[index]}
                            onImageLoaded={(image, pixelCrop) => onImageLoaded(image, pixelCrop, index)}
                            onChange={(crop) => onCropChange(crop, index)}
                            imageStyle={{width: '100%'}}
                            style={{width: '100%'}}
                        />
                    )}
                </div>
                <div className="p-col-12 p-md-5" style={{textAlign:'center'}}></div>
                <div className="p-col-12 p-md-2" style={{textAlign:'center'}}>
                    <div className="p-col-12 p-md-12 full-width-upload-btn">
                        <label className='lable' style={{textAlign:'right'}} htmlFor={`lbl-${index}`}> 
                            {label} 
                        </label>
                        <FileUpload 
                            onSelect={(e) => onSelectFile(e, name, index)}
                            onClear={() => onClearFile(index)}
                            name={name} 
                            chooseLabel="انتخاب تصویر"
                            id={`lbl-${index}`}
                            mode="basic"
                        />
                    </div>
                    {src[index] && 
                        <div>
                            <div className="p-col-12">
                                <Button 
                                    onClick={() => onCropComplete(name, index)}
                                    style={{width:'100%'}}
                                    label="برش عکس"
                                    className="p-button-primary"
                                />
                            </div>
                            <div className="p-col-12">
                                <Button
                                    onClick={() => onCropRevert(index)}
                                    style={{width:'100%'}} 
                                    label="بازگشت" 
                                    className="p-button-primary"
                                />
                            </div>
                        </div>
                    }

                </div>
            </>
        );
    }
}