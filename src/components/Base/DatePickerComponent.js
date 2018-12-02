import React, { Component } from 'react'
import { InputText } from 'primereact/inputtext'
import { Calendar } from 'primereact/calendar'
import moment from 'moment'
import * as JalaliMoment from 'moment-jalaali'
import { 
    getJalDateByGreDate, 
    getGreDateByTimestamp, 
    getGreDateByGMT, 
    getGMTByGreDate 
} from '../../parser/parser'
import {
    DatePicker,
    DateTimePicker,
    DateRangePicker,
    DateTimeRangePicker
} from 'react-advance-jalaali-datepicker'


export default class DatePickerComponent extends Component {

    constructor(props) {
        super(props)
    }

    datePickerInput(props) {
        return <InputText 
                    style={{textAlign:'right'}}
                    className='p-col-12 p-md-12 popo' 
                    {...props} 
                />
    }

    render() {

        const {     
            label, 
            placeholder, 
            index, 
            showTime,
            name, 
            value, 
            jalali,
            onInputChange,
            readOnly,
            type
        } = this.props

        let JalaliComponent = showTime ? DateTimePicker : DatePicker
        let JalaliFormat = showTime ? 'jYYYY/jMM/jDD HH:mm:00' : 'jYYYY/jMM/jDD'

        return (
            <div className='p-col-12 p-md-6' style={{textAlign:'right'}}>
                <label className='lable' htmlFor={`lbl-${index}`}> 
                    {label} 
                    {readOnly && 
                        <span>
                            {` : ${jalali ? getJalDateByGreDate(value, showTime) : getGMTByGreDate(value)}`}
                        </span>
                    }
                </label>
                {(!readOnly && jalali) && 
                    <JalaliComponent
                        inputComponent={this.datePickerInput}
                        placeholder={placeholder}
                        format={this.JalaliFormat}
                        onChange={(unix, format) => onInputChange(getGreDateByTimestamp(unix, showTime), name) }
                        preSelected={getJalDateByGreDate(value, showTime)}
                    />
                }
                {(!readOnly && !jalali) && 
                    <Calendar
                        placeholder={placeholder}
                        showTime={showTime}
                        dateFormat='yy-mm-dd'
                        name={name}
                        value={getGMTByGreDate(value)}
                        hourFormat='24'
                        style={{width:'100%'}}
                        monthNavigator={true} 
                        yearNavigator={true}
                        yearRange='2000:2030'
                        inputStyle={{width:'100%'}}
                        onChange={(e) => onInputChange(getGreDateByGMT(e.value), name) }
                    />
                }
            </div>
        )
    }
}

