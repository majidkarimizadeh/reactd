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
            record,
            onSelectionChange,

        } = this.props

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
                {!!columns && columns.map( (column, index) => {
                    return (
                        <Column 
                            field={JSON.parse(column.meta_value).name} 
                            key={index} 
                            header={JSON.parse(column.meta_value).label}
                            sortable={true}
                            style={{width:'225px', overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} 
                        />
                    )
                })}
            </DataTable>
		)
	}
}