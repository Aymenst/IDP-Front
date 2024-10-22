import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel, MenuItem,
    Select,
    TextField,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import UserService from "../../Services/UserService";
import {withRouter} from "react-router-dom";

const useStyles = makeStyles();
const FilterDialogFooter = () => <Box width={420} />;

class ProfileBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            fullName: '',
            password: '',
            email: '',
            phoneNumber: '',
            birthDay: '',
            sold: 0,
            availability: true,
            enabled: true,
        };
    }

    componentDidMount() {
        const user = localStorage.getItem('user').toString();
        const id = user.slice(7, 31);
        UserService.getUsers().then(response => {
            response.data.map(row => {
                if (row.id === id) this.setState({ currentUser: row, id: row?.id, userName: row?.userName, email: row?.email, fullName: row?.name, birthDay: row?.birthDay?.toString().slice(0, 10), phoneNumber: row?.phoneNumber, sold: row?.sold, enabled: row?.enabled, roles: row?.roles });
            });
            this.setState({ users: response.data });
        });
    }

    handleDeleteConfirmation = () => {
        this.setState({ openWarning: true });
    };

    handleDelete = () => {
        const { currentUser } = this.state;
        currentUser.enabled = false;
        UserService.updateUser(currentUser).then(response => {
            if (response.status === 200) {
                this.setState({ openWarning: false });
                this.props.history.push('/login');
                localStorage.clear();
            }
        }).catch(err => {
            // console.log(err.response ? err.response.data.errors.message : '');
        });
    };

    handleClose = () => {
        this.setState({ openWarning: false });
    }

    handleSave = () => {
        const {id, name, userName, email, sold, phoneNumber, birthDay, roles, enabled } = this.state;
        const user = {id, name, userName, email, sold, phoneNumber, birthDay, roles, enabled };
        UserService.updateUser(user).then(response => {
            if (response.status === 200) {
                response.data.map(row => {
                    if (row.id === id) this.setState({ currentUser: row, id: row.id, userName: row.userName, email: row.email, fullName: row.name, birthDay: row.birthDay, phoneNumber: row.phoneNumber, sold: row.sold, status: row.enabled });
                });
            }
        }).catch(err => {
            // console.log(err.response ? err.response.data.errors.message : '');
        });
    };

    handleChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value });
    };

    render() {
        let {
            openWarning, fullName, userName, birthDay, phoneNumber, email, sold
        } = this.state;
        return (
            <div>
                <Grid
                    container
                    spacing={2}
                    alignItems="flex-start"
                    direction="row"
                    justify="center"
                >
                    <Grid item xs={12} md={4} />
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="userName"
                            label="User Name"
                            variant="outlined"
                            name="userName"
                            value={userName}
                            required
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} />
                    <Grid item xs={12} md={4} />
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="fullName"
                            label="Full Name"
                            variant="outlined"
                            name="fullName"
                            value={fullName}
                            required
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} />
                    <Grid item xs={12} md={4} />
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={email}
                            required
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} />
                    <Grid item xs={12} md={4} />
                    <Grid item xs={12} md={2}>
                        <TextField
                            id="phoneNumber"
                            label="PhoneNumber"
                            variant="outlined"
                            name="phoneNumber"
                            value={phoneNumber}
                            required
                            fullWidth
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={2}>
                        <TextField
                            id="birthDay"
                            label="BirthDay"
                            variant="outlined"
                            name="birthDay"
                            value={birthDay}
                            required
                            type={'date'}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={this.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} />
                </Grid>
                <div align="center">
                    <br />
                    <Button variant="contained" color="info" type="button" disabled onClick={this.handleDeleteConfirmation}>
                        Delete Account
                    </Button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button variant="contained" color="primary" type="button" onClick={this.handleSave}>
                        Save
                    </Button>
                </div>
                <Dialog
                    open={openWarning}
                    keepMounted
                    scroll="paper"
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    fullWidth="xs"
                    maxWidth="xs"
                >
                    <DialogTitle id="alert-dialog-slide-title" style={{ align: 'center'}}> Confirm Action </DialogTitle>
                    <DialogContent dividers>
                        <Typography align="center" variant="h6">
                            Are you sure to delete your account ?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={this.handleClose}>
                            Cancel
                        </Button>
                        <Button color="inherit" onClick={this.handleDelete}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const ProfileBlockMapped = withRouter((ProfileBlock));

export default () => {
    const classes = useStyles();
    return <ProfileBlockMapped classes={classes} />;
};