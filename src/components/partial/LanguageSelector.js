import React, { Component } from 'react'
import { SelectButton } from 'primereact/selectbutton'
import { LANGUAGES } from '../../utils/config'

export default class LanguageSelector extends Component {

    constructor(props) {
        super(props)
        this.selected = false
    }

    componentWillMount() {
        const { value, onLanguageChange, readOnly } = this.props
        if(readOnly) 
        {
            this.selected = LANGUAGES.find( item => {
                if(item.value === value) 
                {
                    return item;
                }
            })
        }
    }

    render() {
        const { 
            value,
            onLanguageChange,
            refreshData,
            readOnly
        } = this.props

        return  (
            <div className='language-selector-container'>
                {readOnly && 
                    <SelectButton
                        className='language-selector'
                        value={this.selected.value} 
                        options={[this.selected]}
                    />
                }
                {!readOnly && 
                    <SelectButton
                        className='language-selector'
                        value={value} 
                        options={LANGUAGES}
                        onChange={(e) => onLanguageChange(e.value, refreshData)}
                    />
                }
            </div>
        )
    }
}

LanguageSelector.defaultProps = {
    refreshData: true,
    readOnly: false
}