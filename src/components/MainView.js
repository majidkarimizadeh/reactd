import React, { Component } from 'react'

import { Route, withRouter } from 'react-router-dom'

import AlertDialogComponent from './Base/AlertDialogComponent'
import TableComponent from './Base/TableComponent'
import FormComponent from './Base/FormComponent'
import ToolBarComponent from './Base/ToolBarComponent'

import { TableService } from '../service/TableService';
import { RowService } from '../service/RowService';
import { LookUpService } from '../service/LookUpService';

import { TabView,TabPanel } from 'primereact/tabview';
import { Growl } from 'primereact/growl';

import history from '../history'

class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            lookups: [],

            details: [],
            data: [],
            cols: [],
            table: {},
            row: {},

            detailDetails: [],
            detailData: [],
            detailCols: [],
            detailTable: {},
            detailRow: {},

            isSelect: false,
            mode: '',
            alertMode: '',
            options: [],
            activeDetailIndex: -1,

            cropWindowVisibles: [],
            imageUrls: [],

        }

        this.onHideDialog = this.onHideDialog.bind(this)
        this.onShowDialog = this.onShowDialog.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onInputFileChange = this.onInputFileChange.bind(this)        

        this.onDetailTabChange = this.onDetailTabChange.bind(this)
        this.onShowAlertDialog = this.onShowAlertDialog.bind(this)
        this.onHideAlertDialog = this.onHideAlertDialog.bind(this)
        this.onSubmitAlertDialog = this.onSubmitAlertDialog.bind(this)
        
        this.onLookUp = this.onLookUp.bind(this)
        this.refreshDetailTab = this.refreshDetailTab.bind(this)

        this.onTextChange = this.onTextChange.bind(this)
        this.onSelectionChange = this.onSelectionChange.bind(this)    

        this.isSelectedRow = this.isSelectedRow.bind(this)
        this.tableService = new TableService()
        this.rowService = new RowService()
        this.lookUpService = new LookUpService()
    }

    componentWillMount() {
        this.getAllTableData()
    }

    componentDidUpdate(prevProps) {
        const { data, table, cols, details } = this.props;

        if (prevProps.data !== data) 
        {
            this.setState({ data })
        }
        if (prevProps.table !== table) 
        {
            this.setState({ table })
        }
        if (prevProps.cols !== cols) 
        {
            this.setState({ cols })
        }
        if (prevProps.details !== details) 
        {
            this.setState({ details })
        }
    }

    isSelectedRow() {
        let { isSelect } = this.state
        if(!isSelect) {
            this.growl.show({
                severity: 'warn',
                summary: 'Row not found',
                detail: 'please select row'
            });
            return false
        }
        return true
    }

    onDetailTabChange(e) {
        const { details, table, row } = this.state
        const { match } = this.props
        const activeDetailIndex = e.index
        const detailTable = details[activeDetailIndex];

        this.setState({ activeDetailIndex })
        history.push(match.url + "/" + detailTable.url)

        let rowPrimary = null
        let foreignKey = null

        if(row && detailTable.foreigns) {
            foreignKey = detailTable.foreigns.find( (item) => item.table === table.name)
            rowPrimary = row[table.pk]
        }

        this.tableService.getAllDataCol(detailTable.name, rowPrimary, foreignKey.key)
            .then( ({ details, data, cols, table }) => { 
                this.setState({ 
                    detailDetails: details,
                    detailData: data,
                    detailCols: cols,
                    detailTable: table,
                })
            })
    }

    refreshDetailTab(row) {
        const { details, table, activeDetailIndex } = this.state;

        if(activeDetailIndex !== -1) {

            const detailTable = details[activeDetailIndex];
            let foreignKey = null
            let rowPrimary = null

            if(row && detailTable.foreigns) {
                foreignKey = detailTable.foreigns.find( (item) => item.table === table.name)
                rowPrimary = row[table.pk]
            }

            this.tableService.getAllDataCol(detailTable.url, rowPrimary, foreignKey.key)
                .then( ({ details, data, cols, table }) => { 
                    this.setState({ 
                        detailDetails: details,
                        detailData: data,
                        detailCols: cols,
                        detailTable: table,
                    })
                })
        }
    }

    onInputFileChange(e, index, name) {
        if(e.files && e.files[0]) 
        {
            let cropWindowVisibles = [...this.state.cropWindowVisibles];
            cropWindowVisibles[index] = true
            let imageUrls = [...this.state.imageUrls];

            imageUrls[index] = e.files[0].objectURL
            this.setState({ 
                cropWindowVisibles,
                imageUrls,
                row: {
                    ...this.state.row,
                    [name]: e.files[0]
                }
            })
        }
    }

    onLookUp(rdf) {
        this.lookUpService.getLookUpByRdf(rdf)
            .then( options => this.setState({ options }) )
    }

    onShowAlertDialog(mode) {
        if(!this.isSelectedRow()) {
            return
        }
        this.setState({ alertMode: mode })
    }

    onHideAlertDialog() {
        this.setState({ alertMode: '' })
    }

    onSubmitAlertDialog(mode) {
        if(mode === 'delete') {
            const { row, table } = this.state;
            this.rowService.deleteRow(table.name, row[table.pk])
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
                        let index = data.indexOf(row);
                        if(index !== -1) {
                            data.splice(index, 1)
                            let { cols } = this.state
                            let emptyRow = {}
                            cols.map( (item, index) => emptyRow[item.name] = '' )
                            this.setState({ 
                                data,
                                isSelect: false,
                                row: emptyRow
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
            let { cols } = this.state
            let row = {}
            cols.map( (item, index) => row[item.name] = '' )
            this.setState({ mode, row, isSelect: false })
            return
        }
        if(!this.isSelectedRow()) {
            return
        }
        this.setState({ mode })
    }

    onFormSubmit(mode) {
        const { row, table, cols } = this.state

        let fields = [];
        let apiObject = new FormData();

        if(mode === 'create') {
            fields = table[mode];
            apiObject.append('table_name', table.name)

            fields.map( (item, index) => {
                let col = cols.find( (col) => col.no === item)
                apiObject.append(col.name, row[col.name])
            })
            this.rowService.storeRow(apiObject)
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
            apiObject.append('table_name', table.name)
            apiObject.append('table_id', row[table.pk])

            fields.map( (item, index) => {
                let col = cols.find( (col) => col.no === item)
                apiObject.append(col.name, row[col.name])
            })
            this.rowService.updateRow(apiObject)
                .then( (res) => {  this.setState({ mode: '' }) })
        }
    }

    onTextChange(e) {
        let { row } = this.state
        row[e.target.name] = e.target.value
        this.setState({ row })
    }

    onSelectionChange(e) {
        Object.keys(e.data).forEach(key => {
            if (typeof e.data[key] === 'object' && e.data[key] === null) {
                e.data[key] = ''
            }
        })

        this.setState({
            row: e.data,
            isSelect: true
        })
        this.refreshDetailTab(e.data);
    }

    getAllTableData(tName = null) {

        let tableName = this.props.match.params.table
        if(tName) {
            tableName = tName;
        } 

        this.tableService.getAllDataCol(tableName)
            .then(({data, table, cols, details })  =>  {
                let row = {}
                cols.map( (item, index) => row[item.name] = '' )
                this.setState({ cols, table, data, details, row })

                // this.tableService.getAllDetailData(table.details)
                //     .then( ({ detailData, detailCols, detailTable, details }) => { 
                //         this.setState({ 
                //             detailData,
                //             detailCols,
                //             detailTable,
                //             details
                //         })
                //     })
            })
    }

    render() {

        const { 

            data, 
            cols, 
            table,
            row,
            mode,
            alertMode,
            options,
            details,
            activeDetailIndex,

            detailDetails,
            detailData,
            detailCols,
            detailTable,
            detailRow,
            cropWindowVisibles,
            imageUrls,

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

                <FormComponent
                    label={table.label}
                    table={table}
                    cols={cols}
                    mode={mode}
                    row={row}
                    onChange={this.onTextChange}
                    onSubmit={this.onFormSubmit}
                    onHideDialog={this.onHideDialog}
                    onLookUp={this.onLookUp}
                    options={options}
                    onInputFileChange={this.onInputFileChange}
                    cropWindowVisibles={cropWindowVisibles}
                    imageUrls={imageUrls}
                />

                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1 style={{textAlign:'right'}}>{table.label}</h1>

                        <ToolBarComponent
                            onShowDialog={this.onShowDialog}
                            onShowAlertDialog={this.onShowAlertDialog}
                        />

                        <TableComponent 
                            details={details}
                            data={data}
                            cols={cols}
                            table={table}
                            row={row}
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
                                                    return <MainView 
                                                        data={detailData}
                                                        table={detailTable}
                                                        cols={detailCols}
                                                        row={detailRow}
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

export default withRouter(MainView)