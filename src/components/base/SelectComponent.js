import React, { Component } from 'react'
import { Dropdown } from 'primereact/dropdown'

export default class SelectComponent extends Component {

    render() {

        const {
            label, 
            placeholder, 
            index, 
            name, 
            options,
            value, 
            onInputChange,
            onMouseDown,
            readOnly,
            className
        } = this.props

        return (
            <div>
                <label className='lable' htmlFor={`lbl-${index}`}>
                    <span> {label} </span>
                    {readOnly && 
                        <span>{value ? ' : ' + value : ' : ---'}</span>
                    }
                </label>
                {/* should be multi col */}
                {!readOnly &&
                    <Dropdown
                        id={`lbl-${index}`}
                        name={name}
                        placeholder={placeholder}
                        options={options[name]}
                        value={parseInt(value)}
                        onMouseDown={onMouseDown}
                        onChange={(e) => onInputChange(e.value, name)}
                        style={{width:'100%'}}
                        className={className}
                    />
                }
            </div>
        )
    }
}