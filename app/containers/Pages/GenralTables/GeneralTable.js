import React from 'react';
import MUIDataTable from 'mui-datatables';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Visibility} from '@material-ui/icons';
import classNames from 'classnames';
import GeneralToolbarTable from './GeneralToolbarTable';
import {exportAsExcel} from '../../../utils/excel';

const styles = theme => ({
    table: {
        '& > div': {
            overflow: 'auto'
        },
        '& table': {
            '& td': {
                wordBreak: 'keep-all'
            },
            [theme.breakpoints.down('md')]: {
                '& td': {
                    height: 60,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }
            }
        }
    },
    toolbarBtn: {
        '&:hover': {
            color: theme.palette.primary.main
        }
    },
    hideToolBar: {
        '& .MuiToolbar-root': {
            display: 'none'
        }
    }
});

const GeneralTable = (props) => {
    const {classes} = props;

    function handleExportExcel() {
        exportAsExcel(props.data, props.title, props.columns);
    }

    const options = {
        filterType: 'dropdown',
        responsive: 'vertical',
        print: props.classicPrintButton,
        selectableRows: props.selectedRows,
        rowsPerPage: 10,
        page: 0,
        downloadOptions: {
            filename: props.title + '.csv'
        },
        onDownload: (buildHead, buildBody, columns, data) => '\uFEFF' + buildHead(columns).replaceAll('"', '') + buildBody(data).replaceAll('"', ''),
        customToolbar: () => (
            <GeneralToolbarTable
                tooltip={props.addButtonTitle ?? "Add Register"}
                addButtonVisibility={props.addButtonVisibility}
                printButtonVisibility={props.printButtonVisibility}
                handleAddClick={props.handleAddData}
                handlePrintClick={props.handlePrintData}
                handleExportExcel={props.hideExcelExport ? null : handleExportExcel}
            />
        ),
        customToolbarSelect: (selectedRows, displayData, setSelectedRows) => {
            const dataIndex = selectedRows.data.map(selectedRow => selectedRow.dataIndex);
            const elements = [];
            if (dataIndex.length > 0) {
                for (let i = 0; i < dataIndex.length; i++) {
                    elements.push(props.data[dataIndex[i]]);
                }
            }
            return (
                <div style={{paddingRight: 10}}>
                    {elements?.length === 1
                        ? (
                            <>
                                {props.previewButtonVisibility && (
                                    <Tooltip title="Preview Register" className={classes.toolbarBtn}>
                                        <IconButton onClick={() => {
                                            props.handlePreviewData(elements);
                                        }}
                                        >
                                            <Visibility/>
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {props.editButtonVisibility && (
                                    <Tooltip title='Edit Register' className={classes.toolbarBtn}>
                                        <IconButton onClick={() => {
                                            props.handleEditData(elements);
                                        }}
                                        >
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </>
                        ) : null
                    }
                    {props.deleteButtonVisibility && (
                            <Tooltip title='table.Delete Register' className={classes.toolbarBtn}>
                                <IconButton onClick={() => {
                                    props.handleDeleteData(elements, setSelectedRows);
                                }}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </Tooltip>
                        )
                    }
                </div>
            );
        },
    };
    return (
        <div
            className={props.showToolBar === true ? classNames(classes.table) : classNames(classes.table, classes.hideToolBar)}
        >
            <MUIDataTable
                title={props.title}
                data={props.data}
                columns={props.columns}
                options={options}
            />
        </div>
    );
};

GeneralTable.defaultProps = {
    addButtonVisibility: true,
    printButtonVisibility: false,
    editButtonVisibility: true,
    previewButtonVisibility: true,
    deleteButtonVisibility: true,
    showToolBar: true,
    selectedRows: 'single',
    classicPrintButton: true,
    handlePrintData: () => {
    },
    hideExcelExport: false,
    entityName: "Other"
};
GeneralTable.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    addButtonTitle: PropTypes.string,
    handleAddData: PropTypes.func.isRequired,
    handlePrintData: PropTypes.func.isRequired,
    handleEditData: PropTypes.func.isRequired,
    handlePreviewData: PropTypes.func.isRequired,
    handleDeleteData: PropTypes.func.isRequired,
    classicPrintButton: PropTypes.bool.isRequired,
    selectedRows: PropTypes.string.isRequired,
    hideExcelExport: PropTypes.bool,
    entityName: PropTypes.string
};
export default withStyles(styles)(GeneralTable);
