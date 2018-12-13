import React, { Component } from 'react'
import DatePickerComponent from './DatePickerComponent'
import SelectComponent from './SelectComponent'
import TextComponent from './TextComponent'
import { Button } from 'primereact/button'
import { Dropdown } from 'primereact/dropdown'
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

    headerTemplate() {

        const { 
            perm,
            onShowAlertDialog,
            onShowDialog,
            onFilterVisibilityChange,
            onRefreshTableData,
        } = this.props

        return <div className='table-header-operation'>
            <div>
                {perm.delete && 
                    <Button 
                        onClick={() => onShowAlertDialog('delete')}
                        icon='fa fa-trash'
                        className='p-button-secondary toolbar-btn'
                    />
                }
                {perm.select &&
                    <Button 
                        onClick={() => onShowDialog('view')}
                        icon='fa fa-eye'
                        className='p-button-secondary toolbar-btn'
                    />
                }
                {perm.update &&
                    <Button
                        onClick={() => onShowDialog('edit')}
                        icon='fa fa-pencil'
                        className='p-button-secondary toolbar-btn'
                    />
                }
                {perm.insert &&
                    <Button 
                        onClick={() => onShowDialog('create')}
                        icon='fa fa-plus'
                        className='p-button-secondary toolbar-btn'
                    />
                }
            </div>
            <div>
                {perm.select &&
                    <Button 
                        onClick={() => onFilterVisibilityChange() }
                        icon='fa fa-filter'
                        className='p-button-secondary toolbar-btn'
                    />
                }
                {perm.select &&
                    <Button 
                        onClick={() => onRefreshTableData() }
                        icon='fa fa-refresh'
                        className='p-button-secondary toolbar-btn'
                    />
                }
            </div>
        </div>
    }

    wysiwygTemplate(rowData, column, columnAttr ,thisClass = null) {
        const regex = /(<([^>]+)>)/ig
        return rowData[column.field] ? rowData[column.field].replace(regex, '') : ''
    }

    textFilterTemplate(name, type = null) {
        const { onFilterInputChange, filterRow } = this.props
        return <TextComponent 
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
        let options = new Array()
        options[ [name] ] = [
            {'label': 'خیر', value: 0},
            {'label': 'بله', value: 1}
        ]
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
            // src = 'http://destription.com/home-images/iran-attractions.jpg'
            component = <Lightbox type='content'>
                            <a href='#' className='show-image'>مشاهده</a>
                            <img src={src} alt='' />
                        </Lightbox>
        } 
        return component
    }
    imageFilterTemplate(name) {
        const { onFilterInputChange, filterRow } = this.props
        let options = new Array()
        options[ [name] ] = [
            {'label': 'ندارد', value: 0},
            {'label': 'دارد', value: 1}
        ]
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
            onLoadData,
            showFilter
        } = this.props

        const fields = table.list
        const tableUrl = table.url

		return (
			<DataTable 
                ref={(el) => this.dt = el}
                value={data}
                headerClassName='p-highlight'
                header={this.headerTemplate()}
                scrollable={true}
                paginatorPosition='bottom'
                selectionMode='single'
                emptyMessage='اطلاعاتی وجود ندارد'
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
                    let filterElement = null
                    if(col.controller === 'number') 
                    {
                        filterElement = this.textFilterTemplate(col.name, 'number')
                    } 
                    else if(col.controller === 'date') 
                    {
                        body = this.dateTemplate
                        showFilter 
                        ? filterElement = this.dateFilterTemplate(col.showTime, col.showJalali, col.name)
                        : filterElement = null

                    } 
                    else if(col.controller === 'text_edit') 
                    {
                        filterElement = this.textFilterTemplate(col.name)
                    } 
                    else if(col.controller === 'image') 
                    {
                        body = this.imageTemplate
                        showFilter 
                        ? filterElement = this.imageFilterTemplate(col.name)
                        : filterElement = null
                    } 
                    else if(col.controller === 'boolean') 
                    {
                        body = this.booleanTemplate
                        showFilter
                        ? filterElement = this.booleanFilterTemplate(col.name)
                        : filterElement = null
                    } 
                    else if(col.controller === 'lookup') 
                    {
                        body = this.lookUpTemplate
                        showFilter
                        ? filterElement = this.lookUpFilterTemplate(col.rdf, col.name)
                        : filterElement = null
                    }
                    else if(col.controller === 'wysiwyg') 
                    {
                        body = this.wysiwygTemplate
                    }
                    return (
                        <Column 
                            field={col.name} 
                            key={i} 
                            body={body ? (rowData, column) => body(rowData, column, col, this) : null}
                            header={col.label}
                            sortable={!showFilter}
                            filter={showFilter}
                            filterElement={filterElement}
                            className='table-column'
                        />
                    )
                })}
            </DataTable>
		)
	}
}