import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { useForm, Controller } from 'react-hook-form';
import Grid from '@material-ui/core/Grid';
import {
  FormControl, Input, InputLabel, MenuItem, Select
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import Currencies from 'iso-currencies/currencies';
import { useParams } from 'react-router-dom';
import MomentUtils from '@date-io/moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { City, State } from 'country-state-city';
import { postContract } from '../../redux/actions/contracts';
import InternalCompaniesService from '../../containers/Services/InternalCompaniesService';

const currencies = Currencies.list();


const AddClientContractButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const {
    handleSubmit, control, reset, setValue, getValues, register
  } = useForm();
  const { clientId } = useParams();
  const [suppliers, setSuppliers] = useState([{ name: 'TechniU' }, { name: 'ImplementalSystems' }, { name: 'TechniBoot' }]);
  useEffect(() => {
    InternalCompaniesService.getSuppliers().then(response => {
      setSuppliers(response.data);
    });
  }, []);

  const handlePost = (payload) => {
    props.postContract({ clientId, contract: payload });
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };
  const [exchangeRate, setExchangeRate] = useState(1);

  const [selectedLegalFiles, setSelectedLegalFiles] = useState([]);
  const [selectedTechnicalFiles, setSelectedTechnicalFiles] = useState([]);
  const [selectedEconomicalFiles, setSelectedEconomicalFiles] = useState([]);
  const [selectedOtherFiles, setSelectedOtherFiles] = useState([]);

  const handleLegalFileSelectionChange = (event) => {
    const files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      files.push(event.target.files.item(i));
    }
    setSelectedLegalFiles(files);
  };
  const handleTechnicalFileSelectionChange = (event) => {
    const files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      files.push(event.target.files.item(i));
    }
    setSelectedTechnicalFiles(files);
  };
  const handleEconomicalFileSelectionChange = (event) => {
    const files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      files.push(event.target.files.item(i));
    }
    setSelectedEconomicalFiles(files);
  };
  const handleOtherFileSelectionChange = (event) => {
    const files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      files.push(event.target.files.item(i));
    }
    setSelectedOtherFiles(files);
  };

  return (
    <>
      <Tooltip title="Add new Contract">
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
        <DialogTitle id="add-dialog-title">Add new Contract</DialogTitle>
        <form onSubmit={handleSubmit(handlePost)}>
          <DialogContent>
            <Grid container>
              <Grid container>
                <Grid item xs={6}>
                  <Controller
                    rules={{ required: true }}
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <TextField
                        error={invalid}
                        required
                        inputRef={ref}
                        fullWidth
                        onChange={onChange}
                        value={value}
                        id={name}
                        label="Contract Name"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    // rules={{ required: true }}
                    name="supplierName"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <FormControl fullWidth>
                        <InputLabel>Supplier Name</InputLabel>
                        <Select
                          value={value}
                          name={name}
                          inputRef={ref}
                          error={invalid}
                          fullWidth
                          onChange={onChange}
                        >
                          {suppliers.map((supplier, index) => (
                            <MenuItem
                              key={index}
                              value={supplier.name}
                            >
                              {supplier.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <Controller
                    rules={{ required: true }}
                    name="beginningDate"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <MuiPickersUtilsProvider utils={MomentUtils}>
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
                          label="Beginning Date"
                          InputLabelProps={{ shrink: true, }}
                        />
                      </MuiPickersUtilsProvider>

                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    rules={{ required: true, validate: (v) => new Date(v).getTime() > new Date(getValues('beginningDate')).getTime() }}
                    name="finishingDate"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <MuiPickersUtilsProvider utils={MomentUtils}>
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
                          label="Finishing Date"
                          InputLabelProps={{ shrink: true, }}
                        />
                      </MuiPickersUtilsProvider>
                    )}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Controller
                    rules={{ required: true }}
                    name="signingDate"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <MuiPickersUtilsProvider utils={MomentUtils}>
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
                          label="Signing Date"
                          InputLabelProps={{ shrink: true, }}
                        />
                      </MuiPickersUtilsProvider>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <Controller
                    rules={{ required: true }}
                    name="amountLocal"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <TextField
                        type="number"
                        required
                        error={invalid}
                        inputRef={ref}
                        fullWidth
                        onChange={event => {
                          const amountLocal = parseFloat(parseFloat(event.target.value).toFixed(3));
                          onChange(amountLocal);
                          setValue('amountEuro', (amountLocal | 0) * exchangeRate);
                        }}
                        value={value}
                        id={name}
                        label="Amount (Local)"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    rules={{ required: true }}
                    name="currencyType"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <FormControl fullWidth>
                        <InputLabel id={`${name}-label`}>Currency Type</InputLabel>
                        <Select
                          error={invalid}
                          inputRef={ref}
                          fullWidth
                          labelId={`${name}-label`}
                          id={name}
                          value={value}
                          onChange={onChange}
                        >
                          {
                            Object.keys(currencies).map((currency, index) => (
                              <MenuItem
                                key={index}
                                value={currency}
                              >
                                {`${currencies[currency].name} - ${currencies[currency].symbol}`}
                              </MenuItem>
                            ))
                          }
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                    type="number"
                    inputProps={{ step: '0.001' }}
                    required
                    fullWidth
                    value={exchangeRate}
                    onChange={event => {
                      setExchangeRate(event.target.value ? parseFloat(parseFloat(event.target.value).toFixed(3)) : 0);
                    }}
                    label="Exchange rate to Euro"
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    rules={{ required: true, valueAsNumber: true }}
                    name="amountEuro"
                    control={control}
                    defaultValue=""
                    render={({
                      onChange, value, name, ref
                    }, { invalid }) => (
                      <TextField
                        type="number"
                        required
                        inputProps={{ step: '0.001' }}
                        error={invalid}
                        inputRef={ref}
                        fullWidth
                        onChange={onChange}
                        value={(getValues('amountLocal') | 0) * exchangeRate}
                        id={name}
                        label="Amount (Euro)"
                      />
                    )}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    style={{ marginTop: 20 }}
                    variant="outlined"
                    onChange={handleLegalFileSelectionChange}
                    name="legalFiles"
                    inputProps={{ multiple: true, ref: register }}
                    required
                    type="file"
                    fullWidth
                    label="Legal Files"
                    InputLabelProps={{ shrink: true, }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                {selectedLegalFiles.map((file, index) => (
                  <Grid key={index} container>
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                      <Controller
                        rules={{ required: true }}
                        name={`legalDocuments[${index}].title`}
                        control={control}
                        defaultValue={file.name.replace(/\.[^/.]+$/, '')}
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Title"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Controller
                        rules={{ required: true }}
                        name={`legalDocuments[${index}].description`}
                        control={control}
                        defaultValue=""
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Description"
                          />
                        )}
                      />
                    </Grid>
                    <Controller
                      rules={{ required: true }}
                      name={`legalDocuments[${index}].type`}
                      control={control}
                      defaultValue="LEGAL"
                    />
                  </Grid>
                ))}

              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    style={{ marginTop: 20 }}
                    variant="outlined"
                    onChange={handleTechnicalFileSelectionChange}
                    name="technicalFiles"
                    inputProps={{ multiple: true, ref: register }}
                    type="file"
                    fullWidth
                    label="Technical Files"
                    InputLabelProps={{ shrink: true, }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                {selectedTechnicalFiles.map((file, index) => (
                  <Grid key={index} container>
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                      <Controller
                        rules={{ required: true }}
                        name={`technicalDocuments[${index}].title`}
                        control={control}
                        defaultValue={file.name.replace(/\.[^/.]+$/, '')}
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Title"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Controller
                        rules={{ required: true }}
                        name={`technicalDocuments[${index}].description`}
                        control={control}
                        defaultValue=""
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Description"
                          />
                        )}
                      />
                    </Grid>
                    <Controller
                      rules={{ required: true }}
                      name={`technicalDocuments[${index}].type`}
                      control={control}
                      defaultValue="TECHNICAL"
                    />
                  </Grid>
                ))}

              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    style={{ marginTop: 20 }}
                    variant="outlined"
                    onChange={handleEconomicalFileSelectionChange}
                    name="economicalFiles"
                    inputProps={{ multiple: true, ref: register }}
                    type="file"
                    fullWidth
                    label="Economical Files"
                    InputLabelProps={{ shrink: true, }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                {selectedEconomicalFiles.map((file, index) => (
                  <Grid key={index} container>
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                      <Controller
                        rules={{ required: true }}
                        name={`economicalDocuments[${index}].title`}
                        control={control}
                        defaultValue={file.name.replace(/\.[^/.]+$/, '')}
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Title"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Controller
                        rules={{ required: true }}
                        name={`economicalDocuments[${index}].description`}
                        control={control}
                        defaultValue=""
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Description"
                          />
                        )}
                      />
                    </Grid>
                    <Controller
                      rules={{ required: true }}
                      name={`economicalDocuments[${index}].type`}
                      control={control}
                      defaultValue="ECONOMICAL"
                    />
                  </Grid>
                ))}

              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <TextField
                    style={{ marginTop: 20 }}
                    variant="outlined"
                    onChange={handleOtherFileSelectionChange}
                    name="otherFiles"
                    inputProps={{ multiple: true, ref: register }}
                    type="file"
                    fullWidth
                    label="Other Files"
                    InputLabelProps={{ shrink: true, }}
                  />
                </Grid>
              </Grid>
              <Grid container>
                {selectedOtherFiles.map((file, index) => (
                  <Grid key={index} container>
                    <Grid item xs={1} />
                    <Grid item xs={3}>
                      <Controller
                        rules={{ required: true }}
                        name={`otherDocuments[${index}].title`}
                        control={control}
                        defaultValue={file.name.replace(/\.[^/.]+$/, '')}
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Title"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Controller
                        rules={{ required: true }}
                        name={`otherDocuments[${index}].description`}
                        control={control}
                        defaultValue=""
                        render={({
                          onChange, value, name, ref
                        }, { invalid }) => (
                          <TextField
                            required
                            error={invalid}
                            inputRef={ref}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            id={name}
                            label="Description"
                          />
                        )}
                      />
                    </Grid>
                    <Controller
                      rules={{ required: false }}
                      name={`otherDocuments[${index}].type`}
                      control={control}
                      defaultValue="OTHER"
                    />
                  </Grid>
                ))}

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

const mapDispatchToProps = { postContract };

export default connect(null, mapDispatchToProps)(AddClientContractButton);
