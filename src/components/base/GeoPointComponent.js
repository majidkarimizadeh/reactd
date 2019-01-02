 import React, { Component } from 'react'
import { MAP_API, MAP_CENTER } from '../../utils/config'
import { geoPointToStringParser, geoPointParser } from '../../utils/parser'
import { Map, TileLayer, Marker, Popup }  from 'react-leaflet'
import Loader from 'react-loader-spinner'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class GeoPointComponent extends Component {

	constructor(props) {
		super(props)
		this.onMapClick = this.onMapClick.bind(this)
	}	

    onMapClick(e) {
    	const { readOnly, onInputChange, name } = this.props
    	if(!readOnly) {
    		let str = geoPointToStringParser(e.latlng)
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

		let point = geoPointParser(value)

		return (
			<div>
				<label className='lable' htmlFor={`lbl-${index}`}> 
                    {label}
                    {(!readOnly && required) &&
                        <span className='required'>(این فیلد اجباری است)</span>
                    }
                </label>
				<Map 
					animate={true}
					style={{height:'300px'}} 
					center={point ? point : [35.6892, 51.3890]} 
					zoom={16}
					onClick={this.onMapClick}
				>
			        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			        {!!point &&
				        <Marker position={point}>
				          	<Popup>
				            	{label}
				          	</Popup>
				        </Marker>
			    	}
			    </Map>
			</div>
		)
	}
}