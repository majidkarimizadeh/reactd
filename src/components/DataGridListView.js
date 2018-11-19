import React, {Component} from 'react';
import TextEditComponent from './BaseComponent/TextEditComponent'
import LongTextEditComponent from './BaseComponent/LongTextEditComponent'
import {TableService} from '../service/TableService';
import {RowService} from '../service/RowService';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column'
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import {Dialog} from 'primereact/dialog';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';

export class DataGridListView extends Component {

    constructor() {
        super();
        this.state = {
            data:[],
            columns:[],
            table: {},
            record: {},
        };

        this.create = this.create.bind(this)

        this.onHideModal = this.onHideModal.bind(this)
        this.onTextChange = this.onTextChange.bind(this)

        this.tableService = new TableService()
        this.rowService = new RowService()
    }

    componentDidMount() {
        this.getAllTableData()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.match.params.table !== this.props.match.params.table) {
            this.getAllTableData()
        }
    }

    create() {
        let { columns } = this.state
        let record = {}
        columns.map( (item, index) => {
            let key = JSON.parse(item.meta_value).name
            record[key] = ''
        })
        this.setState({ visible: true, record })
    }

    onHideModal(e) {
        this.setState({ visible: false })
    }

    onTextChange(e) {
        let { record } = this.state
        record[e.target.name] = e.target.value
        this.setState({ record })
    }

    // getSingleRecord(id) {
    //     let tableName = prevProps.match.params.table
    //     rowService.getRow(tableName, id)
    //     .then(({ row })   =>  {
    //         this.setState({
    //             record: row
    //         })
    //     }) 
    // }

    getAllTableData() {
        let tableName = this.props.match.params.table
        this.tableService.getAllDataColumn(tableName)
            .then(({data, table, columns})  =>  {
                let record = {}
                columns.map( (item, index) => {
                    let key = JSON.parse(item.meta_value).name
                    record[key] = ''
                })
                this.setState({ columns, table, data, record})
            })
    }

    render() {
        const { data, 
                columns, 
                table,
                record } = this.state

        return (
            <div className="p-grid">

                <Dialog 
                    header={table.label}
                    visible={this.state.visible} 
                    rtl={true} 
                    maximizable={true}
                    modal={true} 
                    width="75%"
                    onHide={this.onHideModal}
                >
                    <div className="p-grid p-fluid" style={{textAlign:'right'}}>

                        {columns.map( (item, index) => {
                            switch(JSON.parse(item.meta_value).controller) 
                            {
                                case 'text_edit':
                                    return ( <TextEditComponent 
                                        index={index}
                                        key={index}
                                        value={record[JSON.parse(item.meta_value).name]}
                                        name={JSON.parse(item.meta_value).name}
                                        label={JSON.parse(item.meta_value).label}
                                        placeholder={JSON.parse(item.meta_value).label}
                                        onChange={e => this.onTextChange(e)}
                                    /> )
                                    break;

                                case 'long_text':
                                    return ( <LongTextEditComponent 
                                        index={index}
                                        key={index}
                                        value={record[JSON.parse(item.meta_value).name]}
                                        name={JSON.parse(item.meta_value).name}
                                        label={JSON.parse(item.meta_value).label}
                                        placeholder={JSON.parse(item.meta_value).label}
                                        onChange={e => this.onTextChange(e)}
                                    />)
                                    break;
                            }
                        })}
                        
                        <div className="p-col-12 p-md-offset-10 p-md-2">
                            <Button label="Success" className="p-button-success p-button-raised" />
                        </div>
                    </div>
                </Dialog>

                <div className="p-col-12">
                    <div className="card card-w-title">
                        <h1 style={{textAlign:'right'}}>{table.label}</h1>

                        <Toolbar className="custom-toolbar">
                            <div className="p-toolbar-group-right">
                                {/*<Button label="Export" className="p-button-secondary" />
                                <Button label="Save" icon="pi pi-check" className="p-button-secondary" />
                                <Button onClick={this.editRecord} disabled={!record} label="Edit" icon="pi pi-pencil" className="p-button-secondary" />*/}
                                <Button onClick={this.create} label="New" icon="pi pi-plus" className="p-button-secondary"/>
                            </div>
                            <div className="p-toolbar-group-left">
                                <Button icon="pi pi-search" className="p-button-secondary"/>
                            </div>
                        </Toolbar>

                        <DataTable 
                            value={data}
                            scrollable={true}
                            paginatorPosition="bottom"
                            autoLayout={true}
                            selectionMode="single"
                            
                            paginator={true}
                            rows={12}
                            responsive={true} 
                            selection={this.state.record} 
                            onSelectionChange={e => this.setState({ record: e.data }) }>
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