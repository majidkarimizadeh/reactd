import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button';
import {OverlayPanel} from 'primereact/overlaypanel';
import {Lightbox} from 'primereact/lightbox';
import { getJalDateByGreDate, getFormatedGreDate, imageParser } from '../../parser/parser'
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

export default class TableComponent extends Component {

	constructor(props) {
        super(props)
    }

    booleanTemplate(rowData, column, columnAttr ,thisClass = null) {
        if(rowData[column.field]) {
            return <i className="pi pi-check" style={{color:'green'}}/>
        } else {
            return <i className="pi pi-times" style={{color:'red'}}/>
        }
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
                autoLayout={true}
                selectionMode="single"
                
                paginator={true}
                rows={12}
                responsive={true} 
                selection={row} 
                onSelectionChange={onSelectionChange}>
                
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