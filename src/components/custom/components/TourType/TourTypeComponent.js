import React, { Component } from 'react'
import TreeComponent from '../../base/TreeComponent'
import TextAreaComponent from '../../base/TextAreaComponent'
import SwitchComponent from '../../base/SwitchComponent'
import { Button } from 'primereact/button'
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel'
import { CustomService } from '../../../service/CustomService'
import { colParser } from '../../../utils/parser'

export default class TourTypeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cols: [],
            selected: [],
            formCols: {},
            uiCols: {},
            requireCols: {},
        }
        this.service = new CustomService()
        this.onInputChange = this.onInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        let apiObject = new FormData()
        const { table, row } = this.props
        apiObject.append('slug', row['slug'])
        this.service.post('get-tour-cols', apiObject)
            .then( res => {
                let data = res.data
                this.setState({
                    cols: data.columns,
                    selected: data.selected,
                })

                let formCols = {}
                let requireCols = {}
                data.selected.forEach( item => {
                    formCols[item.nme] = 1
                    if('vld' in item) 
                    {
                        requireCols[item.nme] = 1
                    }
                })
                this.setState({
                    formCols: formCols,
                    requireCols: requireCols
                })
            })
    }

    onInputChange(value, key, colType = null) {        
        let cols = {}
        if(colType === 'formCols') {
            cols = this.state.formCols
        }
        else if(colType === 'uiCols') {
            cols = this.state.uiCols
        }
        else if(colType === 'requireCols') {
            cols = this.state.requireCols
        }

        if(!value) {
            delete cols[key]
        } else {
            cols[key] = value
        }
        this.setState({
            [colType]: cols
        })
    }

    onSubmit() {

        const {
            cols,
            formCols,
            uiCols,
            requireCols
        } = this.state

        const { row, growl } = this.props

        let formColsArray = []
        let uiColsArray = []

        Object.keys(formCols).forEach( (formCol, i) => {
            cols.forEach( (col, j) => {
                if(col.nme == formCol) 
                {
                    formColsArray.push(col)
                }
            })
        })

        Object.keys(uiCols).forEach( (uiCol, i) => {
            cols.forEach( (col, j) => {
                if(col.nme == uiCol) 
                {
                    uiColsArray.push(col)
                }
            })
        })

        let apiObject = new FormData()
        apiObject.append('row', JSON.stringify(row))
        apiObject.append('form', JSON.stringify(formColsArray))
        apiObject.append('ui', JSON.stringify(uiColsArray))
        apiObject.append('validation', JSON.stringify(requireCols))
        this.service.post('update-tour-cols', apiObject)
            .then( res => {
                growl.show({
                    severity: 'success',
                    summary: 'ویرایش',
                    detail: 'عملیات با موفقیت انجام شده'
                })
                this.props.dispatch({mode : ''})
            })
            .catch( err => {
                growl.show({
                    severity: 'danger',
                    summary: 'خطا!',
                    detail: err.response.data
                })
            })

    }


    render() {

        const {
            table,
            row,
            dispatch
        } = this.props

        const {
            cols,
            selected,
            formCols,
            requireCols,
            uiCols,
        } = this.state
        return  (
            <div className='p-col-12'>
                <div className='card card-w-title'>
                    <div className="card-heading">
                        <div className="card-heading-actions">
                            <Button onClick={() => dispatch({ 'mode' : '' })} label='بازگشت' className='p-button-secondary' />
                        </div>
                        <h1 className="card-heading-caption" style={{direction:'rtl'}}> 
                            ساخت فرم {row.name}
                        </h1>
                    </div>
                    <div className='p-grid'>
                        <div className='p-col-12 p-md-4'>
                            <h3 style={{textAlign:'right'}}>
                                اعتبار سنجی
                            </h3>
                            <hr />
                            {cols.map( (field, i) => {
                                return <div key={i} 
                                            style={{textAlign:'right'}} 
                                            className='p-col-12 p-md-12'>
                                    <SwitchComponent
                                        index={i}
                                        label='اجباری'
                                        placeholder={field.plh}
                                        onInputChange={(v, k) => this.onInputChange(v, k, 'requireCols')}
                                        name={field.nme}
                                        value={requireCols[field.nme]}
                                    />
                                </div>
                            })}
                        </div>
                        <div className='p-col-12 p-md-4'>
                            <h3 style={{textAlign:'right'}}>
                                اطلاعات نمایش در صفحه اول
                            </h3>
                            <hr />
                            {cols.map( (field, i) => {
                                return <div 
                                            key={i} 
                                            style={{textAlign:'right'}} 
                                            className='p-col-12 p-md-12'>
                                    <SwitchComponent
                                        index={i}
                                        label={field.lbl}
                                        placeholder={field.plh}
                                        onInputChange={(v, k) => this.onInputChange(v, k, 'uiCols')}
                                        name={field.nme}
                                        value={uiCols[field.nme]}
                                    />
                                </div>
                            })}
                        </div>
                        <div className='p-col-12 p-md-4'>
                            <h3 style={{textAlign:'right'}}>
                                اطلاعات فرم
                            </h3>
                            <hr />
                            {cols.map( (field, i) => {
                                return <div 
                                            key={i} 
                                            style={{textAlign:'right'}} 
                                            className='p-col-12 p-md-12'>
                                    <SwitchComponent
                                        index={i}
                                        label={field.lbl}
                                        placeholder={field.plh}
                                        onInputChange={(v, k) => this.onInputChange(v, k, 'formCols')}
                                        name={field.nme}
                                        value={formCols[field.nme]}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                    <Button 
                        onClick={(e) => this.onSubmit()} 
                        label='اعمال' 
                        className='p-button-success p-button-raised' 
                    />
                </div>
            </div>
        )
    }
}