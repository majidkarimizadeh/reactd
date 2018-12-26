import React, { Component } from 'react'
import { Button } from 'primereact/button'
import { ScrollPanel } from 'primereact/components/scrollpanel/ScrollPanel'

export default class MorphComponent extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount() {
    	const { morphKey } = this.props 
    	let table = morphKey + '_morph'
    	console.log(table)
    }

    render() {
    	return <div>adsasdasd</div>
    }
}