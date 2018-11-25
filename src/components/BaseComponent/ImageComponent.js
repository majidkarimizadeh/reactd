import React, { Component } from 'react';
import {FileUpload} from 'primereact/fileupload';
import {Dialog} from 'primereact/dialog';
import {Cropper} from 'react-image-cropper'

export default class ImageComponent extends Component {

    constructor(props) {
        super(props)
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

        return (
            <>
                <div className="p-col-12 p-md-8" style={{textAlign:'right', marginTop:'10px'}}>
                    {cropWindowVisibles[index] &&
                        <Cropper 
                            src={imageUrls[index]}
                            fixedRatio={false}
                            ref={ ref => { this.cropper = ref }}
                        />
                    }

                    {(!cropWindowVisibles[index] && value) &&
                        <img src={value} />
                    }
                </div>
                <div className="p-col-12 p-md-4" style={{textAlign:'right', marginTop:'10px'}}>
                    <label className='lable' htmlFor={`lbl-${index}`}> 
                        {label} 
                    </label>
                    <FileUpload 
                        className="p-col-12 p-md-12"
                        onSelect={(e) => {onInputFileChange(e, index, name)}}
                        name={name} 
                        id={`lbl-${index}`}
                        mode="basic"
                    ></FileUpload>
                </div>
            </>
        );
    }
}