import React, { Component } from 'react'
import { InputTextarea } from 'primereact/inputtextarea'

export default class TextAreaComponent extends Component {

    render() {

        const { 
            label, 
            placeholder, 
            index, 
            name, 
            value, 
            onInputChange,
            readOnly,
            required,
        } = this.props

        return (
            <div>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    <span> {label} </span>
                    {(!readOnly && required) &&
                        <span className='required'>(این فیلد اجباری است)</span>
                    }
                    {readOnly && 
                        <span>{value ? ' : ' + value : ' : ---'}</span>
                    }
                </label>
                {!readOnly &&
                    <InputTextarea 
                        value={value} 
                        name={name} 
                        rows={3}
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