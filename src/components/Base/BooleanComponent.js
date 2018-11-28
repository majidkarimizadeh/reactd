import React, { Component } from 'react';
import {InputSwitch} from 'primereact/inputswitch';

export default class BooleanComponent extends Component {

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
            onInputChange,
            readOnly,
            type

        } = this.props;
        return (
            <div className="p-col-12 p-md-6" style={{textAlign:'right'}}>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    {label} 
                    {readOnly && 
                        <span>{` : ${value}`}</span>
                    }
                </label>
                {!readOnly &&
                    <InputSwitch
                        checked={value} 
                        name={name} 
                        type={type}
                        id={`lbl-${index}`}
                        placeholder={placeholder}
                        onChange={(e) => onInputChange(e.value, name)}
                        style={{textAlign:'right'}}
                        className="p-col-12 p-md-12"
                    />
                }
            </div>
        );
    }
}