import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext'

export default class TextEditComponent extends Component {

    render() {

        const {
            label, 
            placeholder,
            index,
            name,
            value,
            onInputChange,
            required,
            readOnly,
            type,
        } = this.props

        return (
            <div>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    <span> 
                        {label}
                        {(!readOnly && required) &&
                            <span className='required'>(این فیلد اجباری است)</span>
                        }
                    </span>
                    {readOnly && 
                        <span>{value ? ' : ' + value : ' : ---'}</span>
                    }
                </label>
                {!readOnly &&
                    <InputText 
                        value={value} 
                        name={name} 
                        type={type}
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

TextEditComponent.defaultProps = {
    type: 'text'
}