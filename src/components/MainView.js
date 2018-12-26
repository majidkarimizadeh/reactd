import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import DialogComponent from './base/DialogComponent'
import TableComponent from './base/TableComponent'
import FormComponent from './base/FormComponent'
import LanguageSelector from './partial/LanguageSelector'
import { TableService } from '../service/TableService'
import { RowService } from '../service/RowService'
import { LookUpService } from '../service/LookUpService'
import { TabView,TabPanel } from 'primereact/tabview'
import { Growl } from 'primereact/growl'
import { Messages } from 'primereact/messages'
import { getPixelCrop } from 'react-image-crop'
import { validationErrorParser } from '../utils/parser'
import { hasCustomFun, getCustomForm } from './custom'
import { EQ } from '../utils/config'
import QueryBuilder from '../utils/queryBuilder'
import Loader from 'react-loader-spinner'
import history from '../utils/history'
import $ from 'jquery'
window.$ = $

class MainView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            lookups: [],
            perm: {},

            details: [],
            data: [],
            cols: [],
            table: {},
            row: {},
            filterRow: {},
            pureRow: {},

            detailDetails: [],
            detailData: [],
            detailCols: [],
            detailTable: {},
            detailRow: {},
            detailTotalRows: 0,

            isLoading: true,

            isSelect: false,
            mode: '',
            alertMode: '',
            options: [],
            activeDetailIndex: -1,

            customComponent: null,
            err: null,

            dataLoading: false,
            firstRow: 0,
            numRows: 9,
            totalRows: 0,
            filter: {},
            showFilter: false,

            isMapLoaded: false,
            lang: '',
        }

        this.onCancelForm = this.onCancelForm.bind(this)
        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.onShowDialog = this.onShowDialog.bind(this)

        this.onTabChange = this.onTabChange.bind(this)
        this.onShowAlertDialog = this.onShowAlertDialog.bind(this)
        this.onHideAlertDialog = this.onHideAlertDialog.bind(this)
        this.onSubmitAlertDialog = this.onSubmitAlertDialog.bind(this)
        
        this.onLookUp = this.onLookUp.bind(this)
        this.refreshTab = this.refreshTab.bind(this)

        this.onRefreshTableData = this.onRefreshTableData.bind(this)

        this.onFilterInputChange = this.onFilterInputChange.bind(this)
        this.onFilterVisibilityChange = this.onFilterVisibilityChange.bind(this)

        this.onSelectionChange = this.onSelectionChange.bind(this)
        this.onCustomChange = this.onCustomChange.bind(this)
        this.onLoadData = this.onLoadData.bind(this)

        this.isSelectedRow = this.isSelectedRow.bind(this)
        this.tableService = new TableService()
        this.rowService = new RowService()
        this.lookUpService = new LookUpService()
        this.queryBuilder = new QueryBuilder()

        this.onLanguageChange = this.onLanguageChange.bind(this)
    }

    componentWillMount() {
        this.getTableInfo()
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ isLoading: false })
        }, 500)
    }

    componentWillUpdate(prevProps) {
        if(prevProps.match.params.table !== this.props.match.params.table)
        {
            this.setState({ 
                isLoading: true,
                mode: '',
                isSelect: false
            })
            this.messages.clear()
        }
    }

    componentDidUpdate(prevProps) {
        const { data, table, cols, details, totalRows } = this.props

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
        if (prevProps.totalRows !== totalRows) 
        {
            this.setState({ totalRows })
        }

        if(prevProps.match.params.table !== this.props.match.params.table)
        {
            setTimeout(() => {
                this.setState({ isLoading: false })
            }, 500)
            window.scrollTo(0, 0)
            this.getTableInfo()
        }
    }

    onFilterVisibilityChange() {
        const { cols, showFilter } = this.state
        let filterRow = {}
        if(!showFilter)
        {
            cols.map( (item, index) => filterRow[item.nme] = '' )
        }
        this.setState({
            showFilter: !showFilter,
            filterRow
        }) 
    }

    onCustomChange( newState ) {
        this.setState(newState) 
    }

    onFilterInputChange(data, name) {
        const { filterRow, table, firstRow, numRows, lang } = this.state
        let filter = {...filterRow}
        filter[name] = data
        this.setState({ 
            filterRow: filter,
            dataLoading: true
        })

        setTimeout( () => {
            let conditions = this.queryBuilder.getCondition(filter);
            let options = {
                lang: lang,
                start: 0,
                limit: numRows,
                conditions: conditions
            }
            this.tableService.getTableData(table.url, options)
                .then( res => {
                    this.setState({ 
                        data: res.data,
                        totalRows: res.totalRows,
                        dataLoading: false
                    })   
                })
                .catch(err => {
                    this.setState({ 
                        err: err.response,
                        dataLoading: false
                    })
                }) 
        }, 500)
    }

    onLoadData(tableUrl, first) {
        this.setState({ dataLoading: true })

        setTimeout(() => {
            const { showFilter, filterRow,  numRows } = this.state
            const startIndex = first
            const limitIndex = numRows
            let options = {
                lang: this.state.lang,
                start: startIndex,
                limit: limitIndex,
            }

            if(showFilter) 
            {
                let conditions = this.queryBuilder.getCondition(filterRow);
                options['conditions'] = conditions
            }

            this.tableService.getTableData(tableUrl, options)
                .then( res => {
                    this.setState({
                        firstRow: startIndex,
                        data: res.data,
                        dataLoading: false,
                        totalRows: res.totalRows
                    })    
                })
                .catch( err => {
                    this.setState({ dataLoading: false })
                })

        }, 250)
    }

    onRefreshTableData() {
        const { table, firstRow } = this.state
        this.setState({ 
            showFilter: false,
            row: {},
            isSelect: false
        }) 
        this.onLoadData(table.url, firstRow)
    }

    isSelectedRow() {
        let { isSelect } = this.state
        if(!isSelect) {
            this.growl.show({
                severity: 'warn',
                summary: 'Not found record',
                detail: 'Please select record'
            })
            return false
        }
        return true
    }

    onTabChange(e) {
        const { details, cols } = this.state
        const { match } = this.props
        const activeDetailIndex = e.index
        const detailTable = details[activeDetailIndex]
        let row = {}
        let filterRow = {}
        cols.map( (item, index) => filterRow[item.nme] = row[item.nme] = '' )
        this.setState({ 
            activeDetailIndex,
            row, 
            filterRow,
            isSelect: false
        })
        history.push(match.url + "/" + detailTable.url)
    }

    refreshTab(row) {
        const { details, table, activeDetailIndex } = this.state
        if(activeDetailIndex !== -1) {

            const detailTable = details[activeDetailIndex]
            let conditions = [];
            if(row && detailTable && detailTable.chl) 
            {
                const foreignKey = detailTable.chl[table.nme]
                const rowPrimary = row[table.pk]
                conditions = [{
                    logic: 'AND',
                    cluse: [{
                        key: foreignKey,
                        op: EQ,
                        value: rowPrimary
                    }]
                }]

                this.tableService.getTableInfo(detailTable.url)
                    .then( ({ details, cols, table, totalRows }) => { 
                        this.setState({ 
                            detailDetails: details,
                            detailCols: cols,
                            detailTable: table,
                            detailTotalRows: totalRows
                        })
                        let options = {
                            lang: this.state.lang,
                            start: 0,
                            limit: 9,
                            conditions: conditions
                        }
                        this.tableService.getTableData(detailTable.url, options)
                            .then( res => this.setState({ detailData: res.data }))
                            .catch(err => this.setState({ err: err.response })  ) 
                    })
                    .catch(err => this.setState({ err: err.response })  ) 
            }

        }
    }

    onLanguageChange(lang, refreshData = true) {
        if(refreshData) 
        {
            if(lang) 
            {
                this.setState({ lang })
            }
            this.onRefreshTableData()
        }
        else
        {
            const { row, table, mode, cols } = this.state
            if(mode !== 'create') 
            {
                let apiObject = new FormData()
                apiObject.append('url', table.url)
                apiObject.append('lang', lang)
                apiObject.append('primary', row[table.pk])
                apiObject.append('mode', (mode == 'edit') ? 'edt' : 'shw')
                this.rowService.getRow(apiObject)
                    .then( res => {
                        let resRow = res.data
                        let newRow = {}
                        cols.forEach(col => {
                            if(col.nme in resRow && resRow[col.nme] !== null)  
                            {
                                newRow[col.nme] = resRow[col.nme]
                            }
                            else 
                            {
                                newRow[col.nme] = ('trs' in col) ? '' : row[col.nme]
                            }
                        })
                        this.setState({ row: newRow })
                        if(lang) 
                        {
                            this.setState({ lang })
                        }
                    })
            }
        }
    }

    onLookUp(rdf, name) {
        let { options, lang } = this.state
        let apiObject = new FormData();
        apiObject.append('rdf', rdf)
        if(lang) 
        {
            apiObject.append('lang', lang)
        }
        this.lookUpService.getLookUpByRdf(apiObject)
            .then( opts => {
                options[name] = opts
                this.setState({ options }) 
            })
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
        if(mode === 'delete') 
        {
            const { row, table, lang } = this.state
            let apiObject = new FormData()
            apiObject.append('url', table.url)
            apiObject.append('primary', row[table.pk])
            if(lang) 
            {
                apiObject.append('lang', lang)
            }
            this.rowService.deleteRow(apiObject)
                .then( (res) => {
                    this.growl.show({
                        severity: 'success',
                        summary: 'حذف',
                        detail: res.data.result
                    })

                    let data = [...this.state.data]
                    let index = data.indexOf(row)
                    if(index !== -1) {
                        data.splice(index, 1)
                        let { cols } = this.state
                        let emptyRow = {}
                        cols.map( (item, index) => emptyRow[item.nme] = '' )
                        this.setState({ 
                            data,
                            isSelect: false,
                            row: emptyRow
                        })
                    }
                })
                .catch( err => {
                    window.scrollTo(0, 0)
                    if(err.response && err.response.status === 422) 
                    {
                        this.messages.show({
                            severity: 'error',
                            sticky: true,
                            detail: validationErrorParser(err.response.data)
                        })
                    } 
                    else 
                    {
                        this.growl.show({
                            severity: 'error',
                            summary: 'حذف',
                            detail: err.response.data
                        })
                    }
                })
            this.onHideAlertDialog()
        }
    }

    onCancelForm() {
        this.setState({ mode: '' })
        this.messages.clear()
        const { lang } = this.state
        if(lang)
        {
            this.onLanguageChange(lang)
        }
    }

    onShowDialog(mode) {
        if(mode === 'create') 
        {
            let { cols } = this.state
            let row = {}
            cols.map( (item, index) => row[item.nme] = '' )
            this.setState({ mode, row, isSelect: false })
            return
        }
        else if(mode === 'custom')
        {
            const { table } = this.state
            this.setState({
                mode,
                customComponent: getCustomForm(table, this.state, this.onCustomChange)
            })
        } 
        else 
        {
            if(!this.isSelectedRow()) {
                return
            }
            const { cols, row } = this.state
            cols.forEach((item, index) => {
                if(item.controller === 'lookup') {
                    this.onLookUp(item.rdf, item.nme)
                }
            })
            this.setState({ 
                pureRow: row,
                mode
            })
        }

    }

    onSubmitForm(filledRow, mode) {
        const { pureRow, table, cols, lang } = this.state
        let fields = []
        let apiObject = new FormData()
        if(lang) 
        {
            apiObject.append('lang', lang)
        }
        this.messages.clear()

        if(mode === 'create') 
        {
            fields = table.crt
            apiObject.append('url', table.url)

            fields.forEach( (item, index) => {
                let col = cols.find( (col) => col.no === item)
                apiObject.append(col.nme, filledRow[col.nme])
            })
            this.rowService.storeRow(apiObject)
                .then( res => {
                    this.setState({
                        data: [
                            res.data.result,
                            ...this.state.data
                        ],
                        mode: ''
                    })
                    this.growl.show({
                        severity: 'success',
                        summary: 'ایجاد',
                        detail: 'عملیات با موفقیت انجام شد'
                    })
                })
                .catch( err => {
                    window.scrollTo(0, 0)
                    let errData = err.response.data
                    if(err.response.status === 422) 
                    {
                        this.messages.show({
                            severity: 'error',
                            sticky: true,
                            detail: validationErrorParser(errData.result)
                        })
                    } 
                    else
                    {
                        this.growl.show({
                            severity: 'error',
                            summary: 'Error !',
                            detail: errData.message
                        })
                    }
                })
        } 
        else if(mode === 'edit') 
        {
            fields = table.edt
            apiObject.append('url', table.url)
            apiObject.append('primary', filledRow[table.pk])

            fields.forEach( (item, index) => {
                let col = cols.find( (col) => col.no === item)
                apiObject.append(col.nme, filledRow[col.nme])
            })
            this.rowService.updateRow(apiObject)
                .then( res => {  
                    this.onRefreshTableData()
                    // let data = [...this.state.data]
                    // let index = data.indexOf(pureRow)
                    // if(index !== -1) 
                    // {
                    //     let updatedRow = Object.assign({}, pureRow, res.data.result)
                    //     data.splice(index, 1, updatedRow)
                    //     this.setState({ 
                    //         data,
                    //         mode: '', 
                    //         pureRow: updatedRow,
                    //         row: updatedRow
                    //     }) 
                    // } 
                    // else 
                    // {
                        this.setState({ mode: '' }) 
                    // }

                    this.growl.show({
                        severity: 'success',
                        summary: 'ویرایش',
                        detail: 'عملیات با موفقیت انجام شد'
                    })

                })
                .catch( err => {
                    window.scrollTo(0, 0)
                    let errData = err.response.data
                    if(err.response.status === 422) 
                    {
                        this.messages.show({
                            severity: 'error',
                            sticky: true,
                            detail: validationErrorParser(errData.result)
                        })
                    } 
                    else 
                    {
                        this.growl.show({
                            severity: 'error',
                            summary: 'Error !',
                            detail: errData.message
                        })
                    }

                })
        }
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
        this.refreshTab(e.data)
    }

    getTableInfo() {
        let tableUrl = this.props.match.params.table
        this.tableService.getTableInfo(tableUrl)
            .then(({ table, cols, details, perm, totalRows })  =>  {
                let row = {}
                cols.map( (item, index) => row[item.nme] = '' )
                this.setState({ cols, table, details, row, perm, totalRows })
                let lang = this.state.lang;
                this.tableService.getTableData(tableUrl, { lang: lang })
                    .then( res => this.setState({ data: res.data }))
                    .catch(err => this.setState({ err: err.response })  ) 
            })
            .catch(err => this.setState({ err: err.response })  ) 
    }

    render() {
    
        const { 
            err,
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
            detailTotalRows,
            baseSrc,
            src,
            crop,
            isLoading,
            customComponent,
            perm,
            dataLoading,
            firstRow,
            numRows,
            totalRows,
            filterRow,
            showFilter,
            isMapLoaded,
            lang,
        } = this.state

        const { match } = this.props

        if (err) {
            throw err
        }
        return (
            <div>
                <Growl ref={(el) => this.growl = el}></Growl>
                <Messages className='validation-error' ref={(el) => this.messages = el}></Messages>
                <DialogComponent
                    onHideAlertDialog={this.onHideAlertDialog}
                    onCancel={this.onHideAlertDialog}
                    onSubmit={this.onSubmitAlertDialog}
                    mode={alertMode}
                />
                {(mode && mode !== 'custom') &&
                    <FormComponent
                        table={table}
                        cols={cols}
                        mode={mode}
                        row={row}
                        lang={lang}
                        onSubmitForm={this.onSubmitForm}
                        onCancelForm={this.onCancelForm}
                        onLanguageChange={this.onLanguageChange}
                    />
                }

                {(mode && mode === 'custom') &&
                    <div> {customComponent} </div>
                }

                {!mode && 
                    <div className="p-col-12">
                        <div className="p-col-12" style={{textAlign:'center', padding:'0px'}}>
                            <div className="card card-w-title">
                            {isLoading && 
                                <Loader 
                                    type="Puff"
                                    color="#5867dd"
                                    height="100"   
                                    width="100"
                                />
                            }
                            {!isLoading &&
                                <div>
                                    <div className="card-heading">
                                        <div className="card-heading-actions">
                                            {table.trs && 
                                                <LanguageSelector
                                                    value={lang}
                                                    onLanguageChange={this.onLanguageChange}
                                                />
                                            }
                                            {hasCustomFun(table.nme, this.onCustomChange, this.state, this.growl)}
                                        </div>
                                        <h1 className="card-heading-caption">{table.lbl}</h1>
                                    </div>
                                    <TableComponent 
                                        details={details}
                                        data={data}
                                        cols={cols}
                                        table={table}
                                        row={row}
                                        filterRow={filterRow}
                                        onSelectionChange={this.onSelectionChange}
                                        dataLoading={dataLoading}
                                        firstRow={firstRow}
                                        numRows={numRows}
                                        totalRows={totalRows}
                                        onLoadData={this.onLoadData}
                                        onLookUp={this.onLookUp}
                                        onFilterInputChange={this.onFilterInputChange}
                                        options={options}
                                        showFilter={showFilter}
                                        perm={perm}
                                        onShowAlertDialog={this.onShowAlertDialog}
                                        onShowDialog={this.onShowDialog}
                                        onFilterVisibilityChange={this.onFilterVisibilityChange}
                                        onRefreshTableData={this.onRefreshTableData}
                                    />
                                </div>
                            }
                            </div>
                        </div>

                        {(!!details.length && !isLoading) &&
                            <div className="p-col-12" style={{padding:'0px'}}>
                                <div className="card card-w-title">
                                    <TabView
                                        activeIndex={activeDetailIndex}
                                        onTabChange={this.onTabChange}
                                        style={{textAlign: 'right'}}
                                        className="tab-table-view"
                                    >
                                        {details.map( (item, index) => {
                                            return (
                                                <TabPanel 
                                                    key={index}
                                                    header={item.lbl}
                                                    contentStyle={{borderColor:'red'}}
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
                                                                totalRows={detailTotalRows}
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
                }
            </div>
        )
    }
}

export default withRouter(MainView)