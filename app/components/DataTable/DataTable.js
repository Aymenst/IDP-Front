import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { FormControlLabel, InputBase, Switch } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { CSVLink } from 'react-csv';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import TableHead from '@material-ui/core/TableHead';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Search from '@material-ui/icons/Search';
import Save from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    overflowX: 'auto', // ADDED
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  cell: {
    minWidth: 10,
    overflowWrap: 'break-word',
    wordWrap: 'break-word'
  },
  row: theme.palette.type === 'light'
      ? {
        color: theme.palette.primary.main,
        backgroundColor: lighten(theme.palette.primary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark,
      }
}));
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
      theme.palette.type === 'light'
          ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          } : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
  title: {
    flex: '1 1 100%',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  }
}));
const DataTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    columns,
    title,
    handleSearch,
    handleColumnVisibilityChange,
    ExportButton,
    actions,
    selected
  } = props;
  const [state, setState] = useState({
    anchorEl: null
  });
  const setAnchorEl = (event) => {
    setState({
      anchorEl: event.currentTarget
    });
  };
  const handleClose = () => {
    setState({
      anchorEl: null
    });
  };
  return (
      <Toolbar className={clsx(classes.root, { [classes.highlight]: selected.length > 0 })}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {title}
        </Typography>
        <Tooltip title="Columns Visibility">
          <IconButton onClick={setAnchorEl} color="primary" aria-label="visibility">
            <ViewColumn />
          </IconButton>
        </Tooltip>
        <Menu
            id="columns-visibility-menu"
            anchorEl={state.anchorEl}
            keepMounted
            open={Boolean(state.anchorEl)}
            onClose={handleClose}
        >
          {columns.map((column, index) => (
              <MenuItem dense key={index}>
                <FormControlLabel
                    control={(
                        <Switch
                            size="small"
                            checked={!column.hide}
                            onChange={() => handleColumnVisibilityChange(index)}
                        />
                    )}
                    label={column.headerName}
                />
              </MenuItem>
          ))
          }
        </Menu>
        <ExportButton />
        <div className={classes.search}>
          <div className={classes.searchIcon}>

            <Search />
          </div>
          <InputBase
              onChange={handleSearch}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        {
          actions.map((Action, index) => (
              <React.Fragment key={index}>
                {<Action
                    selected={props.selected}
                    resetSelection={props.resetSelection}
                    match={props.match}
                />}
              </React.Fragment>
          ))
        }
      </Toolbar>
  );
};
DataTableToolbar.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.array,
  actions: PropTypes.array,
  selected: PropTypes.array,
  handleSearch: PropTypes.func.isRequired,
  resetSelection: PropTypes.func,
  handleColumnVisibilityChange: PropTypes.func.isRequired,
  ExportButton: PropTypes.any.isRequired,
  match: PropTypes.object,
};

