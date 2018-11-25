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

                    return (
                        <Column 
                            field={col.name} 
                            key={i} 
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