 /* global google */ 
import React, { Component } from 'react'
import { GMap } from 'primereact/gmap'
import Loader from 'react-loader-spinner'

export default class GeoPointComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isMapLoaded: false,
			point: null,
			points: []
		}
		this.onMapClick = this.onMapClick.bind(this)
	}

    componentWillMount() {
    	const script = document.createElement("script")
    	const API = 'AIzaSyDC5TPGY4g0QPjEIixs0-9CmM2ithq9rZA'
    	script.src = `https://maps.googleapis.com/maps/api/js?key=${API}`
    	script.id = 'map-api'
    	script.async = true
    	script.defer = true
    	script.addEventListener('load', () => {
	      	window.google = google
	      	this.setState({ 
	      		isMapLoaded: true,
	      		points: [
		           new google.maps.Marker({
		           		position: {
		           			lat: 35.68995, lng: 51.40976
		           		},
		           		title: 'Home'
		           })
		        ]
	      	})
	    })
    	if(!document.getElementById("map-api")) {
    		document.body.appendChild(script)
    	}
    }

    onMapClick(e) {
        this.setState({
            points: [
	           new google.maps.Marker({
	           		position: {
	           			lat: e.latLng.lat(),
	           			lng: e.latLng.lng()
	           		},
	           		title: 'Home'
	           })
	        ]
        })
    }

	render() {
		const { isMapLoaded, points } = this.state

		const options = {
	        center: {
	        	lat: 35.68995,
	        	lng: 51.40976
	       	},
	        zoom: 14
	    }

		return (
			<div style={{textAlign:'center'}}>
				{isMapLoaded && 
					<GMap 
						overlays={points}
						options={options} 
						onMapClick={this.onMapClick}
						style={{width: '100%', minHeight: '320px'}} 
					/>
				}
				{!isMapLoaded && 
					<Loader 
                        type="Puff"
                        color="#5867dd"
                        height="100"   
                        width="100"
                    />
				}
			</div>
		)
	}
}