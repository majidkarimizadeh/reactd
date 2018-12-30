import React, { Component } from 'react'
import FormComponent from '../base/FormComponent'
import QueryBuilder from '../../utils/queryBuilder'
import { Lightbox } from 'primereact/lightbox';
import { DataScroller } from 'primereact/datascroller';
import { TableService } from '../../service/TableService'
import { colParser, tableParser } from '../../utils/parser'
import { Button } from 'primereact/button'
import Loader from 'react-loader-spinner'

export default class GridComponent extends Component {

    constructor(props) {
        super(props)
        this.itemTemplate = this.itemTemplate.bind(this)
    }

    headerTemplate() {

        const { 
            table,
            perm,
            onShowDialog,
            onRefreshTableData,
            onChangeView,
        } = this.props

        return <div className='table-header-operation'>
            <div>
                {perm.insert &&
                    <Button 
                        onClick={() => onShowDialog(('cc' in table) ? 'custom' : 'create')}
                        icon='fa fa-plus'
                        className='p-button-secondary toolbar-btn'
                    />
                }
            </div>
            <div>
               {perm.select &&
                    <Button 
                        onClick={() => onRefreshTableData() }
                        icon='fa fa-refresh'
                        className='p-button-secondary toolbar-btn'
                    />
                }
               <Button 
                    onClick={() => onChangeView('lst')}
                    icon='fa fa-bars'
                    className='p-button-secondary toolbar-btn'
                />
            </div>
        </div>
    }

    itemTemplate(item) {

        const { 
            table,
            perm,
            onShowAlertDialog,
            onShowDialog,
            onFilterVisibilityChange,
            onRefreshTableData,
        } = this.props

        return (
            <div>
                <div className='grid-item'>
                    <div className='grid-item-img'>
                        <img 
                            style={{maxWidth:'100%', height:'auto'}} 
                            src='http://destription.com/home-images/point.jpg'
                        />
                    </div>
                    <div className='grid-item-btn'>
                        {perm.select &&
                            <Button 
                                onClick={() => onShowDialog(('cv' in table) ? 'custom' : 'view', item)}
                                icon='fa fa-eye'
                                className='p-button-secondary toolbar-btn'
                            />
                        }
                        {perm.update &&
                            <Button
                                onClick={() => onShowDialog(('ce' in table) ? 'custom' : 'edit', item)}
                                icon='fa fa-pencil'
                                className='p-button-secondary toolbar-btn'
                            />
                        }
                        {perm.delete && 
                            <Button 
                                onClick={() => onShowAlertDialog(('cd' in table) ? 'custom' : 'delete', item)}
                                icon='fa fa-trash'
                                className='p-button-secondary toolbar-btn'
                            />
                        }
                    </div>
                </div>
                <div>
                    {item.name}
                </div>
            </div>
        );
    }

    // onLazyLoadData(e) {
    //     const { lang, morphKey, table, row, numRows } = this.props
    //     const { dataLoading } = this.state
    //     if(dataLoading) {
    //         return
    //     }
    //     this.setState({ dataLoading: true })

    //     const startIndex = e.first
    //     const limitIndex = numRows
    //     let conditions = this.queryBuilder.getCondition({
    //         type: 'country',
    //         // relation_id: row.id
    //     });
    //     let options = {
    //         lang: lang,
    //         start: startIndex,
    //         limit: limitIndex,
    //         conditions: conditions
    //     }

    //     this.tableService.getTableData(morphKey, options)
    //         .then( res => {
    //             this.setState({
    //                 firstRow: startIndex,
    //                 data: [
    //                     ...this.state.data,
    //                     ...res.data
    //                 ],
    //                 dataLoading: false,
    //                 totalRows: res.totalRows
    //             })    
    //         })
    //         .catch( err => { })
    // }

    render() {

        const { 
            data,
            table, 
            cols,
            row,
            totalRows,
            lang,
            numRows,
            onLoadData
        } = this.props

        const footer = <Button ref={(el) => this.loadButton = el} type="text" icon="pi pi-plus" label="Load" />;

    	return (
            <DataScroller 
                value={data} 
                rows={numRows}
                footer={footer}
                lazy={true}
                loader={this.loadButton}
                header={this.headerTemplate()}
                itemTemplate={this.itemTemplate}
                onLazyLoad={(e) => onLoadData(table.url, e.first)}
                className='scroll-grid-dataview'
            />
        )
    }
}