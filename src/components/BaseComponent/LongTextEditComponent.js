import React, { Component } from 'react';
import {InputTextarea} from 'primereact/inputtextarea';

export default class LongTextEditComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const { label, placeholder, index, name } = this.props;
        return (
            <div className="p-col-12 p-md-12">
                <label className='lable' htmlFor={`lbl-${index}`}> {label} </label>
                <InputTextarea name={name} rows={3} cols={30} id={`lbl-${index}`} placeholder={placeholder} autoResize={true} />
            </div>
        );
    }
}