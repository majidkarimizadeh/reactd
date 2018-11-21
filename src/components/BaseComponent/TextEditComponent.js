import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';

export default class TextEditComponent extends Component {

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
            type

        } = this.props;
        return (
            <div className="p-col-12 p-md-12 p-xs-4 p-sm-4">
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    {label} 
                    {readOnly && 
                        <span>{` : ${value}`}</span>
                    }
                </label>
                {!readOnly &&
                    <InputText 
                        value={value} 
                        name={name} 
                        type={type}
                        id={`lbl-${index}`}
                        style={{textAlign:'right'}}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                }
            </div>
        );
    }
}

TextEditComponent.defaultProps = {
    type: 'text'
};