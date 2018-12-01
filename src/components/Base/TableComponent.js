import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button';
import {OverlayPanel} from 'primereact/overlaypanel';
import {Lightbox} from 'primereact/lightbox';
import { getJalDateByGreDate, getFormatedGreDate, imageParser, boolParser } from '../../parser/parser'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

export default class TableComponent extends Component {

	constructor(props) {
        super(props)
    }

    lookUpTemplate(rowData, column, columnAttr ,thisClass = null) {
        return rowData[ 'join_' + column.field ];
    }

    booleanTemplate(rowData, column, columnAttr ,thisClass = null) {
        return boolParser(rowData[column.field])
    }

    imageTemplate(rowData, column, columnAttr, thisClass) {
        let src = imageParser(rowData, columnAttr);
        let component = <div> --- </div>;
        if(src) 
        {
            // src = "http://destription.com/home-images/iran-attractions.jpg"
            component = <Lightbox type="content">
                            <a className='show-image'>مشاهده</a>
                            <img src={src} />
                        </Lightbox>
        } 
        return component;
    }

    dateTemplate(rowData, column, columnAttr, thisClass = null) {
        if(columnAttr.showJalali) {
            return getJalDateByGreDate(rowData[column.field], columnAttr.showTime) 
        } else {
            return getFormatedGreDate(rowData[column.field], columnAttr.showTime);
        }
    }

	render() {

		const {

            data,
            cols,
            table,
            row,
            onSelectionChange,

        } = this.props

        let fields = table['list'];

		return (
			<DataTable 
                value={data}
                scrollable={true}
                paginatorPosition="bottom"
                selectionMode="single"
                emptyMessage="اطلاعاتی وجود ندارد"
                paginator={true}
                rows={10}
                selection={row} 
                onSelectionChange={onSelectionChange}
            >
                
                {!!fields && fields.map( (item, i) => {
                    let col = cols.find(function(c) {
                        return c.no === item;
                    });
                    let body = null;
                    if(col.controller === 'date') {
                        body = this.dateTemplate;
                    } else if(col.controller === 'image') {
                        body = this.imageTemplate;
                    } else if(col.controller === 'boolean') {
                        body = this.booleanTemplate;
                    } else if(col.controller === 'lookup') {
                        body = this.lookUpTemplate;
                    }
                    return (

                        <Column 
                            field={col.name} 
                            key={i} 
                            body={body ? (rowData, column) => body(rowData, column, col, this) : null}
                            header={col.label}
                            sortable={true}
                            style={{width:'225px', overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} 
                        />
                    )
                })}
            </DataTable>
		)
	}
}