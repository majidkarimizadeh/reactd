import React, { Component } from 'react'
import DatePickerComponent from './DatePickerComponent'
import SelectComponent from './SelectComponent'
import TextEditComponent from './TextEditComponent'
import { Dropdown } from 'primereact/dropdown';
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

    wysiwygTemplate(rowData, column, columnAttr ,thisClass = null) {
        const regex = /(<([^>]+)>)/ig;
        return rowData[column.field] ? rowData[column.field].replace(regex, '') : ''
    }

    textFilterTemplate(name, type = null) {
        const { onFilterInputChange, filterRow } = this.props
        return <TextEditComponent 
                    value={filterRow[name]}
                    name={name}
                    type={type}
                    onInputChange={onFilterInputChange}
                /> 
    }

    lookUpTemplate(rowData, column, columnAttr ,thisClass = null) {
        return rowData[ 'join_' + column.field ]
    }
    lookUpFilterTemplate(rdf, name) {
        const { options, onLookUp, onFilterInputChange, filterRow } = this.props
        return  <SelectComponent
                    name={name}
                    options={options}
                    value={filterRow[name]}
                    onMouseDown={() => onLookUp(rdf, name)}
                    onInputChange={onFilterInputChange}
                    className='filter-dropdown'
                />
    }

    booleanTemplate(rowData, column, columnAttr ,thisClass = null) {
        return boolParser(+rowData[column.field])
    }
    booleanFilterTemplate(name) {
        const { onFilterInputChange, filterRow } = this.props
        let options = new Array();
        options[ [name] ] = [
            {'label': 'خیر', value: 0},
            {'label': 'بله', value: 1}
        ];
        return  <SelectComponent
                    name={name}
                    options={options}
                    value={filterRow[name]}
                    onInputChange={onFilterInputChange}
                    className='filter-dropdown'
                />
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
    imageFilterTemplate(name) {
        const { onFilterInputChange, filterRow } = this.props
        let options = new Array();
        options[ [name] ] = [
            {'label': 'ندارد', value: 0},
            {'label': 'دارد', value: 1}
        ];
        return  <SelectComponent
                    name={name}
                    options={options}
                    value={filterRow[name]}
                    onInputChange={onFilterInputChange}
                    className='filter-dropdown'
                />
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
    dateFilterTemplate(showTime, showJalali, name) {
        const { onFilterInputChange, filterRow } = this.props
        return  <DatePickerComponent
                    showTime={showTime}
                    jalali={showJalali}
                    value={filterRow[name]}
                    name={name}
                    onInputChange={onFilterInputChange}
                />
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
                ref={(el) => this.dt = el}
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
                    let filter = false
                    let filterElement = null
                    
                    if(col.controller === 'number') 
                    {
                        filterElement = this.textFilterTemplate(col.name, 'number')
                        filter = true
                    } 
                    else if(col.controller === 'date') 
                    {
                        body = this.dateTemplate
                        filterElement = this.dateFilterTemplate(col.showTime, col.showJalali, col.name)
                        filter = true
                    } 
                    else if(col.controller === 'text_edit') 
                    {
                        filterElement = this.textFilterTemplate(col.name)
                        filter = true
                    } 
                    else if(col.controller === 'image') 
                    {
                        body = this.imageTemplate
                        filterElement = this.imageFilterTemplate(col.name)
                        filter = true
                    } 
                    else if(col.controller === 'boolean') 
                    {
                        body = this.booleanTemplate
                        filterElement = this.booleanFilterTemplate(col.name)
                        filter = true
                    } 
                    else if(col.controller === 'lookup') 
                    {
                        body = this.lookUpTemplate
                        filterElement = this.lookUpFilterTemplate(col.rdf, col.name)
                        filter = true
                    }
                    else if(col.controller === 'wysiwyg') 
                    {
                        body = this.wysiwygTemplate
                        filter = true
                    }
                    return (
                        <Column 
                            field={col.name} 
                            key={i} 
                            body={body ? (rowData, column) => body(rowData, column, col, this) : null}
                            header={col.label}
                            sortable={true}
                            filter={filter}
                            filterElement={filterElement}
                            className="table-column"
                        />
                    )
                })}
            </DataTable>
		)
	}
}