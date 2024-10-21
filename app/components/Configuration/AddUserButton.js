import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import {useForm, Controller} from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import {
    FormControl, InputLabel, MenuItem, Select
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';


const AddUserButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const {
        handleSubmit, control, reset
    } = useForm();

    const handlePost = (payload) => {
        props.handlePost(payload);
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const roles = [
        {
            type: 'ADMIN',
            label: 'System Admin'
        },
        {
            type: 'CLIENT_MANAGER',
            label: 'Client Manager'
        },
        {
            type: 'TENDER_MANAGER',
            label: 'Tender Manager'
        },
        {
            type: 'PROJECT_PORTFOLIO_MANAGER',
            label: 'Project Manager'
        }];

    return (
        <>
            <Tooltip title="Add new User">
                <IconButton color="primary" onClick={handleClickOpen} aria-label="add">
                    <AddIcon/>
                </IconButton>
            </Tooltip>
            <Dialog
                disableBackdropClick
                maxWidth="md"
                open={open}
                onClose={handleClose}
                aria-labelledby="add-dialog-title"
                aria-describedby="add-dialog-description"
            >
                <DialogTitle id="add-dialog-title">Add New User</DialogTitle>
                <form onSubmit={handleSubmit(handlePost)}>
                    <DialogContent>
                        <Grid
                            container
                            spacing={2}
                            alignItems="flex-start"
                            direction="row"
                            justify="center"
                        >
                            <Grid item xs={12} md={5}>
                                <Controller
                                    rules={{required: true}}
                                    name="name"
                                    control={control}
                                    defaultValue=""
                                    render={({onChange, value, name, ref}, {invalid}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            name={name}
                                            inputRef={ref}
                                            error={invalid}
                                            fullWidth
                                            label="Name"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    rules={{required: true}}
                                    name="surName"
                                    control={control}
                                    defaultValue=""
                                    render={({onChange, value, name, ref}, {invalid}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            name={name}
                                            inputRef={ref}
                                            error={invalid}
                                            fullWidth
                                            label="Surname"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    rules={{required: true, validate: v => (v.length > 0 && v.length <= 8)}}
                                    name="userName"
                                    control={control}
                                    defaultValue=""
                                    render={({onChange, value, name, ref}, {invalid}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            name={name}
                                            inputRef={ref}
                                            error={invalid}
                                            fullWidth
                                            label="User Name"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <Controller
                                    rules={{required: true, validate: v => !props.users.includes(v)}}
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({onChange, value, name, ref}, {invalid}) => (
                                        <TextField
                                            onChange={onChange}
                                            value={value}
                                            name={name}
                                            inputRef={ref}
                                            error={invalid}
                                            fullWidth
                                            label="User Email"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={10}>
                                <Controller
                                    rules={{required: true, validate: v => v.length}}
                                    name={`roles`}
                                    control={control}
                                    defaultValue={[]}
                                    render={({onChange, value, name, ref}, {invalid}) => {
                                        return (
                                            <FormControl fullWidth>
                                                <InputLabel>Roles </InputLabel>
                                                <Select
                                                    onChange={onChange}
                                                    value={value}
                                                    name={name}
                                                    inputRef={ref}
                                                    error={invalid}
                                                    multiple
                                                    fullWidth>
                                                    {roles.map((type, index) => {
                                                        return (
                                                            <MenuItem key={index}
                                                                      value={type.type}>{type.label}</MenuItem>
                                                        );
                                                    })
                                                    }
                                                </Select>
                                            </FormControl>
                                        );
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            {'Cancel'}
                        </Button>
                        <Button type="submit" color="primary" autoFocus>
                            {'Save'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};


export default AddUserButton;
