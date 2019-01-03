import React, { Component } from 'react'
import TreeComponent from '../../base/TreeComponent'
import TextAreaComponent from '../../base/TextAreaComponent'
import SwitchComponent from '../../base/SwitchComponent'
import { Button } from 'primereact/button'
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel'
import { CustomService } from '../../../service/CustomService'
import { roleParser } from '../../../utils/parser'

export default class RoleComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tree: [],
            roles: [],
            selectedRoleValue: null,
            selectedRole: null,
            condition: '',
            select: false,
            insert: false,
            update: false,
            del: false,
        }
        this.service = new CustomService()
        this.onSelectionChange = this.onSelectionChange.bind(this)
        this.onInputChange = this.onInputChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    componentWillMount() {
        let apiObject = new FormData()
        const { table, row } = this.props
        apiObject.append('primary', row[table.pk])
        this.service.post('get-roles', apiObject)
            .then( res => {
                this.setState({
                    tree: roleParser(res.data),
                    roles: res.data
                })
            })
    }

    onInputChange(value, key) {
        this.setState({
            [key]: value
        })
    }

    onSubmit() {

        const {

            selectedRole,
            condition,
            select,
            insert,
            update,
            del,

        } = this.state

        const { growl } = this.props

        let perm = select << 3 | insert << 2 | update << 1 | del
        let apiObject = new FormData()
        apiObject.append('perm', perm)
        apiObject.append('condition', condition)
        apiObject.append('schema_id', selectedRole.schema_id)
        apiObject.append('role_id', selectedRole.role_id)
        this.service.post('update-roles', apiObject)
            .then( res => {
                growl.show({
                    severity: 'success',
                    summary: 'ویرایش',
                    detail: 'عملیات با موفقیت انجام شده'
                })
            })
            .catch( err => {
                growl.show({
                    severity: 'danger',
                    summary: 'خطا!',
                    detail: err.response.data
                })
            })

    }

    onSelectionChange(e) {

        const { roles } = this.state
        const role = roles[e.value]
        this.setState({
            selectedRole: role,
            selectedRoleValue: JSON.parse(role.meta_value),
            condition: role.condition ? role.condition : '',
            select: (role.perm & 8) === 8,
            insert: (role.perm & 4) === 4,
            update: (role.perm & 2) === 2,
            del: (role.perm & 1) === 1,
        })
    }

    render() {

        const {
            table,
            row,
            dispatch
        } = this.props

        const {
            tree,
            roles,
            selectedRoleValue,
            condition,
            select,
            insert,
            update,
            del,
        } = this.state
        
        return  (
            <div className='p-col-12'>
                <div className='card card-w-title'>
                    <div className="card-heading">
                        <div className="card-heading-actions">
                            <Button onClick={() => dispatch({ 'mode' : '' })} label='بازگشت' className='p-button-secondary' />
                        </div>
                        <h1 className="card-heading-caption" style={{direction:'rtl'}}> 
                            نقش {row.name}
                        </h1>
                    </div>
                    <div className='p-grid'>
                        <div className='p-col-12 p-md-4'>
                            <div className="card-heading">
                                <div className="card-heading-actions"></div>
                                <h2 className="card-heading-caption"> 
                                    جداول
                                </h2>
                            </div>
                            <div className="card card-w-title">
                                <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height:'400px'}}>
                                    <TreeComponent 
                                        style={{borderColor:'#fff', padding:'0px', width:'auto'}}
                                        tree={tree} 
                                        onSelectionChange={this.onSelectionChange}
                                    />
                                </ScrollPanel>
                            </div>
                        </div>
                        <div className='p-col-12 p-md-8'>
                            
                            {selectedRoleValue &&
                                <div className="card card-w-title" style={{textAlign:'right',direction:'rtl'}}>
                                    <h2 style={{marginBottom:'18px'}}>
                                        <div>
                                            <i style={{verticalAlign:'middle'}} className='pi pi-fw pi-lock'></i>
                                            دسترسی به جدول ({selectedRoleValue.lbl})
                                        </div>
                                    </h2>
                                    <div className="p-grid">
                                        <div className="p-col-12 p-md-3">
                                            <SwitchComponent 
                                                value={select}
                                                name='select'
                                                onInputChange={this.onInputChange}
                                                label='خواندن'
                                            />
                                        </div>
                                        <div className="p-col-12 p-md-3">
                                            <SwitchComponent 
                                                value={insert}
                                                name='insert'
                                                onInputChange={this.onInputChange}
                                                label='ایجاد'
                                            />
                                        </div>
                                        <div className="p-col-12 p-md-3">
                                            <SwitchComponent 
                                                value={update}
                                                name='update'
                                                onInputChange={this.onInputChange}
                                                label='ویرایش'
                                            />
                                        </div>
                                        <div className="p-col-12 p-md-3">
                                            <SwitchComponent 
                                                value={del}
                                                name='del'
                                                onInputChange={this.onInputChange}
                                                label='حذف'
                                            />
                                        </div>
                                        <div className="p-col-12 p-md-12">
                                            <TextAreaComponent
                                                onInputChange={this.onInputChange}
                                                name='condition'
                                                value={condition}
                                                label="شرط"
                                            />
                                        </div>
                                    </div>

                                    <Button 
                                        onClick={(e) => this.onSubmit()} 
                                        label='اعمال' 
                                        className='p-button-success p-button-raised' 
                                    />

                                </div>
                            }

                            {!!!selectedRoleValue && 
                                <div className="card card-w-title ic-warning">
                                    <i className='fa fa-warning'></i>
                                    اطلاعاتی وجود ندارد
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}