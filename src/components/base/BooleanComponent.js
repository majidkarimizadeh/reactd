import React, { Component } from 'react'
import { InputSwitch } from 'primereact/inputswitch'
import { boolParser } from '../../utils/parser'

export default class BooleanComponent extends Component {

    render() {

        const {
            label, 
            placeholder, 
            index, 
            name, 
            value, 
            onInputChange,
            readOnly
        } = this.props

        return (
            <div className='p-col-12 p-md-6'>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    <span>{label}</span>
                    {readOnly && 
                        <span> : {boolParser(+value)}</span>
                    }
                </label>
                {!readOnly &&
                    <InputSwitch
                        checked={!!+value} 
                        name={name} 
                        id={`lbl-${index}`}
                        placeholder={placeholder}
                        onChange={(e) => onInputChange(+e.value, name)}
                        className='p-col-12 p-md-12'
                    />
                }
            </div>
        )
    }
}