import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';

export default class TextEditComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { label, placeholder, index, name } = this.props;
        return (
            <div className="p-col-12 p-md-12 p-xs-4 p-sm-4">
                <label className='lable' htmlFor={`lbl-${index}`}> {label} </label>
                <InputText name={name} id={`lbl-${index}`} placeholder={placeholder}/>
            </div>
        );
    }
}