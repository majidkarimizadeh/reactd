import React, { Component } from 'react'
import { Tree } from 'primereact/tree'

export default class TreeComponent extends Component {

    render() {

        const {
            tree,
            onSelectionChange,
            onExpand,
            style
        } = this.props

        return (
            <div>
                <Tree 
                    value={tree} 
                    selectionMode="single" 
                    onSelectionChange={onSelectionChange}
                    onExpand={onExpand}
                    style={style}
                />
            </div>
        )
    }
}
