import React, { Component } from 'react'
import { SelectButton } from 'primereact/selectbutton'
import { LANGUAGES, DEFAULT_LANGUAGE } from '../../utils/config'

export default class LanguageSelector extends Component {

    componentWillMount() {
        const { value, onLanguageChange } = this.props
        if(value === null) 
        {
            onLanguageChange(DEFAULT_LANGUAGE)
        }
    }

    render() {
        const { value, onLanguageChange } = this.props

        return  (
            <div className='language-selector-container'>
                <SelectButton
                    className='language-selector'
                    value={value} 
                    options={LANGUAGES}
                    onChange={(e) => onLanguageChange(e.value)}
                />
            </div>
        )
    }
}