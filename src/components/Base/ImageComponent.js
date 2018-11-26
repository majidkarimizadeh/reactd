import React, { Component } from 'react';
import ReactCrop, {getPixelCrop} from 'react-image-crop';
import {FileUpload} from 'primereact/fileupload';
import {Button} from 'primereact/button';
import 'react-image-crop/dist/ReactCrop.css';

export default class ImageComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            baseSrc: null,
            src: null,
            crop: {
                x: 10,
                y: 10,
                // aspect: 1,
                width: 50,
            }
        }

        this.onSelectFile = this.onSelectFile.bind(this)
        this.onCropRevert = this.onCropRevert.bind(this)
        this.onClearFile = this.onClearFile.bind(this)
        this.onImageLoaded = this.onImageLoaded.bind(this)
        this.onCropChange = this.onCropChange.bind(this)
        this.onCropComplete = this.onCropComplete.bind(this)
        this.makeClientCrop = this.makeClientCrop.bind(this)
    }

    onClearFile() {
        this.setState({
            src: null,
            baseSrc: null,
            croppedImageUrl: null
        })
    }

    onSelectFile(e) {
        if (e.files && e.files.length > 0) {
            const reader = new FileReader();
            reader.addEventListener('load', () => {
                this.setState({ 
                    src: reader.result,
                    baseSrc: reader.result
                })
            });
            reader.readAsDataURL(e.files[0]);
        }
    }

    onImageLoaded(image, pixelCrop) {
        this.imageRef = image;

        const { crop } = this.state;

        if (crop.aspect && crop.height && crop.width) {
            this.setState({
                crop: { ...crop, height: null },
            });
        } else {
            this.makeClientCrop(crop, pixelCrop);
        }
    }


    onCropComplete() {
        const { crop } = this.state;
        this.makeClientCrop(crop, getPixelCrop(this.imageRef, crop));
    }

    onCropRevert() {
        this.setState({
            src: this.state.baseSrc,
            crop: {
                x: 10,
                y: 10,
                width: 50,
                height:null
            }
        })
    }

    onCropChange(crop) {
        this.setState({ crop });
    }

    async makeClientCrop(crop, pixelCrop) {
        if (this.imageRef && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
            );
            this.setState({ 
                src: croppedImageUrl,
                crop: {
                    x: 10,
                    y: 10,
                    width: 50,
                    height:null
                }
            });
        }
    }

    getCroppedImg(image, pixelCrop, fileName) {
        const canvas = document.createElement('canvas');
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext('2d');

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
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                blob.name = fileName;
                window.URL.revokeObjectURL(this.fileUrl);
                this.fileUrl = window.URL.createObjectURL(blob);
                resolve(this.fileUrl);
            }, 'image/jpeg');
        })
    }

    render() {
        const { 
            
            label, 
            placeholder, 
            index, 
            name, 
            value, 
            onInputFileChange,
            readOnly,
            type,
            cropWindowVisibles,
            imageUrls

        } = this.props;

        const { croppedImageUrl } = this.state;

        return (
            <>
                <div className="p-col-12 p-md-5" style={{textAlign:'center', marginTop:'10px'}}>
                    {this.state.src && (
                        <ReactCrop
                            src={this.state.src}
                            crop={this.state.crop}
                            onImageLoaded={this.onImageLoaded}
                            onChange={this.onCropChange}
                            imageStyle={{width: '100%'}}
                            style={{width: '100%'}}
                        />
                    )}
                </div>
                <div className="p-col-12 p-md-5" style={{textAlign:'center', marginTop:'10px'}}>
                    {croppedImageUrl && <img style={{maxWidth:'100%'}} alt="Crop" src={croppedImageUrl} />}
                </div>
                <div className="p-col-12 p-md-2" style={{textAlign:'right'}}>
                    <div className="p-col-12 p-md-12 full-width-upload-btn">
                        <label className='lable' htmlFor={`lbl-${index}`}> 
                            {label} 
                        </label>
                        <FileUpload 
                            onSelect={this.onSelectFile}
                            onClear={this.onClearFile}
                            name={name} 
                            id={`lbl-${index}`}
                            mode="basic"
                        />
                    </div>
                    {this.state.src && 
                        <div>
                            <div className="p-col-12">
                                <Button onClick={this.onCropComplete} style={{width:'100%'}} label="Crop" className="p-button-primary" />
                            </div>
                            <div className="p-col-12">
                                <Button onClick={this.onCropRevert} style={{width:'100%'}} label="Revert" className="p-button-primary" />
                            </div>
                        </div>
                    }

                </div>
            </>
        );
    }
}