const DataTableHead = (props) => {
  const {
    classes, columns, onSelectAllClick, onRequestSort, order, orderBy, numSelected, rowCount
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all' }}
            />
          </TableCell>
          {columns.map((column, columnIndex) => {
                if (column.hide) return;
                return (
                    <TableCell
                        style={{ textOverflow: '' }}
                        key={columnIndex}
                        align={column.align ? column.align : 'left'}
                        padding={column.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === column.field ? order : false}
                    >
                      <TableSortLabel
                          active={orderBy === column.field}
                          direction={orderBy === column.field ? order : 'asc'}
                          onClick={createSortHandler(column.field)}
                      >
                        {column.headerName}
                        {orderBy === column.prop
                            ? (
                                <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                            ) : null
                        }
                      </TableSortLabel>
                    </TableCell>
                );
              }
          )}
        </TableRow>
      </TableHead>
  );
};
DataTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
const DataTable = (props) => {
  const classes = useStyles();
  const [state, setState] = useState({
    columns: props.columns,
    order: 'asc',
    orderBy: '',
    selected: [], // CONTAINS SELECTED ITEMS IDS, NOT THE OBJECTS
    page: 0,
    dense: false,
    rowsPerPage: props.pageSize,
    searchTerm: '',
    mouseX: null,
    mouseY: null,
    rowId: null
  });
  const selected = props.rows ? props.rows.filter(row => state.selected.includes(row.id)) : []; // SELECTED ROWS (ENTIRE OBJECTS)
  const {
    rows, title, actions, enableExport
  } = props;
  const ExportButton = enableExport
      ? (_props) => {
        const _columns = props.columns.filter(column => !column.hide && !column.ignoreExport);
        const _headers = _columns.map((column, index) => {
          const h = {
            label: column.headerName,
            key: `${index}`
          };
          return h;
        });
        const _data = props.rows ? props.rows.map((row) => {
          let row_edited = {};
          _columns.forEach((column, index) => {
            row_edited = {
              ...row_edited,
              [`${index}`]: column.renderExport ? column.renderExport(row[column.field], row) : row[column.field]
            };
          });
          return row_edited;
        }) : [];

        return (
            <CSVLink filename={`${props.title}_${new Date().toDateString()}.csv`} data={_data} headers={_headers}>
              <Tooltip title="Export">
                <IconButton color="primary" aria-label="export">
                  <Save />
                </IconButton>
              </Tooltip>
            </CSVLink>
        );
      }
      : (props) => <></>;
  const toggleColumnVisibility = (i) => {
    setState({
      ...state,
      columns: state.columns.map((column, index) => {
        if (index === i) {
          return {
            ...column,
            hide: !column.hide
          };
        }
        return column;
      })
    });
  };
  // ---------------------Events handlers-------------------------------------------
  const handleRequestSort = (event, property) => {
    const isAsc = state.orderBy === property && state.order === 'asc';
    setState({
      ...state,
      order: isAsc ? 'desc' : 'asc',
      orderBy: property
    });
  };
  const resetSelection = () => {
    setState({
      ...state,
      selected: []
    });
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      setState({
        ...state,
        selected: props.rows.map(row => row.id) // WE SELECT IDS ONLY
      });
      return;
    }
    resetSelection();
  };
  const handleClick = (event, rowId) => {
    if (state.mouseY !== null) return;
    const selectedIndex = state.selected.indexOf(rowId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(state.selected, rowId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(state.selected.slice(1));
    } else if (selectedIndex === state.selected.length - 1) {
      newSelected = newSelected.concat(state.selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
          state.selected.slice(0, selectedIndex),
          state.selected.slice(selectedIndex + 1),
      );
    }
    setState({
      ...state,
      selected: newSelected
    });
  };
  const handleChangePage = (event, newPage) => {
    setState({
      ...state,
      page: newPage
    });
  };
  const handleChangeRowsPerPage = (event) => {
    setState({
      ...state,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    });
  };
  const handleChangeDense = (event) => {
    setState({
      ...state,
      dense: event.target.checked
    });
  };
  const handleSearch = (event) => {
    setState({
      ...state,
      searchTerm: event.target.value
    });
  };
  // -------------------Util functions------------------------------------------------
  const isSelected = (rowId) => state.selected.includes(rowId);
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };
  const stableSort = (array) => {
    if (!array) return [];
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const comparator = state.order === 'desc'
          ? (a, b) => descendingComparator(a, b, state.orderBy)
          : (a, b) => -descendingComparator(a, b, state.orderBy);
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };
  const extractValue = (row, field) => {
    const keys = field.split('.');
    let value = row;
    try {
      keys.forEach(key => {
        value = value[key];
      });
    } catch (e) {
      console.error(e);
      value = '';
    }
    return value;
  };
  const handleClickMenu = (event, rowId) => {
    event.preventDefault();
    setState({
      ...state,
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
      rowId
    });
  };
  const handleClose = () => {
    setState({
      ...state,
      mouseX: null,
      mouseY: null,
    });
  };

  return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <DataTableToolbar
              title={title}
              columns={state.columns}
              actions={actions}
              resetSelection={resetSelection}
              selected={selected}
              handleSearch={handleSearch}
              handleColumnVisibilityChange={toggleColumnVisibility}
              ExportButton={ExportButton}
              match={props.match} // MAYBE THIS WILL CAUSE ISSUES
          />
          <TableContainer>
            <Table
                className={classes.table}
                aria-labelledby="tableTitle"
                size={state.dense ? 'small' : 'medium'}
                aria-label="data table"
            >
              <DataTableHead
                  classes={classes}
                  columns={state.columns}
                  numSelected={state.selected.length}
                  order={state.order}
                  orderBy={state.orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length || 0}
              />
              <TableBody>
                {
                  !rows || rows.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={state.columns.length + 1} align="center">
                          <Typography color="secondary">No Records</Typography>
                        </TableCell>
                      </TableRow>
                  ) : null
                }
                {
                  stableSort(rows)
                      .filter(row => {
                        if (state.searchTerm === '') return true;
                        const str_row = JSON.stringify(row).toLowerCase();
                        const str_search = state.searchTerm.toLowerCase().split(' ').filter(v => v !== '');
                        for (let i = 0; i < str_search.length; i++) {
                          if (str_row.indexOf(str_search[i]) >= 0) return true;
                        }
                        return false;
                      })
                      .slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage)
                      .map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                            <TableRow
                                hover
                                onClick={(event) => handleClick(event, row.id)}
                                onContextMenu={(event) => handleClickMenu(event, row.id)}
                                style={{ cursor: 'context-menu' }}
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={index}
                                selected={isItemSelected}
                            >
                              <TableCell
                                  style={{ maxWidth: `${100 / state.columns.length}%!important`, }}
                                  padding="checkbox"
                              >
                                <Checkbox // color='primary'
                                    checked={isItemSelected}
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                              </TableCell>
                              {
                                state.columns.map((column, columnIndex) => {
                                  if (column.hide) return;
                                  return (
                                      column.renderCell
                                          ? (
                                              <TableCell
                                                  style={{ maxWidth: `${100 / state.columns.length}%`, }}
                                                  key={columnIndex}
                                                  component="th"
                                                  align={column.type === 'number' ? 'right' : 'left'}
                                                  id={columnIndex === 0 ? labelId : null}
                                                  scope={columnIndex === 0 ? 'row' : ''}
                                              >
                                                {column.renderCell(extractValue(row, column.field), row)}
                                              </TableCell>
                                          )
                                          : (
                                              <TableCell
                                                  style={{ maxWidth: `${100 / state.columns.length}%`, }}
                                                  key={columnIndex}
                                                  component="th"
                                                  align={column.type === 'number' ? 'right' : 'left'}
                                                  id={columnIndex === 0 ? labelId : null}
                                                  scope={columnIndex === 0 ? 'row' : ''}
                                              >
                                                {extractValue(row, column.field)}
                                              </TableCell>
                                          )
                                  );
                                })
                              }
                              <Menu
                                  keepMounted={false}
                                  open={state.mouseY !== null && state.rowId === row.id}
                                  onClose={handleClose}
                                  anchorReference="anchorPosition"
                                  anchorPosition={
                                    state.mouseY !== null && state.mouseX !== null
                                        ? { top: state.mouseY, left: state.mouseX }
                                        : undefined
                                  }
                              >
                                {
                                  props.contextHandlers.map((menu, index) => (
                                      menu.Component
                                          ? (
                                              <MenuItem key={index}>
                                                {<menu.Component
                                                    selected={[row]}
                                                    resetSelection={resetSelection}
                                                    match={props.match}
                                                />}
                                              </MenuItem>
                                          )
                                          : (
                                              <MenuItem
                                                  key={index}
                                                  onClick={() => {
                                                    menu.handle(row);
                                                    handleClose();
                                                  }}
                                              >
                                                {menu.name}
                                              </MenuItem>
                                          )
                                  ))
                                }
                              </Menu>
                            </TableRow>
                        );
                      })
                }
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
              rowsPerPageOptions={props.rowsPerPageOptions}
              component="div"
              count={rows.length || 0}
              rowsPerPage={state.rowsPerPage}
              page={state.page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
            control={<Switch checked={state.dense} onChange={handleChangeDense} />}
            label="Dense Table"
        />
      </div>
  );
};

DataTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string
  })),
  columns: PropTypes.array.isRequired,
  title: PropTypes.string,
  actions: PropTypes.array,
  enableExport: PropTypes.bool,
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
  pageSize: PropTypes.number.isRequired,
  contextHandlers: PropTypes.array.isRequired,
  match: PropTypes.object,
};

DataTable.defaultProps = {
  rowsPerPageOptions: [5, 10, 20, 50],
  pageSize: 5,
  enableExport: true,
  contextHandlers: [
    {
      name: 'Log',
      handle: (row) => {
        console.log(row);
      }
    }
  ],
  actions: [],
  title: ''
};

export default DataTable;
