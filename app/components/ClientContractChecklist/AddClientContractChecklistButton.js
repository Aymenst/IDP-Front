import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import {useForm, Controller} from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Switch
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from 'react-redux';
import DeleteIcon from '@material-ui/icons/Delete';
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {postContract} from '../../redux/actions/contracts';
import DataTable from "../../components/DataTable/DataTable";
import UserService from "../../containers/Services/UserService";

const AddClientContractChecklistButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const {
        handleSubmit, control, reset
    } = useForm();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // setUsers
        UserService.getUsers().then(response => {
            setUsers(response.data.map(u => u.email));

        })
    }, [])

    const handlePost = (payload) => {
        payload.items = payload.items.map(item => ({
            ...item,
            id: null
        }));
        console.log(payload);
        props.handlePost(payload);
        // props.postContract({clientId: clientId, contract: payload});
        // setOpen(false);
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
            <Tooltip title="Add new Checklist">
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
                <DialogTitle id="add-dialog-title">Add new Checklist</DialogTitle>
                <form onSubmit={handleSubmit(handlePost)}>
                    <DialogContent>
                        <Grid container>
                            <Grid item xs={12}>
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
                                            label="Checklist name"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    rules={{required: true, validate: v => v.length > 0}}
                                    name="items"
                                    control={control}
                                    defaultValue={[]}
                                    render={({
                                                 onChange, value, name, ref
                                             }, {invalid}) => {
                                        const AddTaskButton = (_props) => {
                                            const {
                                                handleSubmit,
                                                control,
                                                reset,
                                                getValues,
                                                setValue,
                                                watch
                                            } = useForm();
                                            const [_open, _setOpen] = React.useState(false);

                                            const _handleAddTask = (task) => {
                                                onChange([...value, task]);
                                            };
                                            const _handleClickOpen = () => {
                                                _setOpen(true);
                                            };
                                            const _handleClose = () => {
                                                _setOpen(false);
                                                reset();
                                            };
                                            const getYears = (from, to) => {
                                                const years = [];
                                                try {
                                                    const _from = new Date(from);
                                                    const _to = new Date(to);
                                                    if (from) years.push(_from.getUTCFullYear().toString());
                                                    const diff = _to.getUTCFullYear() - _from.getUTCFullYear();
                                                    for (let i = 0; i < diff; i++) {
                                                        years.push((_from.getUTCFullYear() + i + 1).toString());
                                                    }
                                                } catch (e) {
                                                    return [];
                                                } finally {
                                                    return years;
                                                }
                                            };
                                            return (
                                                <>
                                                    <Tooltip title="Add new Item">
                                                        <IconButton
                                                            color="primary"
                                                            onClick={_handleClickOpen}
                                                            aria-label="add"
                                                        >
                                                            <AddIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Dialog
                                                        disableBackdropClick
                                                        fullWidth
                                                        maxWidth="lg"
                                                        open={_open}
                                                        onClose={_handleClose}
                                                        aria-labelledby="add-dialog-title"
                                                        aria-describedby="add-dialog-description"
                                                    >
                                                        <DialogTitle
                                                            id="add-dialog-title"
                                                        >
                                                            {'Add new Item'}
                                                        </DialogTitle>
                                                        <form>
                                                            <DialogContent>
                                                                <Grid container>
                                                                    <Controller
                                                                        rules={{required: true}}
                                                                        name="id"
                                                                        control={control}
                                                                        defaultValue={value.length.toString()}
                                                                    />
                                                                    <Controller
                                                                        rules={{required: true}}
                                                                        name="type"
                                                                        control={control}
                                                                        defaultValue={'CLIENT'}
                                                                    />
                                                                    <Controller
                                                                        rules={{required: true}}
                                                                        name="frequency.year"
                                                                        control={control}
                                                                        defaultValue={[]}
                                                                    />
                                                                    <Grid item xs={12}>
                                                                        <Controller
                                                                            rules={{required: true}}
                                                                            name="name"
                                                                            control={control}
                                                                            defaultValue=""
                                                                            render={({
                                                                                         onChange,
                                                                                         value,
                                                                                         name,
                                                                                         ref
                                                                                     }, {invalid}) => (
                                                                                <TextField
                                                                                    error={invalid}
                                                                                    required
                                                                                    inputRef={ref}
                                                                                    fullWidth
                                                                                    onChange={onChange}
                                                                                    value={value}
                                                                                    id={name}
                                                                                    label="Item name"
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        <Controller
                                                                            rules={{required: true}}
                                                                            name="description"
                                                                            control={control}
                                                                            defaultValue=""
                                                                            render={({
                                                                                         onChange,
                                                                                         value,
                                                                                         name,
                                                                                         ref
                                                                                     }, {invalid}) => (
                                                                                <TextField
                                                                                    error={invalid}
                                                                                    required
                                                                                    inputRef={ref}
                                                                                    fullWidth
                                                                                    onChange={onChange}
                                                                                    value={value}
                                                                                    id={name}
                                                                                    multiline
                                                                                    rowsMax={4}
                                                                                    label="Description"
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs={12}>
                                                                        {/* PERSON */}
                                                                        <Controller
                                                                            rules={{required: true}}
                                                                            name="person"
                                                                            control={control}
                                                                            defaultValue={null}
                                                                            render={({
                                                                                         onChange,
                                                                                         value,
                                                                                         name,
                                                                                         ref
                                                                                     }, {invalid}) => (
                                                                                <Autocomplete
                                                                                    style={{marginTop: 20}}
                                                                                    onChange={(e, v) => onChange(v)}
                                                                                    value={value}
                                                                                    options={users}
                                                                                    getOptionLabel={(option) => option}
                                                                                    renderInput={(params) =>
                                                                                        <TextField {...params} required
                                                                                                   inputRef={ref}
                                                                                                   error={invalid}
                                                                                                   label="Person"
                                                                                                   variant="outlined"/>}
                                                                                />
                                                                            )}
                                                                        />

                                                                    </Grid>
                                                                    <Grid>
                                                                        <Controller
                                                                            name="includeDocuments"
                                                                            control={control}
                                                                            defaultValue={false}
                                                                            render={({
                                                                                         onChange,
                                                                                         value,
                                                                                         name,
                                                                                         ref
                                                                                     }, {invalid}) => (
                                                                                <FormControlLabel
                                                                                    control={(
                                                                                        <Switch
                                                                                            name={name}
                                                                                            checked={value}
                                                                                            onChange={() => onChange(!value)}
                                                                                            inputRef={ref}
                                                                                        />
                                                                                    )}
                                                                                    label="Must include Documents"
                                                                                />
                                                                            )}
                                                                        />
                                                                    </Grid>
                                                                    <Grid container>
                                                                        <Grid item xs={6}>
                                                                            <Controller
                                                                                rules={{required: true}}
                                                                                name="from"
                                                                                control={control}
                                                                                defaultValue={null}
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }, {invalid}) => (
                                                                                    <MuiPickersUtilsProvider
                                                                                        utils={MomentUtils}
                                                                                    >
                                                                                        <KeyboardDatePicker
                                                                                            fullWidth
                                                                                            format="yyyy-MM-DD"
                                                                                            mask="____-__-__"
                                                                                            onChange={onChange}
                                                                                            value={value}
                                                                                            name={name}
                                                                                            inputRef={ref}
                                                                                            error={invalid}
                                                                                            clearable
                                                                                            label="From"
                                                                                            InputLabelProps={{shrink: true,}}
                                                                                        />
                                                                                    </MuiPickersUtilsProvider>

                                                                                )}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={6}>
                                                                            <Controller
                                                                                rules={{
                                                                                    required: true,
                                                                                    validate: (v) => new Date(v).getTime() > new Date(getValues('from')).getTime()
                                                                                }}
                                                                                name="to"
                                                                                control={control}
                                                                                defaultValue={null}
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }, {invalid}) => (
                                                                                    <MuiPickersUtilsProvider
                                                                                        utils={MomentUtils}
                                                                                    >
                                                                                        <KeyboardDatePicker
                                                                                            fullWidth
                                                                                            format="yyyy-MM-DD"
                                                                                            mask="____-__-__"
                                                                                            onChange={onChange}
                                                                                            value={value}
                                                                                            name={name}
                                                                                            inputRef={ref}
                                                                                            error={invalid}
                                                                                            clearable
                                                                                            label="To"
                                                                                            InputLabelProps={{shrink: true,}}
                                                                                        />
                                                                                    </MuiPickersUtilsProvider>
                                                                                )}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid container>
                                                                        <Grid item xs={6}>
                                                                            <Controller
                                                                                rules={{required: true}}
                                                                                name="start"
                                                                                control={control}
                                                                                defaultValue={null}
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }, {invalid}) => (
                                                                                    <MuiPickersUtilsProvider
                                                                                        utils={MomentUtils}
                                                                                    >
                                                                                        <KeyboardTimePicker
                                                                                            fullWidth
                                                                                            format="HH:mm:ss"
                                                                                            mask="__:__:__"
                                                                                            onChange={onChange}
                                                                                            value={value}
                                                                                            name={name}
                                                                                            inputRef={ref}
                                                                                            error={invalid}
                                                                                            clearable
                                                                                            label="Start"
                                                                                            InputLabelProps={{shrink: true,}}
                                                                                            ampm={false}
                                                                                        />
                                                                                    </MuiPickersUtilsProvider>

                                                                                )}
                                                                            />
                                                                        </Grid>
                                                                        <Grid item xs={6}>
                                                                            <Controller
                                                                                rules={{
                                                                                    required: true,
                                                                                    validate: (v) => new Date(v).getTime() > new Date(getValues('start')).getTime()
                                                                                }}
                                                                                name="end"
                                                                                control={control}
                                                                                defaultValue={null}
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }, {invalid}) => (
                                                                                    <MuiPickersUtilsProvider
                                                                                        utils={MomentUtils}
                                                                                    >
                                                                                        <KeyboardTimePicker
                                                                                            fullWidth
                                                                                            format="HH:mm:ss"
                                                                                            mask="__:__:__"
                                                                                            onChange={onChange}
                                                                                            value={value}
                                                                                            name={name}
                                                                                            inputRef={ref}
                                                                                            error={invalid}
                                                                                            clearable
                                                                                            label="End"
                                                                                            InputLabelProps={{shrink: true,}}
                                                                                            ampm={false}
                                                                                        />
                                                                                    </MuiPickersUtilsProvider>
                                                                                )}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                    <Grid item xs={2}>
                                                                        Daily filter
                                                                    </Grid>
                                                                    <Grid item xs={10}>
                                                                        <FormGroup row>
                                                                            <Controller
                                                                                name="frequency.day.mo"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Mo"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.day.tu"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Tu"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.day.we"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="We"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.day.th"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Th"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.day.fr"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Fr"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.day.sa"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Sa"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.day.su"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Su"
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </FormGroup>
                                                                    </Grid>
                                                                    {/* WEEK */}
                                                                    <Grid item xs={2}>
                                                                        Weekly filter
                                                                    </Grid>
                                                                    <Grid item xs={10}>
                                                                        <FormGroup row>
                                                                            <Controller
                                                                                name="frequency.week.first"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="First"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.week.second"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Second"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.week.third"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Third"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.week.forth"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Forth"
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </FormGroup>
                                                                    </Grid>
                                                                    {/* MONTH */}
                                                                    <Grid item xs={2}>
                                                                        Monthly filter
                                                                    </Grid>
                                                                    <Grid item xs={10}>
                                                                        <FormGroup row>
                                                                            <Controller
                                                                                name="frequency.month.jan"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Jan"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.feb"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Feb"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.mar"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Mar"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.apr"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Apr"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.may"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="May"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.jun"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Jun"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.jul"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Jul"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.aug"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Aug"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.sep"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Sep"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.oct"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Oct"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.nov"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Nov"
                                                                                    />
                                                                                )}
                                                                            />
                                                                            <Controller
                                                                                name="frequency.month.dec"
                                                                                control={control}
                                                                                defaultValue
                                                                                render={({
                                                                                             onChange,
                                                                                             value,
                                                                                             name,
                                                                                             ref
                                                                                         }) => (
                                                                                    <FormControlLabel
                                                                                        control={(
                                                                                            <Checkbox
                                                                                                ref={ref}
                                                                                                name={name}
                                                                                                onChange={() => onChange(!value)}
                                                                                                checked={value}
                                                                                            />
                                                                                        )}
                                                                                        label="Dec"
                                                                                    />
                                                                                )}
                                                                            />
                                                                        </FormGroup>
                                                                    </Grid>
                                                                    {/* YEAR */}
                                                                    <Grid item xs={2}>
                                                                        Yearly filter
                                                                    </Grid>
                                                                    <Grid item xs={10}>
                                                                        <FormGroup row>
                                                                            {
                                                                                getYears(watch('from'), watch('to')).map((year, _index) => (
                                                                                        <FormControlLabel
                                                                                            key={_index}
                                                                                            control={(
                                                                                                <Checkbox
                                                                                                    onChange={(event) => {
                                                                                                        let years = getValues('frequency.year');
                                                                                                        years = years || [];
                                                                                                        if (event.target.checked) {
                                                                                                            setValue('frequency.year', [...years, year]);
                                                                                                        } else {
                                                                                                            setValue('frequency.year', [...years.filter(y => y != year)]);
                                                                                                        }
                                                                                                    }}
                                                                                                />
                                                                                            )}
                                                                                            label={year}
                                                                                        />
                                                                                    )
                                                                                )
                                                                            }

                                                                        </FormGroup>
                                                                    </Grid>
                                                                </Grid>
                                                            </DialogContent>
                                                            <DialogActions>
                                                                <Button onClick={_handleClose}>
                                                                    {'Cancel'}
                                                                </Button>
                                                                <Button
                                                                    onClick={handleSubmit(_handleAddTask)}
                                                                    color="primary"
                                                                    autoFocus
                                                                >
                                                                    {'Add'}
                                                                </Button>
                                                            </DialogActions>
                                                        </form>
                                                    </Dialog>
                                                </>
                                            );
                                        };
                                        const DeleteTaskButton = (_props) => {
                                            const _data = _props.selected.length > 0 ? _props.selected.map(d => d.id) : null;
                                            const _handleDeleteItem = () => {
                                                onChange(value.filter(v => !_data.includes(v.id)));
                                            };
                                            return (_data
                                                ? (
                                                    <Tooltip title="Delete">
                                                        <IconButton
                                                            onClick={_handleDeleteItem}
                                                            color="primary"
                                                            aria-label="delete"
                                                        >
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>
                                                ) : null);
                                        };

                                        return (
                                            <div ref={ref}>
                                                <DataTable
                                                    title={"Items"}
                                                    enableExport={false}
                                                    contextHandlers={[]}
                                                    actions={[AddTaskButton, DeleteTaskButton]}
                                                    columns={[
                                                        {
                                                            field: 'name',
                                                            headerName: 'Item name',
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
                                                            field: 'start',
                                                            headerName: 'Start',
                                                            renderCell: value => new Date(value).toDateString(),
                                                            renderExport: value => new Date(value).toDateString()
                                                        },
                                                        {
                                                            field: 'end',
                                                            headerName: 'End',
                                                            renderCell: value => new Date(value).toDateString(),
                                                            renderExport: value => new Date(value).toDateString()
                                                        },
                                                    ]}
                                                    rows={value}
                                                />
                                            </div>
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
                            {'Submit'}
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
};

const mapDispatchToProps = {
    postContract
};

export default connect(null, mapDispatchToProps)(AddClientContractChecklistButton);
