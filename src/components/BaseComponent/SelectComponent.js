import React, { Component } from 'react';
import {Dropdown} from 'primereact/dropdown';

export default class SelectComponent extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {            
            label, 
            placeholder, 
            index, 
            name, 
            options,
            value, 
            onChange,
            onMouseDown,
            readOnly,

        } = this.props;
        return (
            <div className="p-col-12 p-md-12 p-xs-4 p-sm-4">
                <label className='lable' htmlFor={`lbl-${index}`}>
                    {label} 
                    {readOnly && 
                        <span>{` : ${value}`}</span>
                    }
                </label>
                {/* should be multi col */}
                {!readOnly &&
                    <Dropdown
                        id={`lbl-${index}`}
                        name={name}
                        placeholder={placeholder}
                        options={options}
                        value={value}
                        autoWidth={false}
                        onMouseDown={onMouseDown}
                        onChange={onChange}
                        // onChange={event => this.setState({dropdownCity: event.value})} 
                    />
                }
            </div>
        );
    }
}