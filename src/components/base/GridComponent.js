import React, { Component } from 'react'
import { Paginator } from 'primereact/paginator';
import { Lightbox } from 'primereact/lightbox';
import { DataView } from 'primereact/dataview';
import { imageTemplteParser } from '../../utils/parser';
import { Button } from 'primereact/button'

export default class GridComponent extends Component {

    constructor(props) {
        super(props)
        this.itemTemplate = this.itemTemplate.bind(this)
    }

    headerTemplate() {

        const { 
            table,
            perm,
            onTableCustomShow,
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
                {onTableCustomShow(table)}
            </div>
            <div>
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
            onRowCustomShow,
            onShowAlertDialog,
            onShowDialog,
            onFilterVisibilityChange,
            onRefreshTableData,
        } = this.props

        return (
            <div className='grid-item'>
                <div className='grid-item-img'>
                    <img 
                        style={{maxWidth:'100%', height:'auto'}} 
                        src={imageTemplteParser(item, table)}
                    />
                    <div className='grid-item-btn'>
                        {onRowCustomShow(table, item)}
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

    render() {

        const { 
            data,
            table, 
            totalRows,
            firstRow,
            numRows,
            onLoadData,
            dataLoading,
        } = this.props

    	return (
            <DataView
                layout='grid'
                footer={<Paginator 
                        totalRecords={totalRows}
                        first={firstRow} 
                        rows={numRows}
                        className='dataview-custom-paginator'
                        onPageChange={(e) => onLoadData(table.url, e.first)}></Paginator>
                    }
                value={data} 
                header={this.headerTemplate()}
                itemTemplate={this.itemTemplate}
                className='grid-dataview'
            />
        )
    }
}