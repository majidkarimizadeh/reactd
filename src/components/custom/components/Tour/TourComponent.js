import React, { Component } from 'react'
import FormComponent from '../../base/FormComponent'
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button'
import { CustomService } from '../../../service/CustomService'
import { RowService } from '../../../service/RowService'
import Loader from 'react-loader-spinner'
import { tableParser, validationErrorParser } from '../../../utils/parser'

export default class TourComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			activeIndex: 0,
			tourModels: [],
			tourTypes: [],
			tourModel: '',
			tourType: '',
			tourTypeTable: {},
			loading: false,
			cols:[],
		}
		this.service = new CustomService()
		this.rowService = new RowService()
		this.selectTourModel = this.selectTourModel.bind(this)
		this.selectTourType = this.selectTourType.bind(this)
		this.onBackClick = this.onBackClick.bind(this)
		this.onChangeTab = this.onChangeTab.bind(this)
		this.onSubmitForm = this.onSubmitForm.bind(this)
		this.onCancelForm = this.onCancelForm.bind(this)
	}

	componentWillMount() {
		let apiObject = new FormData()
        this.service.post('get-tour-requirements', apiObject)
            .then( res => {
                this.setState({
                    tourModels: res.data.tourModels,
                    tourTypes: res.data.tourTypes,
                })
            })
	}

	onBackClick() {
		const { dispatch } = this.props
		const { activeIndex } = this.state

		if(activeIndex === 0) 
		{
			dispatch({ 'mode' : '' })
		}
		else 
		{
			this.onChangeTab(activeIndex - 1)
		}
	}

	onChangeTab(index) {
		const { activeIndex } = this.state

		if(index >= activeIndex) return

		this.setState({
			loading: true
		})
		setTimeout( () => {
			this.setState({
				loading: false,
				activeIndex: index
			})
		}, 500)
	}

	selectTourModel(e) {
		this.setState({
			tourModel: e.value,
			loading: true
		})

		setTimeout( () => {
			this.setState({
				loading: false,
				activeIndex: 1
			})
		}, 500)
	}

	selectTourType(e) {
		this.setState({
			tourType: e.value,
			loading: true
		})

		setTimeout( () => {

			let apiObject = new FormData()
			apiObject.append('tourType', e.value)

	        this.service.post('get-tour-form', apiObject)
	            .then( res => {
	                this.setState({
	                    loading: false,
						activeIndex: 2,
						cols: res.data.columns,
						tourTypeTable: tableParser(res.data.table)
	                })
	            })

		}, 500)

	}

	onSubmitForm(filledRow, mode) {
		const { tourTypeTable } = this.state
		const { cols, messages, growl } = this.props

		let apiObject = new FormData()
		apiObject.append('url', tourTypeTable.url)

		let fields = tourTypeTable.crt
		fields.forEach( (item, index) => {
            let col = cols.find( (col) => col.no === item)
            apiObject.append(col.nme, filledRow[col.nme])
        })
        this.rowService.storeRow(apiObject)
        	.then( res => { })
        	.catch( err => {
                    window.scrollTo(0, 0)
                    let errData = err.response.data
                    if(err.response.status === 422) 
                    {
                        messages.show({
                            severity: 'error',
                            sticky: true,
                            detail: validationErrorParser(errData.result)
                        })
                    } 
                    else
                    {
                        growl.show({
                            severity: 'error',
                            summary: 'Error !',
                            detail: errData.message
                        })
                    }
                })

	}

	onCancelForm() {
		const { dispatch } = this.props
		this.setState({
			loading: true
		})
		setTimeout( () => {
			dispatch({ 'mode' : ''})
		}, 500)
	}


	render() {

		const { table } = this.props
		const { 
			activeIndex,
			tourModel,
			tourType,
			tourModels,
			tourTypes,
			loading,
			cols,
			tourTypeTable
		} = this.state

		return (
			<div className='p-col-12'>
                <div className='card card-w-title'>
                    <div className="card-heading">
                        <div className="card-heading-actions">
                        	<Button onClick={this.onBackClick} label='بازگشت' className='p-button-secondary' />
                        </div>
                        <h1 className="card-heading-caption">{table.lbl}</h1>
                    </div>
                    <div className='p-grid' style={{textAlign:'center', direction:'rtl', justifyContent:'center', marginBottom:'26px'}}>
	                    <div 
	                    	onClick={() => this.onChangeTab(0)}
	                    	className='p-col-12 p-md-4'
                    	>
                    		<div className={`step-in-stepper ${(activeIndex === 0) ? 'active-stepper' : ''}`}>
		                    	مدل تور
		                    	<i className='fa fa-chevron-left'></i>
                    		</div>
	                    </div>
	                    <div 
	                    	onClick={() => this.onChangeTab(1)}
	                    	className='p-col-12 p-md-4'
                    	>
                    		<div className={`step-in-stepper ${(activeIndex === 1) ? 'active-stepper' : ''}`}>
		                    	نوع تور
		                    	<i className='fa fa-chevron-left'></i>
                    		</div>
	                    </div>
	                    <div
	                    	onClick={() => this.onChangeTab(2)}
	                    	className='p-col-12 p-md-4'
	                    >
	                    	<div className={`step-in-stepper ${(activeIndex === 2) ? 'active-stepper' : ''}`}>
		                    	تکمیل اطلاعات
		                    	<i className='fa fa-chevron-left'></i>
	                    	</div>
	                    </div>
                    </div>

                    {loading && 
                    	<div style={{textAlign:'center'}}>
	                    	<Loader 
	                            type="Puff"
	                            color="#5867dd"
	                            height="100"   
	                            width="100"
	                        />
                        </div>
                    }

                    {!loading && 
                    	<div>
		                    {(activeIndex === 0) &&
		                    	<div style={{direction:'rtl'}}>
		                    		{tourModels.map((item, i) => {
			                    		return <div key={i} className="p-col-12 radio-input">
				                            <RadioButton
				                            	inputId={`inp-${i+1}`}
				                            	name="tourModel"
				                            	value={item.id}
				                            	onChange={this.selectTourModel}
				                            	checked={tourModel === item.id}
			                            	/>
				                            <label htmlFor={`inp-${i+1}`} className="p-radiobutton-label">
				                            	{item.name}
				                            </label>
				                        </div>
		                    		})}
		                    	</div>
		                    }

		                    {(activeIndex === 1) &&
		                    	<div style={{direction:'rtl'}}>
		                    		{tourTypes.map((item, i) => {
			                    		return <div key={i} className="p-col-12 radio-input">
				                            <RadioButton
				                            	inputId={`inp-${i+1}`}
				                            	name="tourType"
				                            	value={item.id}
				                            	onChange={this.selectTourType}
				                            	checked={tourType === item.id}
			                            	/>
				                            <label htmlFor={`inp-${i+1}`} className="p-radiobutton-label">
				                            	{item.name}
				                            </label>
				                        </div>
		                    		})}
		                    	</div>
		                    }

		                    {(activeIndex === 2) &&
		                    	<div>
		                    		<FormComponent
		                    			{...this.props}
		                    			showHeader={false}
		                    			cols={cols}
		                    			table={tourTypeTable}
		                    			mode='custom'
		                    			onSubmitForm={this.onSubmitForm}
										onCancelForm={this.onCancelForm}
		                    			cardContainerStyle={{padding:'0px'}}
		                    		/>
		                    	</div>
		                    }
	                    </div>
                    }
                </div>
            </div>
        )
	}
}