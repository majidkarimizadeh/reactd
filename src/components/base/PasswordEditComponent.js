import React, { Component } from 'react'
import { Password } from 'primereact/password'

export default class PasswordEditComponent extends Component {

    render() {

        const { 
            label, 
            placeholder, 
            index, 
            name, 
            value, 
            readOnly,
            onInputChange,
        } = this.props

        return (
            <div>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    <span>{label}</span>
                    {readOnly && 
                        <span> : ---</span>
                    }
                </label>
                    {!readOnly &&
                        <Password 
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