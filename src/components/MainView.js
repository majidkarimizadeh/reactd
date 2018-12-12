import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import DialogComponent from './base/DialogComponent'
import TableComponent from './base/TableComponent'
import FormComponent from './base/FormComponent'
import { TableService } from '../service/TableService'
import { RowService } from '../service/RowService'
import { LookUpService } from '../service/LookUpService'
import { TabView,TabPanel } from 'primereact/tabview'
import { Growl } from 'primereact/growl'
import { Messages } from 'primereact/messages'
import { getPixelCrop } from 'react-image-crop'
import { validationErrorParser } from '../utils/parser'
import { Button } from 'primereact/button'
import { hasCustomFun } from './custom'
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

            isLoading: true,

            isSelect: false,
            mode: '',
            alertMode: '',
            options: [],
            activeDetailIndex: -1,

            baseSrc: [],
            src: [],
            crop: [
                // {
                //     x: 10,
                //     y: 10,
                //     aspect: 1,
                //     width: 50,
                // }
            ],
            customComponent: null,
            err: null,

            dataLoading: false,
            firstRow: 0,
            numRows: 9,
            totalRows: 0,
            filter: {},
            showFilter: false
        }

        this.onHideDialog = this.onHideDialog.bind(this)
        this.onShowDialog = this.onShowDialog.bind(this)
        this.onFormSubmit = this.onFormSubmit.bind(this)

        this.onTabChange = this.onTabChange.bind(this)
        this.onShowAlertDialog = this.onShowAlertDialog.bind(this)
        this.onHideAlertDialog = this.onHideAlertDialog.bind(this)
        this.onSubmitAlertDialog = this.onSubmitAlertDialog.bind(this)
        
        this.onLookUp = this.onLookUp.bind(this)
        this.refreshTab = this.refreshTab.bind(this)

        this.onRefreshTableData = this.onRefreshTableData.bind(this)

        this.onFilterInputChange = this.onFilterInputChange.bind(this)
        this.onFilterVisibilityChange = this.onFilterVisibilityChange.bind(this)

        this.onInputChange = this.onInputChange.bind(this)
        this.onSelectionChange = this.onSelectionChange.bind(this)
        this.onCustomChange = this.onCustomChange.bind(this)
        this.onLoadData = this.onLoadData.bind(this)

        this.isSelectedRow = this.isSelectedRow.bind(this)
        this.tableService = new TableService()
        this.rowService = new RowService()
        this.lookUpService = new LookUpService()
        this.queryBuilder = new QueryBuilder()

        this.onSelectFile = this.onSelectFile.bind(this)
        this.onCropRevert = this.onCropRevert.bind(this)
        this.onClearFile = this.onClearFile.bind(this)
        this.onImageLoaded = this.onImageLoaded.bind(this)
        this.onCropChange = this.onCropChange.bind(this)
        this.onCropComplete = this.onCropComplete.bind(this)
        this.makeClientCrop = this.makeClientCrop.bind(this)
        this.getCroppedImg = this.getCroppedImg.bind(this)
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
        const { data, table, cols, details } = this.props

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
            cols.map( (item, index) => filterRow[item.name] = '' )
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
        const { filterRow, table, firstRow, numRows } = this.state

        console.log(data, name)
        let filter = {...filterRow}
        filter[name] = data
        this.setState({ 
            filterRow:filter,
            dataLoading: true
        })

        let conditions = this.queryBuilder.getCondition(filter);
        this.tableService.getTableData(table.url, 0, numRows, conditions)
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
    }

    onInputChange(data, name) {
        let row = {...this.state.row}
        row[name] = data
        this.setState({ row })
    }

    onLoadData(tableUrl, first) {
        this.setState({ dataLoading: true })
        setTimeout(() => {
            const startIndex = first
            const limitIndex = this.state.numRows
        
            this.tableService.getTableData(tableUrl, startIndex, limitIndex)
                .then( res => {
                    this.setState({
                        firstRow: startIndex,
                        data: res.data,
                        dataLoading: false
                    })    
                })
                .catch( err => {
                    this.setState({ dataLoading: false })
                })

        }, 250)
    }

    onRefreshTableData() {
        const { table, firstRow, cols } = this.state
        let filterRow = {}
        cols.map( (item, index) => filterRow[item.name] = '' )
        this.setState({ filterRow }) 
        this.onLoadData(table.url, firstRow)
    }

    isSelectedRow() {
        let { isSelect } = this.state
        if(!isSelect) {
            this.growl.show({
                severity: 'warn',
                summary: 'سطر انتخاب نشده است',
                detail: 'لطفا ابتدا سطر مورد نظر خود را انتخاب کنید'
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
        cols.map( (item, index) => filterRow[item.name] = row[item.name] = '' )
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

            if(row && detailTable && detailTable.children) 
            {
                const foreignKey = detailTable.children.find( (item) => item.table === table.name)
                const rowPrimary = row[table.pk]
                conditions = [{
                    logic: 'AND',
                    cluse: [{
                        key: foreignKey.key,
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
                            totalRows: totalRows
                        })
                        this.tableService.getTableData(detailTable.url, 0, 9, conditions)
                            .then( res => this.setState({ detailData: res.data }))
                            .catch(err => this.setState({ err: err.response })  ) 
                    })
                    .catch(err => this.setState({ err: err.response })  ) 
            }

        }
    }

    onLookUp(rdf, name) {
        let { options } = this.state
        this.lookUpService.getLookUpByRdf(rdf)
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
            const { row, table } = this.state
            let apiObject = new FormData()
            apiObject.append('url', table.url)
            apiObject.append('primary', row[table.pk])
            this.rowService.deleteRow(apiObject)
                .then( (res) => {
                    this.growl.show({
                        severity: 'success',
                        summary: 'حذف',
                        detail: res.data
                    })

                    let data = [...this.state.data]
                    let index = data.indexOf(row)
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
                })
                .catch( err => {
                    window.scrollTo(0, 0)
                    if(err.response.status === 422) 
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
        const { cols, row } = this.state
        cols.forEach((item, index) => {
            if(item.controller === 'lookup') {
                this.onLookUp(item.rdf, item.name)
            }
        })
        this.setState({ 
            pureRow: row,
            mode
        })
    }

    onFormSubmit(mode) {
        const { pureRow, row, table, cols } = this.state
        let fields = []
        let apiObject = new FormData()
        this.messages.clear()

        if(mode === 'create') 
        {
            fields = table[mode]
            apiObject.append('url', table.url)

            fields.forEach( (item, index) => {
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
                    this.growl.show({
                        severity: 'success',
                        summary: 'ایجاد',
                        detail: 'عملیات با موفقیت انجام شد'
                    })
                })
                .catch( err => {
                    window.scrollTo(0, 0)
                    if(err.response.status === 422) 
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
                            summary: 'ایجاد',
                            detail: err.response.data
                        })
                    }
                })
        } 
        else if(mode === 'edit') 
        {
            fields = table[mode]
            apiObject.append('url', table.url)
            apiObject.append('primary', row[table.pk])

            fields.forEach( (item, index) => {
                let col = cols.find( (col) => col.no === item)
                apiObject.append(col.name, row[col.name])
            })
            this.rowService.updateRow(apiObject)
                .then( res => {  
                    let data = [...this.state.data]
                    let index = data.indexOf(pureRow)
                    if(index !== -1) 
                    {
                        let updatedRow = Object.assign({}, pureRow, res.data)
                        data.splice(index, 1, updatedRow)
                        this.setState({ 
                            data,
                            mode: '', 
                            pureRow: updatedRow,
                            row:updatedRow
                        }) 
                    } 
                    else 
                    {
                        this.setState({ mode: '' }) 
                    }

                    this.growl.show({
                        severity: 'success',
                        summary: 'ویرایش',
                        detail: 'عملیات با موفقیت انجام شد'
                    })

                })
                .catch( err => {
                    window.scrollTo(0, 0)
                    if(err.response.status === 422) 
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
                            summary: 'ویرایش',
                            detail: err.response.data
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
                cols.map( (item, index) => row[item.name] = '' )
                this.setState({ cols, table, details, row, perm, totalRows })
                this.tableService.getTableData(tableUrl)
                    .then( res => this.setState({ data: res.data }))
                    .catch(err => this.setState({ err: err.response })  ) 
            })
            .catch(err => this.setState({ err: err.response })  ) 
    }


    onClearFile(index) {
        let src = [...this.state.src]
        src[index] = null

        let baseSrc = [...this.state.baseSrc]
        baseSrc[index] = null

        this.setState({
            src, baseSrc
        })
    }

    onSelectFile(e, name, index) {
        if (e.files && e.files.length > 0) {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                let src = [...this.state.src]
                src[index] = reader.result

                let baseSrc = [...this.state.baseSrc]
                baseSrc[index] = reader.result

                this.setState({ src, baseSrc })
            })

            this.setState({ 
                row: {
                    ...this.state.row,
                    [name]: e.files[0]
                }
            })
            reader.readAsDataURL(e.files[0])
        }
    }

    onImageLoaded(image, pixelCrop, index) {
        this.imageRef = image

        const { crop } = this.state

        if (crop[index] && crop[index].aspect && crop[index].height && crop[index].width) {
            let crops = [...this.state.crop]
            crops[index] = { ...crop, height: null }
            this.setState({ crop: crops })
        } else {
            this.makeClientCrop(crop[index], pixelCrop, index)
        }
    }

    onCropComplete(colName, index) {
        const { crop } = this.state
        this.makeClientCrop(crop[index], getPixelCrop(this.imageRef, crop[index]), colName, index)
    }

    onCropRevert(index) {
        let src = [...this.state.src]
        src[index] = this.state.baseSrc[index]

        let crop = [...this.state.crop]
        crop[index] = {
            x: 10,
            y: 10,
            width: 50,
            height:null
        }

        this.setState({ src, crop  })
    }

    onCropChange(cr, index) {
        let crop = [...this.state.crop]
        crop[index] = cr
        this.setState({ crop })
    }

    async makeClientCrop(crop, pixelCrop, colName, index) {
        if (this.imageRef && crop && crop.width && crop.height) {
            const croppedImageUrl = await this.getCroppedImg(
                this.imageRef,
                pixelCrop,
                'newFile.jpeg',
                colName
            )

            let src = [...this.state.src]
            src[index] = croppedImageUrl

            let crops = [...this.state.crop] 
            crops[index] = {
                x: 10,
                y: 10,
                width: 50,
                height:null
            }
            this.setState({ src, crop:crops })
        }
    }

    getCroppedImg(image, pixelCrop, fileName, colName) {
        const canvas = document.createElement('canvas')
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height
        const ctx = canvas.getContext('2d')

        ctx.drawImage(
            image,
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height,
            0,
            0,
            pixelCrop.width,
            pixelCrop.height,
        )

        return new Promise((resolve, reject) => {
            canvas.toBlob(blob => {
                this.setState({
                    row: {
                        ...this.state.row,
                        [colName]: blob
                    }  
                })
                blob.name = fileName
                window.URL.revokeObjectURL(this.fileUrl)
                this.fileUrl = window.URL.createObjectURL(blob)
                resolve(this.fileUrl)
            }, 'image/jpeg')
        })
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
            showFilter

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
                        onInputChange={this.onInputChange}
                        onSubmit={this.onFormSubmit}
                        onHideDialog={this.onHideDialog}
                        onLookUp={this.onLookUp}
                        options={options}

                        baseSrc={baseSrc}
                        src={src}
                        crop={crop}
                        onSelectFile={this.onSelectFile}
                        onCropRevert={this.onCropRevert}
                        onClearFile={this.onClearFile}
                        onImageLoaded={this.onImageLoaded}
                        onCropChange={this.onCropChange}
                        onCropComplete={this.onCropComplete}
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
                                            {perm.delete && 
                                                <Button 
                                                    onClick={() => this.onShowAlertDialog('delete')}
                                                    icon="fa fa-trash"
                                                    className="p-button-secondary toolbar-btn"
                                                />
                                            }
                                            {perm.select &&
                                                <Button 
                                                    onClick={() => this.onShowDialog('view')}
                                                    icon="fa fa-eye"
                                                    className="p-button-secondary toolbar-btn"
                                                />
                                            }
                                            {perm.update &&
                                                <Button
                                                    onClick={() => this.onShowDialog('edit')}
                                                    icon="fa fa-pencil"
                                                    className="p-button-secondary toolbar-btn"
                                                />
                                            }
                                            {perm.insert &&
                                                <Button 
                                                    onClick={() => this.onShowDialog('create')}
                                                    icon="fa fa-plus"
                                                    className="p-button-secondary toolbar-btn"
                                                />
                                            }
                                            {perm.select &&
                                                <Button 
                                                    onClick={() => this.onFilterVisibilityChange() }
                                                    icon="fa fa-filter"
                                                    className="p-button-secondary toolbar-btn"
                                                />
                                            }
                                            {perm.select &&
                                                <Button 
                                                    onClick={() => this.onRefreshTableData() }
                                                    icon="fa fa-refresh"
                                                    className="p-button-secondary toolbar-btn"
                                                />
                                            }
                                            {hasCustomFun(table.name, this.onCustomChange, this.state, this.growl)}
                                        </div>
                                        <h1 className="card-heading-caption">{table.label}</h1>
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
                                                    header={item.label}
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