import React, {Component} from 'react'

import { Route, withRouter } from 'react-router-dom'
import AlertDialogComponent from './BaseComponent/AlertDialogComponent'
import DataTableComponent from './BaseComponent/DataTableComponent'
import DataFormComponent from './BaseComponent/DataFormComponent'
import DataToolBarComponent from './BaseComponent/DataToolBarComponent'

import {TableService} from '../service/TableService';
import {TabView,TabPanel} from 'primereact/tabview';
import {RowService} from '../service/RowService';
import {LookUpService} from '../service/LookUpService';
import {Growl} from 'primereact/growl';

import history from '../history'

class DataGridListView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lookups: [],

            details: [],
            data: [],
            columns: [],
            table: {},
            record: {},

            detailDetails: [],
            detailData: [],
            detailColumns: [],
            detailTable: {},
            detailRecord: {},

            isSelect: false,
            mode: '',
            alertMode: '',
            options: [],
            activeDetailIndex: -1
        };

        this.onHideDialog = this.onHideDialog.bind(this)
        this.onShowDialog = this.onShowDialog.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)

        this.onDetailTabChange = this.onDetailTabChange.bind(this)
        this.onShowAlertDialog = this.onShowAlertDialog.bind(this)
        this.onHideAlertDialog = this.onHideAlertDialog.bind(this)
        this.onSubmitAlertDialog = this.onSubmitAlertDialog.bind(this)
        
        this.onLookUp = this.onLookUp.bind(this)
        this.refreshDetailTab = this.refreshDetailTab.bind(this)

        this.onTextChange = this.onTextChange.bind(this)
        this.onSelectionChange = this.onSelectionChange.bind(this)    

        this.isSelectedRecord = this.isSelectedRecord.bind(this)
        this.tableService = new TableService()
        this.rowService = new RowService()
        this.lookUpService = new LookUpService()
    }

    componentWillMount() {
        this.getAllTableData()
    }

    componentDidUpdate(prevProps) {
        const { data, table, columns, details } = this.props;

        if (prevProps.data !== data) 
        {
            this.setState({ data })
        }
        if (prevProps.table !== table) 
        {
            this.setState({ table })
        }
        if (prevProps.columns !== columns) 
        {
            this.setState({ columns })
        }
        if (prevProps.details !== details) 
        {
            this.setState({ details })
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

    onDetailTabChange(e) {
        const { details, table, record } = this.state
        const { match } = this.props
        const activeDetailIndex = e.index
        const detailTable = details[activeDetailIndex];

        this.setState({ activeDetailIndex })
        history.push(match.url + "/" + detailTable.url)

        let recordPrimary = null
        let foreignKey = null

        if(record && detailTable.foreigns) {
            foreignKey = detailTable.foreigns.find( (item) => item.table === table.name)
            recordPrimary = record[table.pk]
        }

        this.tableService.getAllDataColumn(detailTable.name, recordPrimary, foreignKey.key)
            .then( ({ details, data, columns, table }) => { 
                this.setState({ 
                    detailDetails: details,
                    detailData: data,
                    detailColumns: columns,
                    detailTable: table,
                })
            })
    }

    refreshDetailTab(record) {
        const { details, table, activeDetailIndex } = this.state;

        const detailTable = details[activeDetailIndex];
        let foreignKey = null
        let recordPrimary = null

        if(record && detailTable.foreigns) {
            foreignKey = detailTable.foreigns.find( (item) => item.table === table.name)
            recordPrimary = record[table.pk]
        }

        if(activeDetailIndex !== -1) {
            this.tableService.getAllDataColumn(detailTable.url, recordPrimary, foreignKey.key)
                .then( ({ details, data, columns, table }) => { 
                    this.setState({ 
                        detailDetails: details,
                        detailData: data,
                        detailColumns: columns,
                        detailTable: table,
                    })
                })
        }
    }

    onLookUp(rdf) {
        this.lookUpService.getLookUpByRdf(rdf)
            .then( options => this.setState({ options }) )
    }

    onShowAlertDialog(mode) {
        if(!this.isSelectedRecord()) {
            return
        }
        this.setState({ alertMode: mode })
    }

    onHideAlertDialog() {
        this.setState({ alertMode: '' })
    }

    onSubmitAlertDialog(mode) {
        if(mode === 'delete') {
            const { record, table } = this.state;
            this.rowService.deleteRow(table.name, record[table.pk])
                .then( (res) => { 
                    this.onHideAlertDialog()
                    if(res.status === 'error') {
                        this.growl.show({
                            severity: 'error',
                            summary: 'Error Message',
                            detail: res.data
                        });
                        return false
                    } else {
                        this.growl.show({
                            severity: 'success',
                            summary: 'Success Message',
                            detail: res.data
                        });

                        let data = [...this.state.data];
                        let index = data.indexOf(record);
                        if(index !== -1) {
                            data.splice(index, 1)
                            let { columns } = this.state
                            let emptyRecord = {}
                            columns.map( (item, index) => emptyRecord[item.name] = '' )
                            this.setState({ 
                                data,
                                isSelect: false,
                                record: emptyRecord
                            })
                        }
                    }
                })
        }
    }

    onHideDialog() {
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
        this.refreshDetailTab(e.data);
    }

    getAllTableData(tName = null) {

        let tableName = this.props.match.params.table
        if(tName) {
            tableName = tName;
        } 

        this.tableService.getAllDataColumn(tableName)
            .then(({data, table, columns, details })  =>  {
                let record = {}
                columns.map( (item, index) => record[item.name] = '' )
                this.setState({ columns, table, data, details, record })

                // this.tableService.getAllDetailData(table.details)
                //     .then( ({ detailData, detailColumns, detailTable, details }) => { 
                //         this.setState({ 
                //             detailData,
                //             detailColumns,
                //             detailTable,
                //             details
                //         })
                //     })
            })
    }

    render() {

        const { 

            data, 
            columns, 
            table,
            record,
            mode,
            alertMode,
            options,
            details,
            activeDetailIndex,

            detailDetails,
            detailData,
            detailColumns,
            detailTable,
            detailRecord,

        } = this.state

        const { match } = this.props

        return (
            <div className="p-grid">
                <Growl ref={(el) => this.growl = el}></Growl>

                <AlertDialogComponent
                    onHideAlertDialog={this.onHideAlertDialog}
                    onCancel={this.onHideAlertDialog}
                    onSubmit={this.onSubmitAlertDialog}
                    mode={alertMode}
                />

                <DataFormComponent
                    label={table.label}
                    table={table}
                    columns={columns}
                    mode={mode}
                    record={record}
                    onChange={this.onTextChange}
                    onSubmit={this.onFormSubmit}
                    onHideDialog={this.onHideDialog}
                    onLookUp={this.onLookUp}
                    options={options}
                />

                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1 style={{textAlign:'right'}}>{table.label}</h1>

                        <DataToolBarComponent
                            onShowDialog={this.onShowDialog}
                            onShowAlertDialog={this.onShowAlertDialog}
                        />

                        <DataTableComponent 
                            details={details}
                            data={data}
                            columns={columns}
                            table={table}
                            record={record}
                            onSelectionChange={this.onSelectionChange}
                        />
                        
                    </div>
                </div>

                {!!details.length &&
                    <div className="p-col-12">
                        <div className="card card-w-title">
                            <TabView
                                activeIndex={activeDetailIndex}
                                onTabChange={this.onDetailTabChange}
                                style={{textAlign: 'right'}}
                            >
                                {details.map( (item, index) => {
                                    return (
                                        <TabPanel 
                                            key={index}
                                            header={item.label} 
                                            contentStyle={{padding:'10px 0px'}}
                                            headerStyle={{float:'right', margin:'0px 0px 0px 2px', top:'0px'}}
                                        >
                                            <Route
                                                path={`${match.url}/:table`}
                                                render={ props => {
                                                    return <DataGridListView 
                                                        data={detailData}
                                                        table={detailTable}
                                                        columns={detailColumns}
                                                        record={detailRecord}
                                                        details={detailDetails}
                                                        {...props} 
                                                    />
                                                }}
                                            />
                                        </TabPanel>
                                    )
                                })}
                            </TabView>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default withRouter(DataGridListView)