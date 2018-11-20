import React, {Component} from 'react'

import DataTableComponent from './BaseComponent/DataTableComponent'
import DataFormComponent from './BaseComponent/DataFormComponent'
import DataToolBarComponent from './BaseComponent/DataToolBarComponent'

import {TableService} from '../service/TableService';
import {RowService} from '../service/RowService';
import {Growl} from 'primereact/growl';

export class DataGridListView extends Component {

    constructor() {
        super();
        this.state = {
            data:[],
            columns:[],
            table: {},
            record: {},
            isSelect: false,
            mode: '',
        };

        this.onHideDialog = this.onHideDialog.bind(this)
        this.onShowDialog = this.onShowDialog.bind(this)
        this.onTextChange = this.onTextChange.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onSelectionChange = this.onSelectionChange.bind(this)    

        this.isSelectedRecord = this.isSelectedRecord.bind(this)
        this.tableService = new TableService()
        this.rowService = new RowService()
    }

    componentDidMount() {
        this.getAllTableData()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.table !== this.props.match.params.table) {
            this.getAllTableData()
        }
    }

    isSelectedRecord() {
        let { isSelect } = this.state
        if(!isSelect) {
            this.growl.show({
                severity: 'warn',
                summary: 'Record not found',
                detail: 'please select record'
            });
            return false
        }
        return true
    }

    onHideDialog(mode) {
        this.setState({ mode: '' })
    }

    onShowDialog(mode) {
        if(mode === 'create') {
            let { columns } = this.state
            let record = {}
            columns.map( (item, index) => record[item.name] = '' )
            this.setState({ mode, record, isSelect: false })
            return
        }
        if(!this.isSelectedRecord()) {
            return
        }
        this.setState({ mode })
    }

    onFormSubmit(mode) {
        const { record, table, columns } = this.state

        let fields = [];
        let apiObject = {};

        if(mode === 'create') {
            fields = table[mode];
            fields.map( (item, index) => {
                let column = columns.find( (col) => col.no === item)
                apiObject[column.name] = record[column.name]
            })
            this.rowService.storeRow(table.name, apiObject)
                .then( res => {
                    this.setState({
                        data: [
                            res.data,
                            ...this.state.data
                        ],
                        mode: ''
                    })
                })
        } else if(mode === 'edit') {
            fields = table[mode];
            fields.map( (item, index) => {
                let column = columns.find( (col) => col.no === item)
                apiObject[column.name] = record[column.name]
            })
            this.rowService.updateRow(table.name, record[table.pk], apiObject)
                .then( (res) => {  this.setState({ mode: '' }) })
        }
    }

    onTextChange(e) {
        let { record } = this.state
        record[e.target.name] = e.target.value
        this.setState({ record })
    }

    onSelectionChange(e) {
        Object.keys(e.data).forEach(key => {
            if (typeof e.data[key] === 'object' && e.data[key] === null) {
                e.data[key] = ''
            }
        })

        this.setState({
            record: e.data,
            isSelect: true
        })
    }

    getAllTableData() {
        let tableName = this.props.match.params.table
        this.tableService.getAllDataColumn(tableName)
            .then(({data, table, columns})  =>  {
                let record = {}
                columns.map( (item, index) => record[item.name] = '' )
                this.setState({ columns, table, data, record})
            })
    }

    render() {

        const { 

            data, 
            columns, 
            table,
            record,
            mode,

        } = this.state

        return (
            <div className="p-grid">
                <Growl ref={(el) => this.growl = el}></Growl>

                <DataFormComponent 
                    label={table.label}
                    table={table}
                    columns={columns}
                    mode={mode}
                    record={record}
                    onChange={this.onTextChange}
                    onSubmit={this.onFormSubmit}
                    onHideDialog={this.onHideDialog}
                />

                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1 style={{textAlign:'right'}}>{table.label}</h1>

                        <DataToolBarComponent
                            onShowDialog={this.onShowDialog}
                        />

                        <DataTableComponent 
                            data={data}
                            columns={columns}
                            table={table}
                            record={record}
                            onSelectionChange={this.onSelectionChange}
                        />
                        
                    </div>
                </div>
            </div>
        );
    }
}