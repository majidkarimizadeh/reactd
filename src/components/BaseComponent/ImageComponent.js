import React, { Component } from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Dialog} from 'primereact/dialog';
import {Cropper} from 'react-image-cropper'

export default class ImageComponent extends Component {

    constructor(props) {
        super(props)
        this.showCrop = this.showCrop.bind(this)
        this.state = {
            visible: false,
            image: null
        }
    }

    showCrop(e) {
        this.setState({
            visible: true,
            image: e.files[0].objectURL
        })
    }

    render() {
        const { 
            
            label, 
            placeholder, 
            index, 
            name, 
            value, 
            onChange,
            readOnly,
            type

        } = this.props;

        const { visible, image } = this.state

        return (
            <div>
                <div className="p-col-12 p-md-8" style={{textAlign:'right'}}>
                    {visible &&
                        <Cropper 
                            src={image}
                            ref={ ref => { this.cropper = ref }}
                        />
                    }
                </div>
                <div className="p-col-12 p-md-8" style={{textAlign:'right'}}>
                    <label className='lable' htmlFor={`lbl-${index}`}> 
                        {label} 
                    </label>
                    <FileUpload 
                        onSelect={this.showCrop}
                        name={name} 
                        id={`lbl-${index}`}
                        mode="basic"
                    ></FileUpload>
                </div>
            </div>
        );
    }
}