import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import TableComponent from './TableComponent'
import GridComponent from './GridComponent'

class DataViewComponent extends Component {
    
    render() {
        const { 
            err,
            data, 
            cols, 
            table,
            row,
            mode,
            alertMode,
            options,
            details,
            activeDetailIndex,
            detailDetails,
            detailData,
            detailCols,
            detailTable,
            detailRow,
            detailTotalRows,
            baseSrc,
            src,
            crop,
            isLoading,
            customComponent,
            perm,
            dataLoading,
            firstRow,
            numRows,
            totalRows,
            filterRow,
            showFilter,
            isMapLoaded,
            lang,
            defaultView,



            onLookUp,
            onSelectionChange,
            onFilterInputChange,
            onFilterVisibilityChange,
            onRefreshTableData,
            onLoadData,
            onShowAlertDialog,
            onShowDialog,
            onChangeView,

        } = this.props

        return (
            <div>
                {(defaultView === 'lst') &&
                    <TableComponent 
                        details={details}
                        data={data}
                        cols={cols}
                        table={table}
                        row={row}
                        filterRow={filterRow}
                        dataLoading={dataLoading}
                        firstRow={firstRow}
                        numRows={numRows}
                        totalRows={totalRows}
                        options={options}
                        showFilter={showFilter}
                        perm={perm}

                        onShowAlertDialog={onShowAlertDialog}
                        onShowDialog={onShowDialog}
                        onLoadData={onLoadData}
                        onLookUp={onLookUp}
                        onFilterInputChange={onFilterInputChange}
                        onFilterVisibilityChange={onFilterVisibilityChange}
                        onRefreshTableData={onRefreshTableData}
                        onSelectionChange={onSelectionChange}
                        onChangeView={onChangeView}
                    />
                }
                {(defaultView === 'grd') &&
                    <GridComponent
                        data={data}
                        table={table}
                        dataLoading={dataLoading}
                        firstRow={firstRow}
                        numRows={numRows}
                        totalRows={totalRows}
                        perm={perm}

                        onLoadData={onLoadData}
                        onShowAlertDialog={onShowAlertDialog}
                        onShowDialog={onShowDialog}
                        onChangeView={onChangeView}
                    />
                }
            </div>
        )
    }
}

export default DataViewComponent