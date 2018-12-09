import React, { Component } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Lightbox } from 'primereact/lightbox'
import { 
    getJalDateByGreDate, 
    getFormatedGreDate, 
    imageParser, 
    boolParser 
} from '../../utils/parser'

export default class TableComponent extends Component {

    richTextEditTemplate(rowData, column, columnAttr ,thisClass = null) {
        const regex = /(<([^>]+)>)/ig;
        return rowData[column.field] ? rowData[column.field].replace(regex, '') : ''
    }

    lookUpTemplate(rowData, column, columnAttr ,thisClass = null) {
        return rowData[ 'join_' + column.field ]
    }

    booleanTemplate(rowData, column, columnAttr ,thisClass = null) {
        return boolParser(+rowData[column.field])
    }

    imageTemplate(rowData, column, columnAttr, thisClass) {
        let src = imageParser(rowData, columnAttr)
        let component = <div> --- </div>
        if(src) 
        {
            // src = "http://destription.com/home-images/iran-attractions.jpg"
            component = <Lightbox type="content">
                            <a href='#' className='show-image'>مشاهده</a>
                            <img src={src} alt='' />
                        </Lightbox>
        } 
        return component
    }

    dateTemplate(rowData, column, columnAttr, thisClass = null) {
        if(columnAttr.showJalali) 
        {
            return getJalDateByGreDate(rowData[column.field], columnAttr.showTime) 
        } 
        else 
        {
            return getFormatedGreDate(rowData[column.field], columnAttr.showTime)
        }
    }

	render() {

		const {
            data,
            cols,
            table,
            row,
            onSelectionChange,
            dataLoading,
            firstRow,
            numRows,
            totalRows,
            onLoadData
        } = this.props

        const fields = table.list
        const tableUrl = table.url

		return (
			<DataTable 
                value={data}
                scrollable={true}
                paginatorPosition="bottom"
                selectionMode="single"
                emptyMessage="اطلاعاتی وجود ندارد"
                selection={row} 
                onSelectionChange={onSelectionChange}

                paginator={true}
                rows={numRows}
                totalRecords={totalRows}
                lazy={true}
                first={firstRow}
                loading={dataLoading}
                onPage={(e) => onLoadData(tableUrl, e.first)}
            >
                {!!fields && fields.map( (item, i) => {
                    let col = cols.find(function(c) {
                        return c.no === item
                    })
                    let body = null
                    if(col.controller === 'date') 
                    {
                        body = this.dateTemplate
                    } 
                    else if(col.controller === 'image') 
                    {
                        body = this.imageTemplate
                    } 
                    else if(col.controller === 'boolean') 
                    {
                        body = this.booleanTemplate
                    } 
                    else if(col.controller === 'lookup') 
                    {
                        body = this.lookUpTemplate
                    }
                    else if(col.controller === 'wysiwyg') 
                    {
                        body = this.richTextEditTemplate
                    }
                    return (
                        <Column 
                            field={col.name} 
                            key={i} 
                            body={body ? (rowData, column) => body(rowData, column, col, this) : null}
                            header={col.label}
                            sortable={true}
                            className="table-column"
                        />
                    )
                })}
            </DataTable>
		)
	}
}