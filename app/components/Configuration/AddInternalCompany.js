import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {useForm, Controller} from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';

const AddInternalCompany = (props) => {
    const [open, setOpen] = React.useState(false);
    const {
        handleSubmit, control, reset, setValue
    } = useForm();

    const handlePost = (payload) => {
        props.handlePost(payload);
        setOpen(false);
        reset();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    return (
        <>
            <Tooltip title="Add new Company">
                <IconButton color="primary" onClick={handleClickOpen} aria-label="add">
                    <AddIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                disableBackdropClick
                fullWidth
                maxWidth="lg"
                open={open}
                onClose={handleClose}
                aria-labelledby="add-dialog-title"
                aria-describedby="add-dialog-description"
            >
                <DialogTitle id="add-dialog-title">Add new Company</DialogTitle>
                <form onSubmit={handleSubmit(handlePost)}>
                    <DialogContent>
                        <Grid
                            container
                            spacing={4}
                            alignItems="flex-start"
                            direction="row"
                            justify="center"
                        >
                            <Grid item xs={12} md={7}>
                                <Controller
                                    rules={{required: true}}
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                                 onChange, value, name, ref
                                             }, {invalid}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            name={name}
                                            inputRef={ref}
                                            error={invalid}
                                            fullWidth
                                            label="Company Name"
                                            multiline
                                            rowsMax={4}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={7}>
                                <Controller
                                    name="webPage"
                                    control={control}
                                    defaultValue=""
                                    render={({
                                                 onChange, value, name, ref
                                             }, {invalid}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            name={name}
                                            inputRef={ref}
                                            error={invalid}
                                            fullWidth
                                            label="WEB Page"
                                        />
                                    )}
                                />
                            </Grid>

                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            {'Cancel'}
                        </Button>
                        <Button type="submit" color="primary" autoFocus>
                            {'Submit'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};


export default AddInternalCompany;
