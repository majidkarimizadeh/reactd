import React, { Component } from 'react'
import { Tree } from 'primereact/tree'

export default class TreeComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {
            label, 
            placeholder,
            index,
            name,
            value,
            onInputChange,
            required,
            readOnly,
            type,
            treeSelected,
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
