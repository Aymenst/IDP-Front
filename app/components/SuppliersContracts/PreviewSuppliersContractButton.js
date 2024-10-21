import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Currencies from 'iso-currencies';
import { DataTable, PreviewDocumentButton } from 'dan-components';
import { ListItem } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
const currencies = Currencies.list();

const PreviewContractButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const data = props.selected.length === 1 ? props.selected[0] : null;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columns = [
        {
            field: 'type',
            headerName: 'Type',
            renderCell: value => value,
            renderExport: value => value

        },
        {
            field: 'title',
            headerName: 'Title',
            renderCell: value => value,
            renderExport: value => value
        },
        {
            field: 'description',
            headerName: 'Description',
            renderCell: value => value,
            renderExport: value => value
        },
        {
            field: 'path',
            headerName: 'Contracts',
            renderCell: value => (
                <ListItem dense component="a" href={value} download>
                    <SaveAltIcon />
                </ListItem>
            ),
            ignoreExport: true
        }
    ];
    const actions = [PreviewDocumentButton];// TODO: ADD ZIP DOWNLOAD
    const contextHandlers = [];
    return (
        data ? (
            <>
                <Tooltip title="Preview Contract">
                    <IconButton color="primary" onClick={handleClickOpen} aria-label="preview">
                        <VisibilityIcon />
                    </IconButton>
                </Tooltip>
                <Dialog
                    disableBackdropClick
                    fullWidth
                    maxWidth="lg"
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="preview-dialog-title"
                    aria-describedby="preview-dialog-description"
                >
                    <DialogTitle id="preview-dialog-title">Preview Contract</DialogTitle>
                    <DialogContent>
                        <Grid container>
                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        value={data?.name}
                                        multiline
                                        rowsMax={4}
                                        label="Contract Name"
                                        InputLabelProps={{ shrink: true, }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        value={data?.supplierName}
                                        multiline
                                        rowsMax={4}
                                        label="Supplier Name"
                                        InputLabelProps={{ shrink: true, }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        value={new Date(data?.beginningDate).toDateString()}
                                        label="Beginning Date"
                                        InputLabelProps={{ shrink: true, }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        value={new Date(data?.finishingDate).toDateString()}
                                        label="Finishing Date"
                                        InputLabelProps={{ shrink: true, }}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        value={new Date(data?.signingDate).toDateString()}
                                        label="Signing Date"
                                        InputLabelProps={{ shrink: true, }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        value={data?.amountLocal}
                                        label="Amount (Local)"
                                        InputLabelProps={{ shrink: true, }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        aria-readonly
                                        value={`${currencies[data?.currencyType]?.name} - ${currencies[data?.currencyType]?.symbol} `}
                                        label="Currency Type"
                                        InputLabelProps={{ shrink: true, }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    aria-readonly
                                    value={data?.amountEuro}
                                    label="Amount (Euro)"
                                    InputLabelProps={{ shrink: true, }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <DataTable
                                    title="Attachments"
                                    rows={data?.documents}
                                    columns={columns}
                                    contextHandlers={contextHandlers}
                                    actions={actions}
                                    enableExport={false}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            {'Cancel'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        ) : null
    );
};

PreviewContractButton.propTypes = {
    selected: PropTypes.array
};

export default PreviewContractButton;
