import React, {Component} from 'react';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

export default class DataTableComponent extends Component {

	constructor(props) {
        super(props)
    }

	render() {

		const {

            data,
            columns,
            table,
            record,
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
                selection={record} 
                onSelectionChange={onSelectionChange}>
                
                {!!fields && fields.map( (item, i) => {
                    let column = columns.find(function(c) {
                        return c.no === item;
                    });

                    return (
                        <Column 
                            field={column.name} 
                            key={i} 
                            header={column.label}
                            sortable={true}
                            style={{width:'225px', overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} 
                        />
                    )
                })}
            </DataTable>
		)
	}
}