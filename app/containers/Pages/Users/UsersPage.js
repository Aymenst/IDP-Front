import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Route } from 'react-router-dom';
import {
    DataTable, PapperBlock, AddUserButton
} from 'dan-components';
import { withStyles } from '@material-ui/core/styles';
import {
    Button, Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select,
    Switch,
    Typography
} from '@material-ui/core';
import UserService from '../../Services/UserService';
import CustomToolbar from "../../../components/CustomToolbar/CustomToolbar";
import MUIDataTable from "mui-datatables";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
// import set from "react-hook-form/dist/utils/set";


const styles = ({
    root: {
        flexGrow: 1,
    }
});

const UsersPage = (props) => {
    const {control, handleSubmit, setValue, reset} = useForm();
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openNotif, setOpenNotif] = useState(false);
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [severity, setSeverity] = useState("");

    const [adminRole, setAdminRole] = useState(false);
    const [crypto, setCrypto] = useState(false);
    const [stock, setStock] = useState(false);
    const [action, setAction] = useState(false);
    const [commodities, setCommodities] = useState(false);
    const [forex, setForex] = useState(false);
    const [enabled, setEnabled] = useState(false);
    const [record, setRecord] = useState("");
    const [openWarning, setOpenWarning] = useState(false);

    const [userName, setUserName] = useState("");
    const [surName, setSurName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [sold, setSold] = useState(0);
    const [role, setRole] = useState([]);

    useEffect(() => {
        UserService.getUsers().then(response => {
            setUsers(response.data);
        });
    }, []);

    const editAccount = (user) => {
        UserService.updateUser(user).then(response => {
            if (response.status === 200) {
                setUsers(response.data);
                setOpenNotif(true);
                setMessage(' User Updated Successfully');
                setSeverity('success');
                reset();
            }
        }).catch(err => {
            setOpenNotif(true);
            setMessage(err.response ? err.response.data.errors.message : '');
            setSeverity('error');
        });
    };

    const handlePost = (payload) => {
        const roles = [];
        if (adminRole) roles.push('ADMIN');
        payload.roles = roles;
        UserService.inviteUser(payload).then(response => {
            if (response.status === 200) {
                setUsers(response.data);
                setOpen(false);
                setOpenNotif(true);
                setMessage('User Added Successfully ');
                setSeverity('success');
                reset();
            }
        }).catch(err => {
            setOpenNotif(true);
            setMessage(err.response ? err.response.data.errors.message : '');
            setSeverity('error');
        });
    };

    const editInfo = () => {
        const roles = [];
        const enabled = true;
        if (adminRole) roles.push('ADMIN');
        const user = {id, name, userName, email, sold, phoneNumber, roles, enabled };
        UserService.updateUser(user).then(response => {
            if (response.status === 200) {
                setUsers(response.data);
                setOpenEdit(false);
                setOpenNotif(true);
                setMessage('User Updated Successfully');
                setSeverity('success');
                reset();
            }
        }).catch(err => {
            setOpenNotif(true);
            setMessage(err.response ? err.response.data.errors.message : '');
            setSeverity('error');
        });
    };

    const handleClose = () => {
        setOpenWarning(false);
        setOpen(false);
        setOpenEdit(false);
        setOpenNotif(false);
        reset();
    };

    const handleDetails = (tableMeta) => {
        setRole([]);
        const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
        const line = users[index];
        setAdminRole(false);

        if (line.enabled) setEnabled(true);
        line.roles.map(row => {
            if (row === "ADMIN") setAdminRole(true);
        });
        setId(line.id);
        setOpenEdit(true);
        setName(line.name);
        setSurName(line.surName);
        setUserName(line.userName);
        setEmail(line.email);
        setPassword(line.password);
        setPhoneNumber(line.phoneNumber);
        setSold(line.sold);
        reset();
    };

    const handleDeleteConfirmation = (tableMeta) => {
        const index = tableMeta.tableState.page * tableMeta.tableState.rowsPerPage + tableMeta.rowIndex;
        const id = users[index].id;
        setRecord(id);
        setOpenWarning(true);
    };

    const handleDelete = () => {
        UserService.deleteUser(record).then(response => {
            if (response.status === 200) {
                setUsers(response.data);
                setOpenWarning(false);
                setOpenNotif(true);
                setMessage('User Deleted successfully');
                setSeverity('success');
                reset();
            }
        }).catch(err => {
            setOpenNotif(true);
            setMessage(err.response ? err.response.data.errors.message : '');
            setSeverity('error');
        });
    };

    const handleClickOpen = () => {
        setAdminRole(false);
        setForex(false);
        setCrypto(false);
        setCommodities(false);
        setAction(false);
        setStock(false);
        setOpen(true);
    };

    const usersMail= users.map(u => u.email);

    return (
        <Route
            render={() => {
                //  console.log(password);
                const title = 'IDP Users ';
                const description = 'All the platform users ';
                const columns1 = [
                    {
                        name: 'name',
                        label: 'Full Name ',
                        renderCell: value => value,
                        renderExport: value => value
                    },
                    {
                        name: 'userName',
                        label: 'User Name',
                        renderCell: value => value,
                        renderExport: value => value
                    },
                    {
                        name: 'email',
                        label: 'Email',
                        renderCell: value => value,
                        renderExport: value => value,
                        options: {
                            setCellProps: () => ({
                                style: {
                                    whiteSpace: 'nowrap',
                                    position: 'sticky',
                                    left: '0',
                                    background: 'inherit',
                                    zIndex: 100
                                }
                            }),
                            setCellHeaderProps: () => ({
                                style: {
                                    whiteSpace: 'nowrap',
                                    position: 'sticky',
                                    left: 0,
                                    background: 'primary',
                                    zIndex: 101
                                }
                            })
                        },
                    },
                    {
                        name: 'roles',
                        label: 'Admin',
                        options: {
                            customBodyRender: (value, row) => (
                                <Switch
                                    checked={value.includes('ADMIN')}
                                    onChange={(event, checked) => {
                                        editAccount({ ...users[row.rowIndex], roles: checked ? [...value, 'ADMIN'] : [...value.filter(r => r !== 'ADMIN')] });
                                    }}
                                />
                            )},
                        renderExport: value => value.includes('ADMIN'),
                    },
                    {
                        name: 'enabled',
                        label: 'Enabled',
                        options: {
                            customBodyRender: (value, row) => (
                                <React.Fragment>
                                    <Switch
                                        checked={value}
                                        onChange={() => editAccount({...users[row.rowIndex], enabled: !users[row.rowIndex].enabled})}
                                    />
                                </React.Fragment>
                            ),
                        },
                        renderExport: value => value,
                    },
                    {
                        label: 'Actions',
                        name: 'actions',
                        options: {
                            filter: false,
                            sort: false,
                            empty: true,
                            download: false,
                            customBodyRender: (value, tableMeta) => (
                                <React.Fragment>
                                    <Tooltip title="Details">
                                        <IconButton onClick={() => handleDetails(tableMeta)}>
                                            <EditIcon color="primary" />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => handleDeleteConfirmation(tableMeta)}>
                                            <DeleteIcon color="secondary" />
                                        </IconButton>
                                    </Tooltip>
                                </React.Fragment>
                            ),
                            setCellProps: () => ({
                                style: {
                                    whiteSpace: 'nowrap',
                                    position: 'sticky',
                                    left: '0',
                                    background: 'inherit',
                                    zIndex: 100
                                }
                            }),
                            setCellHeaderProps: () => ({
                                style: {
                                    whiteSpace: 'nowrap',
                                    position: 'sticky',
                                    left: 0,
                                    background: 'primary',
                                    zIndex: 101
                                }
                            })
                        }
                    }
                ];
                const options = {
                    filter: true,
                    selectableRows: false,
                    filterType: 'dropdown',
                    responsive: 'stacked',
                    download: true,
                    downloadOptions: { filename: 'Users.csv' },
                    print: true,
                    rowsPerPage: 10,
                    customToolbar: () => (
                        <React.Fragment>
                            <CustomToolbar
                                csvData={users}
                                fileName="Users"
                                hasAddRole={false}
                                hasExportRole={true}
                            />
                            <Tooltip title="Add New User">
                                <IconButton onClick={handleClickOpen}>
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                        </React.Fragment>
                    )
                };
                return (
                    <div>
                        <Helmet>
                            <title>{title}</title>
                            <meta name="description" content={description} />
                            <meta property="og:title" content={title} />
                            <meta property="og:description" content={description} />
                            <meta property="twitter:title" content={title} />
                            <meta property="twitter:description" content={description} />
                        </Helmet>
                        <PapperBlock whiteBg icon="ion-md-contacts" title="BSF Users" desc="">
                            <div>
                                <MUIDataTable
                                    title="IDP User List"
                                    data={users}
                                    columns={columns1}
                                    options={options}
                                />
                            </div>
                        </PapperBlock>
                        <Dialog
                            open={openWarning}
                            keepMounted
                            scroll="paper"
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-slide-title"
                            aria-describedby="alert-dialog-slide-description"
                            fullWidth="xs"
                            maxWidth="xs"
                        >
                            <DialogTitle id="alert-dialog-slide-title"> Confirm Action </DialogTitle>
                            <DialogContent dividers>
                                <Typography align="center" variant="inherit">
                                    Are you sure to delete this user ?
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button color="inherit" onClick={handleDelete}>
                                    Confirm
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog
                            disableBackdropClick
                            maxWidth="md"
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="add-dialog-title"
                            aria-describedby="add-dialog-description"
                        >
                            <DialogTitle id="add-dialog-title">New User</DialogTitle>
                            <form onSubmit={handleSubmit(handlePost)}>
                                <DialogContent dividers>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="flex-start"
                                        direction="row"
                                        justify="center"
                                    >
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="subtitle2" component="h2" color="primary">
                                                User Information :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} />
                                        <Grid item xs={12} md={1} />
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
                                                        label="Full Name"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} />
                                        <Grid item xs={12} md={1} />
                                        <Grid item xs={12} md={5}>
                                            <Controller
                                                name="phoneNumber"
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
                                                        label="Phone Number"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <Controller
                                                rules={{required: true, validate: v => !usersMail.includes(v)}}
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
                                                        label="Email"
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} />
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="subtitle2" component="h2" color="primary">
                                                User Accessibility :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} />
                                        <Grid item xs={12} md={2}>
                                            <FormControl component="fieldset">
                                                <FormGroup aria-label="position" row>
                                                    <FormControlLabel
                                                        value="top"
                                                        label="Administrator"
                                                        labelPlacement="end"
                                                        control={(
                                                            <Checkbox
                                                                color="primary"
                                                                checked={adminRole}
                                                                onChange={() => setAdminRole(event.target.checked)}
                                                            />
                                                        )}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" color="primary" variant="contained" autoFocus>
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                        <Dialog
                            disableBackdropClick
                            maxWidth="md"
                            open={openEdit}
                            onClose={handleClose}
                            aria-labelledby="add-dialog-title"
                            aria-describedby="add-dialog-description"
                        >
                            <form onSubmit={handleSubmit(editInfo)}>
                                <DialogTitle id="add-dialog-title">Update User</DialogTitle>
                                <DialogContent dividers>
                                    <Grid
                                        container
                                        spacing={2}
                                        alignItems="flex-start"
                                        direction="row"
                                        justify="center"
                                    >
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="subtitle2" component="h2" color="primary">
                                                User Information :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} />
                                        <Grid item xs={12} md={1} />
                                        <Grid item xs={12} md={5}>
                                            <TextField
                                                id="name"
                                                label="Full Name"
                                                name="name"
                                                value={name}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={() => setName(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <TextField
                                                error={error}
                                                id="userName"
                                                label="User Name"
                                                name="userName"
                                                value={userName}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={() => setUserName(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} />
                                        <Grid item xs={12} md={1} />
                                        <Grid item xs={12} md={5}>
                                            <TextField
                                                id="phoneNumber"
                                                label="Phone Number"
                                                name="phoneNumber"
                                                value={phoneNumber}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={() => setPhoneNumber(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={5}>
                                            <TextField
                                                id="email"
                                                label="Email"
                                                name="email"
                                                value={email}
                                                fullWidth
                                                InputLabelProps={{ shrink: true }}
                                                onChange={() => setEmail(event.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={1} />
                                        <Grid item xs={12} md={2}>
                                            <Typography variant="subtitle2" component="h2" color="primary">
                                                User Accessibility :
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={10} />
                                        <Grid item xs={12} md={2}>
                                            <FormControl component="fieldset">
                                                <FormGroup aria-label="position" row>
                                                    <FormControlLabel
                                                        value="top"
                                                        label="Admin"
                                                        labelPlacement="end"
                                                        control={(
                                                            <Checkbox
                                                                color="primary"
                                                                checked={adminRole}
                                                                onChange={() => setAdminRole(event.target.checked)}
                                                            />
                                                        )}
                                                    />
                                                </FormGroup>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>
                                        Cancel
                                    </Button>
                                    <Button onClick={editInfo} type="submit" color="primary" variant="contained" autoFocus>
                                        Confirm
                                    </Button>
                                </DialogActions>
                            </form>
                        </Dialog>
                        <Snackbar
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center'
                            }}
                            autoHideDuration={3000}
                            open={openNotif}
                            onClose={handleClose}
                        >
                            <MuiAlert variant="filled" onClose={handleClose} severity={severity}>
                                {message}
                            </MuiAlert>
                        </Snackbar>
                    </div>
                );
            }}
        />
    );
};


export default withStyles(styles)(UsersPage);