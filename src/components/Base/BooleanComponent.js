import React, { Component } from 'react';
import {InputSwitch} from 'primereact/inputswitch';
import { boolParser } from '../../parser/parser'

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
                    {readOnly && 
                        <span>
                            {boolParser(value)}
                            <span>:</span>
                        </span>
                    }
                    {label} 
                </label>
                {!readOnly &&
                    <InputSwitch
                        checked={value} 
                        name={name} 
                        type={type}
                        id={`lbl-${index}`}
                        placeholder={placeholder}
                        onChange={(e) => onInputChange(e.value ? 1 : 0, name)}
                        style={{textAlign:'right'}}
                        className="p-col-12 p-md-12"
                    />
                }
            </div>
        );
    }
}