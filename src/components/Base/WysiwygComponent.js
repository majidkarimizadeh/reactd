import React, { Component } from 'react'
import Parser from 'html-react-parser';
import { WYSIWYG_UPLOAD_URL } from '../../config'
import { WysiwygService } from '../../service/WysiwygService'
import FroalaEditor from 'react-froala-wysiwyg';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import $ from 'jquery';

export default class WysiwygComponent extends Component {

    remove(src) {
        if(src) 
        {
            let name = src.substring(src.lastIndexOf('/')+1);
            if(name) 
            {
                let wysiwygService = new WysiwygService();
                wysiwygService.removeFile(name)
            }
        }
    }

    render() {

        const { 
            label, 
            placeholder, 
            index, 
            name, 
            value, 
            onInputChange,
            readOnly,
        } = this.props

        return (
            <div className='p-col-12 p-md-12'>

                <label className='lable' htmlFor={`lbl-${index}`}> 
                    <span> {label} </span>
                    {readOnly && 
                        <span>
                            : {value ? Parser(value) : ' ---'}
                        </span>
                    }
                </label>
                {!readOnly &&
                    <FroalaEditor 
                        tag='textarea' 
                        model={value}
                        config={{
                            placeholderText: placeholder,
                            charCounterCount: true,
                            videoResponsive: true,
                            imageUploadURL: WYSIWYG_UPLOAD_URL,
                            fileUploadURL: WYSIWYG_UPLOAD_URL,
                            videoUploadURL: WYSIWYG_UPLOAD_URL,
                            events: {
                                'froalaEditor.image.removed': (e, ed, obj) => {
                                    this.remove( obj.attr('src') )
                                },
                                'froalaEditor.video.removed': (e, ed, obj) => {
                                    this.remove( obj.attr('src') )
                                },
                                'froalaEditor.file.unlink': (e, ed, obj) => {
                                    this.remove( $(obj).attr('href') )
                                }
                            }
                        }}
                        onModelChange={ (model) => onInputChange(model, name)}
                    />
                }
            </div>
        )
    }
}