import React, { Component } from 'react'
import PasswordComponent from '../../base/PasswordComponent'
import { CustomService } from '../../../service/CustomService'
import { Button } from 'primereact/button'

export default class UserComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            password:'',
            passwordConfirm:''
        }
        this.service = new CustomService()
        this.onInputChange = this.onInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onInputChange(value, key) {
        this.setState({
            [key]: value
        })
    }

    onSubmit() {

        const { growl, table, row, dispatch } = this.props
        const { 
            password, 
            passwordConfirm
        } = this.state

        if(password && (password === passwordConfirm)) 
        {
            let apiObject = new FormData()
            apiObject.append('password', password)
            apiObject.append('primary', row[table.pk])
            this.service.post('update-password', apiObject)
                .then( res => {
                    growl.show({
                        severity: 'success',
                        summary: 'به روز رسانی',
                        detail: 'رمز عبور با موفقیت به روز رسانی شد.'
                    })
                    dispatch({ mode : '' })
                })
        } 
        else 
        {
            growl.show({
                severity: 'error',
                summary: 'خطا!',
                detail: 'رمز عبور و تکرار آن یکسان نیست.'
            })
        }
    }

    render() {

        const { 
            password, 
            passwordConfirm
        } = this.state

        const {
            row,
            dispatch,
        } = this.props

        return (
            <div className='p-col-12'>
                <div className='card card-w-title'>
                    <div className="card-heading">
                        <div className="card-heading-actions">
                            <Button onClick={() => dispatch({ 'mode' : '' })} label='بازگشت' className='p-button-secondary' />
                        </div>
                        <h1 className="card-heading-caption" style={{direction:'rtl'}}> 
                            تغییر رمز
                        </h1>
                    </div>
                    <div className='p-grid' style={{direction:'rtl'}}>
                    
                        <div className='p-col-12 p-md-12'>
                            <h2>کاربر : {row.email}</h2>
                        </div>
                        <div className='p-col-12 p-md-6'>
                            <PasswordComponent 
                                index={1}
                                value={password}
                                readOnly={false}
                                name='password'
                                label='رمز عبور'
                                required={true}
                                placeholder='رمز عبور را وارد کنید'
                                onInputChange={this.onInputChange}
                            /> 
                        </div>
                        <div className='p-col-12 p-md-6'>
                            <PasswordComponent 
                                index={2}
                                value={passwordConfirm}
                                readOnly={false}
                                name='passwordConfirm'
                                label='تکرار رمز عبور'
                                required={true}
                                placeholder='تکرار  رمز عبور را وارد کنید'
                                onInputChange={this.onInputChange}
                            /> 
                        </div>

                        <div className='p-col-12'>
                            <Button 
                                onClick={(e) => this.onSubmit()} 
                                label='اعمال' 
                                className='p-button-success p-button-raised' 
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
