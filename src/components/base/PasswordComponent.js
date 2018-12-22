import React, { Component } from 'react'
import { Password as PrimePassword } from 'primereact/password'

export default class PasswordComponent extends Component {

    render() {

        const { 
            label, 
            placeholder, 
            index, 
            name, 
            value, 
            readOnly,
            required,
            onInputChange,
        } = this.props

        return (
            <div>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    <span>{label}</span>
                    {(!readOnly && required) &&
                        <span className='required'>(این فیلد اجباری است)</span>
                    }
                    {readOnly && 
                        <span> : ---</span>
                    }
                </label>
                    {!readOnly &&
                        <PrimePassword 
                            value={value} 
                            name={name} 
                            id={`lbl-${index}`}
                            placeholder={placeholder}
                            onChange={(e) => onInputChange(e.target.value, name)}
                            className='p-col-12 p-md-12'
                        />
                    }
            </div>
        )
    }
}