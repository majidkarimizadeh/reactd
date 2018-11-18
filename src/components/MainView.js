import React, {Component} from 'react';
import TextEditComponent from './BaseComponent/TextEditComponent'
import LongTextEditComponent from './BaseComponent/LongTextEditComponent'
import {withRouter} from 'react-router'
import {TableService} from '../service/TableService';
import {Panel} from 'primereact/panel';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Dropdown} from 'primereact/dropdown';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {DataGridListView} from './DataGridListView';

export class MainView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            table: {},
            textEditComponents: [],
            longTextEditComponents: [],
        }
        this.tableService = new TableService();
        this.getAllTableData = this.getAllTableData.bind(this)
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

        this.tableService.getAllTableData(tableName)
            .then(({data, table, attr})  =>  {

                let textEditComponents = [];
                let longTextEditComponents = [];
                attr.map( (item, index) => {
                    switch(JSON.parse(item.meta_value).controller) 
                    {
                        case 'text_edit':
                            textEditComponents.push( <TextEditComponent 
                                index={index}
                                key={index}
                                name={JSON.parse(item.meta_value).name}
                                label={JSON.parse(item.meta_value).label}
                                placeholder={JSON.parse(item.meta_value).label}
                            /> )
                            break;

                        case 'long_text':
                            longTextEditComponents.push( <LongTextEditComponent 
                                index={index}
                                key={index}
                                name={JSON.parse(item.meta_value).name}
                                label={JSON.parse(item.meta_value).label}
                                placeholder={JSON.parse(item.meta_value).label}
                            />)
                            break;
                    }
                })

                this.setState({data, table, textEditComponents, longTextEditComponents})
            });
    }

    render() {
        const { data, table, textEditComponents, longTextEditComponents } = this.state

        return (
            <div className="p-grid p-fluid">
                <div className="p-col-12 p-lg-12">
                    <div className="card card-w-title" style={{textAlign: 'right'}}>
                        <h1>
                            {this.state.table.label}
                            <i className={this.state.table.icon}></i>
                        </h1>
                    </div>
                </div>

                <div className="p-col-12 p-md-4">
                    <div className="card card-w-title" style={{textAlign: 'right'}}>
                        <h1>عکس {this.state.table.label}</h1>
                        <div className="p-grid p-fluid">

                            <div className="p-col-12 p-md-offset-8 p-md-4">
                                <Button label="Success" className="p-button-success p-button-raised" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="p-col-12 p-md-8">
                    <div className="card card-w-title" style={{textAlign: 'right'}}>
                        <h1>
                            اطلاعات {this.state.table.label}
                        </h1>

                        <div className="p-grid p-fluid">

                            {!!textEditComponents && textEditComponents.map( (component, index) => {
                                return component
                            })}

                            {!!longTextEditComponents && longTextEditComponents.map( (component, index) => {
                                return component
                            })}
                            
                        </div>
                    </div>

                    <div className="card card-w-title" style={{textAlign: 'right'}}>
                        <div className="p-grid">
                            <div className="p-col-12 p-md-offset-10 p-md-2" style={{textAlign:'center'}}>
                                <Button label="Success" className="p-button-success p-button-raised" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
