import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import GetAppIcon from '@material-ui/icons/GetApp';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import PrintIcon from '@material-ui/icons/Print';
import styles from './GeneralToolbarTable-jss';


class GeneralToolbarTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes, tooltip
        } = this.props;
        return (
                    <React.Fragment>
                        {this.props.printButtonVisibility && (
                            <Tooltip title={"Print Table"} className={classes.toolbarBtn}>
                                <IconButton onClick={this.props.handlePrintClick}>
                                    <PrintIcon/>
                                </IconButton>
                            </Tooltip>
                        )}
                        {this.props.handleExportExcel && (
                            <Tooltip title={"download Excel"} className={classes.toolbarBtn}>
                                <IconButton onClick={this.props.handleExportExcel}>
                                    <GetAppIcon/>
                                </IconButton>
                            </Tooltip>
                        )}
                        {this.props.addButtonVisibility && (
                            <Tooltip title={tooltip} className={classes.toolbarBtn}>
                                <IconButton onClick={this.props.handleAddClick}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                        )}
                    </React.Fragment>
        )
    }
}


GeneralToolbarTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tooltip: PropTypes.string.isRequired,
    addButtonVisibility: PropTypes.bool.isRequired,
    handleAddClick: PropTypes.func.isRequired,
    handleExportExcel: PropTypes.func
};
export default withStyles(styles, {name: 'GeneralToolbarTable'})(GeneralToolbarTable);
