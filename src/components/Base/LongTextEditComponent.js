import React, { Component } from 'react';
import {InputTextarea} from 'primereact/inputtextarea';

export default class LongTextEditComponent extends Component {

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
            onChange,
            readOnly,

        } = this.props;
        return (
            <div className="p-col-12 p-md-12" style={{textAlign:'right'}}>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    {label} 
                    {readOnly && 
                        <span>{` : ${value}`}</span>
                    }
                </label>
                {!readOnly &&
                    <InputTextarea 
                        value={value} 
                        name={name} 
                        rows={3} 
                        cols={30} 
                        id={`lbl-${index}`} 
                        placeholder={placeholder} 
                        autoResize={true}
                        onChange={onChange}
                        style={{textAlign:'right'}}
                        className="p-col-12 p-md-12"
                    />
                }
            </div>
        );
    }
}