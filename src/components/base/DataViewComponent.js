import React, { Component } from 'react'
import { Route, withRouter } from 'react-router-dom'
import Loader from 'react-loader-spinner'
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
            viewLoading,
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
            onCustomShow

        } = this.props

        return (
            <div>
                {viewLoading && 
                    <div>
                        <Loader type="Oval" color="#5867dd" height={80} width={80} />
                    </div>
                }
                {(!viewLoading && defaultView === 'lst') &&
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

                        onCustomShow={onCustomShow}
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
                {(!viewLoading && defaultView === 'grd') &&
                    <GridComponent
                        data={data}
                        table={table}
                        dataLoading={dataLoading}
                        firstRow={firstRow}
                        numRows={numRows}
                        totalRows={totalRows}
                        perm={perm}

                        onLoadData={onLoadData}
                        onCustomShow={onCustomShow}
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