import React, { Component } from 'react'
import DataViewComponent from '../base/DataViewComponent'
import QueryBuilder from '../../utils/queryBuilder'
import { Lightbox } from 'primereact/lightbox';
import { DataScroller } from 'primereact/datascroller';
import { TableService } from '../../service/TableService'
import { colParser, tableParser } from '../../utils/parser'
import { Button } from 'primereact/button'
import Loader from 'react-loader-spinner'

export default class GalleryComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            cols: [],
            table: {},
            row: {},
            totalRows:0,
            firstRow: 0,
            dataLoading: false,
        }
        this.tableService = new TableService()
        this.queryBuilder = new QueryBuilder()
        this.onSubmitForm = this.onSubmitForm.bind(this)
        this.onCancelForm = this.onCancelForm.bind(this)
        this.onLazyLoadData = this.onLazyLoadData.bind(this)
    }

    onLazyLoadData(e) {
        const { lang, morphKey, table, row, numRows } = this.props
        const { dataLoading } = this.state
        if(dataLoading) {
            return
        }
        this.setState({ dataLoading: true })

        const startIndex = e.first
        const limitIndex = numRows
        let conditions = this.queryBuilder.getCondition({
            type: 'country',
            // relation_id: row.id
        });
        let options = {
            lang: lang,
            start: startIndex,
            limit: limitIndex,
            conditions: conditions
        }

        this.tableService.getTableData(morphKey, options)
            .then( res => {
                this.setState({
                    firstRow: startIndex,
                    data: [
                        ...this.state.data,
                        ...res.data
                    ],
                    dataLoading: false,
                    totalRows: res.totalRows
                })    
            })
            .catch( err => { })
    }

    onSubmitForm() {
        alert('onSubmitForm')
    }

    onCancelForm() {
        alert('onCancelForm')
        // const { dispatch } = this.props
        // dispatch({ mode: '' })
    }

    render() {

        const { 
            dispatch, 
            morphKey,
            lang,
            numRows
        } = this.props

        const { 
            data,
            table, 
            cols,
            row,
            totalRows
        } = this.state

    	return (
            <div className='p-col-12'>
                <div className='card card-w-title'>
                    <div className='card-heading'>
                        <div className='card-heading-actions'>
                            <Button onClick={() => dispatch({ 'mode' : '' })} label='بازگشت' className='p-button-secondary' />
                        </div>
                        <h1 className='card-heading-caption' style={{direction:'rtl'}}> 
                            {morphKey}
                        </h1>
                    </div>
                    {/*<FormComponent
                        table={table}
                        cols={cols}
                        row={row}
                        showHeader={false}
                        mode='create'
                        lang={lang}
                        onSubmitForm={this.onSubmitForm}
                        onCancelForm={this.onCancelForm}
                        cardContainerStyle={{padding:'0px'}}
                    />*/}
                </div>
            </div>
        )
    }
}