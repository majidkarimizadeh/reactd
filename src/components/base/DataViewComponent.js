import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import TableComponent from './TableComponent'
import GridComponent from './GridComponent'

class DataViewComponent extends Component {
    
    render() {
        const { 
            data, 
            cols, 
            table,
            row,
            options,
            details,
            perm,
            viewLoading,
            dataLoading,
            firstRow,
            numRows,
            totalRows,
            filterRow,
            showFilter,
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

            onTableCustomShow,
            onRowCustomShow,
            onAllCustomShow,

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

                        onAllCustomShow={onAllCustomShow}
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
                        cols={cols}
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
                        
                        onTableCustomShow={onTableCustomShow}
                        onRowCustomShow={onRowCustomShow}
                    />
                }
            </div>
        )
    }
}

export default DataViewComponent