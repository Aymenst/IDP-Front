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
    FormControl, InputLabel, MenuItem, Select
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import {City, Country, State} from 'country-state-city';
import CommentIcon from "@material-ui/icons/Edit";

const _countries = Country.getAllCountries();
const _country = Country.getAllCountries()[0].isoCode;
const _states = State.getStatesOfCountry(_country);
const _state = _states[0]?.isoCode;
const _cities = _state ? City.getCitiesOfState(_country, _state) : City.getCitiesOfCountry(_country);


const EditClientContractContactButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const {
        handleSubmit, control, reset, setValue
    } = useForm();
    const data = props.selected.length === 1 ? props.selected[0] : null;

    const [selected, setSelected] = useState({
        country: data?.address?.country,
        states: State.getStatesOfCountry(data?.address?.country),
        cities: State.getStatesOfCountry(data?.address?.country) ? City.getCitiesOfState(data?.address?.country, data?.address?.state) : City.getCitiesOfCountry(data?.address?.country)
    });
    useEffect(() => {
        setSelected({
            country: data?.address?.country,
            states: State.getStatesOfCountry(data?.address?.country),
            cities: State.getStatesOfCountry(data?.address?.country) ? City.getCitiesOfState(data?.address?.country, data?.address?.state) : City.getCitiesOfCountry(data?.address?.country)
        });
    }, [data]);

    const handlePut = (payload) => {
        props?.handlePut(payload);
        handleClose();
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
        data ? <>
            <Tooltip title="Edit Contact">
                <IconButton color="primary" onClick={handleClickOpen} aria-label="add">
                    <CommentIcon />
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
                <DialogTitle id="add-dialog-title">Edit Contact</DialogTitle>
                <form onSubmit={handleSubmit(handlePut)}>
                    <DialogContent>
                        <Grid container>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Controller
                                        rules={{required: true}}
                                        name="id"
                                        control={control}
                                        defaultValue={data.id}
                                    />
                                    <Controller
                                        rules={{required: true}}
                                        name="firstName"
                                        control={control}
                                        defaultValue={data.firstName}
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
                                                label="First name"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        rules={{required: true}}
                                        name="lastName"
                                        control={control}
                                        defaultValue={data.lastName}
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
                                                label="Last name"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="middleName"
                                        control={control}
                                        defaultValue={data.middleName}
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
                                                label="Middle name"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Controller
                                        rules={{required: true}}
                                        name="companyInfo.email"
                                        control={control}
                                        defaultValue={data.companyInfo.email}
                                    />
                                    <Controller
                                        rules={{required: true}}
                                        name="companyInfo.fix"
                                        control={control}
                                        defaultValue={data.companyInfo.fix}
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
                                                label="Company fix-phone"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        rules={{required: true}}
                                        name="companyInfo.mobile"
                                        control={control}
                                        defaultValue={data.companyInfo.mobile}
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
                                                label="Company mobile-phone"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    rules={{required: true}}
                                    name="companyInfo.skype"
                                    control={control}
                                    defaultValue={data.companyInfo.skype}
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
                                            label="Company skype"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Controller
                                        rules={{required: true}}
                                        name="personalInfo.email"
                                        control={control}
                                        defaultValue={data.personalInfo.email}
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
                                                label="Personal email"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        rules={{required: true}}
                                        name="personalInfo.mobile"
                                        control={control}
                                        defaultValue={data.personalInfo.mobile}
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
                                                label="Personal mobile-phone"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    rules={{required: true}}
                                    name="personalInfo.skype"
                                    control={control}
                                    defaultValue={data.personalInfo.skype}
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
                                            label="Personal skype"
                                        />
                                    )}
                                />
                            </Grid>
                            {/* ADDRESS */}
                            <Grid container>
                                <Grid item xs={4}>
                                    <Controller
                                        rules={{required: true}}
                                        name="address.country"
                                        control={control}
                                        defaultValue={data?.address?.country}
                                        render={({
                                                     onChange, value, name, ref
                                                 }, {invalid}) => (
                                            <FormControl fullWidth>
                                                <InputLabel>Country</InputLabel>
                                                <Select
                                                    value={value}
                                                    name={name}
                                                    inputRef={ref}
                                                    error={invalid}
                                                    fullWidth
                                                    onChange={event => {
                                                        const new_country = event.target.value.toString();
                                                        const new_states = State.getStatesOfCountry(new_country);
                                                        const new_cities = new_states.length > 0 ? [] : City.getCitiesOfCountry(new_country);
                                                        setSelected({
                                                            country: new_country,
                                                            states: new_states,
                                                            cities: new_cities
                                                        });
                                                        setValue('address.state', '');
                                                        setValue('address.city', '');
                                                        onChange(event);
                                                    }}
                                                >
                                                    {_countries.map((country, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={country.isoCode}
                                                        >
                                                            {country.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        name="address.state"
                                        control={control}
                                        defaultValue={data?.address?.state}
                                        render={({
                                                     onChange, value, name, ref
                                                 }, {invalid}) => (
                                            <FormControl fullWidth>
                                                <InputLabel>State</InputLabel>
                                                <Select
                                                    value={value}
                                                    name={name}
                                                    inputRef={ref}
                                                    error={invalid}
                                                    fullWidth
                                                    onChange={event => {
                                                        const new_state = event.target.value.toString();
                                                        const new_cities = new_state ? City.getCitiesOfState(selected.country, new_state) : City.getCitiesOfCountry(selected.country);
                                                        setSelected({
                                                            country: selected.country,
                                                            states: selected.states,
                                                            cities: new_cities
                                                        });
                                                        setValue('address.city', '');
                                                        onChange(event);
                                                    }}
                                                >
                                                    {
                                                        selected.states.map((state, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={state.isoCode}
                                                            >
                                                                {state.name}
                                                            </MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <Controller
                                        rules={{required: true}}
                                        name="address.city"
                                        control={control}
                                        defaultValue={data?.address?.city}
                                        render={({
                                                     onChange, value, name, ref
                                                 }, {invalid}) => (
                                            selected.cities.length > 0
                                                ? (
                                                    <FormControl fullWidth>
                                                        <InputLabel>City</InputLabel>
                                                        <Select
                                                            onChange={onChange}
                                                            value={value}
                                                            name={name}
                                                            inputRef={ref}
                                                            error={invalid}
                                                            fullWidth
                                                        >
                                                            {
                                                                selected.cities.map((city, index) => (
                                                                    <MenuItem
                                                                        key={index}
                                                                        value={city.name}
                                                                    >
                                                                        {city.name}
                                                                    </MenuItem>
                                                                ))
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                )
                                                : (
                                                    <TextField
                                                        onChange={onChange}
                                                        value={value}
                                                        name={name}
                                                        inputRef={ref}
                                                        error={invalid}
                                                        fullWidth
                                                        label="City"
                                                    />
                                                ))}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Controller
                                        name="address.number"
                                        control={control}
                                        defaultValue={data?.address?.number}
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
                                                label="Number"
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        rules={{valueAsNumber: true}}
                                        name="address.postalCode"
                                        control={control}
                                        defaultValue={data?.address?.postalCode}
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
                                                type="number"
                                                id="postalCode"
                                                label="Postal Code"
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    rules={{required: true, minLength: 4}}
                                    name="address.addressLine1"
                                    control={control}
                                    defaultValue={data?.address?.addressLine1}
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
                                            multiline
                                            label="Address line 1"
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    rules={{minLength: 4}}
                                    name="address.addressLine2"
                                    control={control}
                                    defaultValue={data?.address?.addressLine2}
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
                                            multiline
                                            label="Address line 2"
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
        </> : null
    );
};

export default EditClientContractContactButton;
