import React, {Component} from 'react';
import {TableService} from '../service/TableService';
import {CarService} from '../service/CarService';
import {NodeService} from '../service/NodeService';
import {EventService} from '../service/EventService';
import {OrganizationChart} from 'primereact/organizationchart';
import {DataTable} from 'primereact/datatable';
import {Tree} from 'primereact/tree';
import {TreeTable} from 'primereact/treetable';
import {Column} from 'primereact/column'
import {PickList} from 'primereact/picklist';
import {OrderList} from 'primereact/orderlist';
import {Schedule} from 'primereact/schedule';
import {Panel} from 'primereact/panel';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

export class DataGridListView extends Component {

    constructor() {
        super();
        this.state = {
            dataTableValue:[],
            columns:[],
            attr: [],
        };

        this.tableService = new TableService();
    }

    componentDidMount() {
        this.getAllTableData();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.table !== this.props.match.params.table) {
           this.getAllTableData();
        }
    }

    getAllTableData() {
        let tableName = this.props.match.params.table;

        this.tableService.getAllDataColumn(tableName)
            .then(({data, columns})  =>  {
                console.log(columns)
                this.setState({dataTableValue: data, columns})
            });
    }

    render() {
        const { columns } = this.state
        return (
            <div className="p-grid">
                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1>DataView</h1>
                        <DataTable 
                            value={this.state.dataTableValue}
                            scrollable={true}
                            paginatorPosition="bottom"
                            autoLayout={true}
                            selectionMode="single"
                            header={`list of `}
                            paginator={true}
                            rows={12}
                            responsive={true} 
                            selection={this.state.dataTableSelection} 
                            onSelectionChange={event => this.setState({dataTableSelection: event.data})}>
                            {!!columns && columns.map( (column, index) => {
                                return <Column field={JSON.parse(column.meta_value).name} key={index} header={JSON.parse(column.meta_value).label} style={{width:'250px', overflow:'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}} sortable={true}/>
                            })}
                        </DataTable>
                    </div>
                </div>
            </div>
        );
    }
}