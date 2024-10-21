import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import { Country, State, City } from 'country-state-city';
import {
  FormControl, Input, InputLabel, MenuItem, Select
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import { postClient } from '../../redux/actions/clients';


const _countries = Country.getAllCountries();
const _country = Country.getAllCountries()[0].isoCode;
const _states = State.getStatesOfCountry(_country);
const _state = _states[0]?.isoCode;
const _cities = _state ? City.getCitiesOfState(_country, _state) : City.getCitiesOfCountry(_country);

const AddClientButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const {
    handleSubmit, control, reset, setValue
  } = useForm();
  const [selected, setSelected] = useState({
    country: _country,
    states: _states,
    cities: _cities
  });

  const handlePost = (payload) => {
    props.postClient(payload);
    setOpen(false);
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
      <Tooltip title="Add new Client">
        <IconButton color="primary" onClick={handleClickOpen} aria-label="add">
          <AddIcon />
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
        <DialogTitle id="add-dialog-title">Add new Client</DialogTitle>
        <form onSubmit={handleSubmit(handlePost)}>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="name"
                  control={control}
                  defaultValue=""
                  render={({
                    onChange, value, name, ref
                  }, { invalid }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      name={name}
                      inputRef={ref}
                      error={invalid}
                      fullWidth
                      label="Client Name"
                      multiline
                      rowsMax={4}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="taxRef"
                  control={control}
                  defaultValue=""
                  render={({
                    onChange, value, name, ref
                  }, { invalid }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      name={name}
                      inputRef={ref}
                      error={invalid}
                      fullWidth
                      label="Tax Ref"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="webPage"
                  control={control}
                  defaultValue=""
                  render={({
                    onChange, value, name, ref
                  }, { invalid }) => (
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
              <Grid item xs={12}>
                <Controller
                  rules={{ required: true }}
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({
                    onChange, value, name, ref
                  }, { invalid }) => (
                    <TextField
                      onChange={onChange}
                      value={value}
                      name={name}
                      inputRef={ref}
                      error={invalid}
                      fullWidth
                      label="Phone"
                    />
                  )}
                />
              </Grid>


              <Grid container>
                <Grid item xs={4}>
                  <Controller
                    rules={{ required: true }}
                    name="address.country"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
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
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
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
                    rules={{ required: true }}
                    name="address.city"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
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
                        )
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Controller
                    name="address.number"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
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
                    rules={{ valueAsNumber: true }}
                    name="address.postalCode"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
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
                  rules={{ required: true, minLength: 4 }}
                  name="address.addressLine1"
                  control={control}
                  defaultValue=""
                  render={({
                    onChange, value, name, ref
                  }, { invalid }) => (
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
                  rules={{ minLength: 4 }}
                  name="address.addressLine2"
                  control={control}
                  defaultValue=""
                  render={({
                    onChange, value, name, ref
                  }, { invalid }) => (
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
    </>
  );
};

const mapDispatchToProps = { postClient };

export default connect(null, mapDispatchToProps)(AddClientButton);
