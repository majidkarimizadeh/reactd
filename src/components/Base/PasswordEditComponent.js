import React, { Component } from 'react';
import {Password} from 'primereact/password';

export default class PasswordEditComponent extends Component {

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
            <div className="p-col-12 p-md-6" style={{textAlign:'right'}}>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    {label}
                </label>
                    <Password 
                        value={value} 
                        name={name} 
                        type={type}
                        id={`lbl-${index}`}
                        placeholder={placeholder}
                        onChange={onChange}
                        style={{textAlign:'right'}}
                        className="p-col-12 p-md-12"
                    />
            </div>
        );
    }
}