 /* global google */ 
import React, { Component } from 'react'
import { MAP_API, MAP_CENTER } from '../../utils/config'
import { geoPointToStringParser, geoPointParser } from '../../utils/parser'
import { GMap } from 'primereact/gmap'
import Loader from 'react-loader-spinner'

export default class GeoPointComponent extends Component {

	constructor(props) {
		super(props)
		this.onMapClick = this.onMapClick.bind(this)
	}

    componentWillMount() {
    	const { value } = this.props
    	const script = document.createElement("script")
    	script.src = MAP_API
    	script.id = 'map-api'
    	script.async = true
    	script.defer = true
    	script.addEventListener('load', () => {
	      	window.google = google
	      	const { onMapLoad } = this.props
	      	onMapLoad(true)
	    })
    	if(!document.getElementById("map-api")) {
    		document.body.appendChild(script)
    	}
    }

    onMapClick(e) {
    	const { onInputChange, name, readOnly } = this.props
    	if(!readOnly) 
    	{
			const str = geoPointToStringParser(e.latLng)
			onInputChange(str, name)
    	}
    }

	render() {

		const { 
			value,
			index,
			label,
			required,
			readOnly,
			isMapLoaded
		} = this.props

		return (
			<div>
				<label className='lable' htmlFor={`lbl-${index}`}> 
                    {label}
                    {(!readOnly && required) &&
                        <span className='required'>(این فیلد اجباری است)</span>
                    }
                </label>
				{isMapLoaded && 
					<GMap 
						overlays={geoPointParser(value)}
						options={MAP_CENTER}
						onMapClick={this.onMapClick}
						style={{width: '100%', minHeight: '320px'}} 
					/>
				}
				{!isMapLoaded && 
					<div style={{textAlign:'center'}}>
						<Loader 
	                        type="Puff"
	                        color="#5867dd"
	                        height="100"   
	                        width="100"
	                    />
					</div>
				}
			</div>
		)
	}
}