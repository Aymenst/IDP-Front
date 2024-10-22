import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Grid,
    Box,
    Step,
    StepLabel,
    Stepper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Snackbar,
} from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import withStyles from '@material-ui/core/styles/withStyles';
import GeneralTable from '../GenralTables/GeneralTable';
import { PropTypes } from 'prop-types';
import DataService from "../../Services/DataService";
import ProfileService from "../../Services/ProfileService";
import axios from "axios";
import PDFViewer from 'pdf-viewer-reactjs'
import { PapperBlock } from 'dan-components';


const styles = {
    gridSizing: {
        marginBottom: '4%'
    },
    gridSizing2: {
        marginBottom: '1%'
    },
    buttonSpacing: {
        minHeight: 30,
        minWidth: 200
    }
};

const steps = ['Select Campaign Template', 'Generate PDF', 'Send Email'];

class BlankPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            skipped: new Set(),
            pdfUrl: '',
            profileId: '',
            dataId: '',
            entryId: '',
            name: '',
            email: '',
            country: '',
            eyeColor: '',
            height: '',
            dateOfBirth: '',
            address: '',
            shippingAddress: '',
            shippingMethod: '',
            un: '',
            idpValidity: '',
            total: '',
            phone: '',
            selfieUrl: '',
            licenseClass: '',
            licenseFrontUrl: '',
            licenseBackUrl: '',
            signatureUrl: '',
            message: '',
            profiles: [],
            data: [],
            dataFiltred: [],
            pageNumber: 1,
            zoom: 1,
            error: null,
            open: false,
            showPDF: false,
            openNotif: false,
            openPopUp: false,
            edit: false,
            success: false,
            loading: false,
            loading2: false,
            columns: [
                    {
                      label: 'Entry Id',
                      name: 'entryId',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Name',
                      name: 'name',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Email',
                      name: 'email',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Country',
                      name: 'country',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Eye Color',
                      name: 'eyeColor',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Height',
                      name: 'height',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'BirthDate',
                      name: 'dateOfBirth',
                      options: {
                        filter: true,
                        customBodyRender: (value, tableMeta) => (value?.substring(0, 10))
                        }
                    },
                    {
                      label: 'Address',
                      name: 'address',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Shipping Address',
                      name: 'shippingAddress',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Shipping Method',
                      name: 'shippingMethod',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Licence Class',
                      name: 'licenseClass',
                      options: {
                         filter: true
                      }
                    },
                    {
                      label: 'Un',
                      name: 'un',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'IDP Validity',
                      name: 'idpValidity',
                        options: {
                            filter: true,
                            customBodyRender: (value, tableMeta) => (value?.substring(0, 10))
                        }
                    },
                    {
                      label: 'Total',
                      name: 'total',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Phone',
                      name: 'phone',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Selfie',
                      name: 'selfieUrl',
                      options: {
                        filter: true,
                        customBodyRender: (value) => {
                                return value ? <a href={value} target="_blank" rel="noopener noreferrer">View Selfie</a> : 'No image';
                        }
                      }
                    },
                    {
                      label: 'License Front',
                      name: 'licenseFrontUrl',
                      options: {
                        filter: true,
                         customBodyRender: (value) => {
                                return value ? <a href={value} target="_blank" rel="noopener noreferrer">View License Front</a> : 'No image';
                         }
                      }
                    },
                    {
                      label: 'License Back',
                      name: 'licenseBackUrl',
                      options: {
                        filter: true,
                        customBodyRender: (value) => {
                                return value ? <a href={value} target="_blank" rel="noopener noreferrer">View License Back</a> : 'No image';
                        }
                      }
                    },
                    {
                      label: 'Signature',
                      name: 'signatureUrl',
                      options: {
                        filter: true,
                        customBodyRender: (value) => {
                                return value ? <a href={value} target="_blank" rel="noopener noreferrer">View Signature</a> : 'No image';
                              }
                      }
                    }
                  ]
        };
    }

    componentDidMount() {
        DataService.getData().then(row => {
            if (row.status === 200) {
                const untreated = row?.data.filter(item => !item.treated);
                const treated = row?.data.filter(item => item.treated);
                this.setState({ data: untreated, dataFiltred: treated });
            }
        });
        ProfileService.getRequest().then(row => {
            if (row.status === 200) this.setState({ profiles: row?.data });
        });
    }

    componentWillReceiveProps(props) {
        // console.log(props);
    }

    handlePreviewData = (data) => {
        this.setState({
            dataId: data[0].dataId,
            entryId: data[0].entryId,
            name: data[0].name,
            email: data[0].email,
            country: data[0].country,
            eyeColor: data[0].eyeColor,
            height: data[0].height,
            dateOfBirth: data[0].dateOfBirth?.substring(0, 10),
            address: data[0].address,
            shippingAddress: data[0].shippingAddress,
            shippingMethod: data[0].shippingMethod,
            un: data[0].un,
            idpValidity: data[0].idpValidity?.substring(0, 10),
            total: data[0].total,
            phone: data[0].phone,
            selfieUrl: data[0].selfieUrl,
            licenceFileId: data[0].licenceFileId,
            licenseClass: data[0].licenseClass,
            licenseFrontUrl: data[0].licenseFrontUrl,
            licenseBackUrl: data[0].licenseBackUrl,
            signatureUrl: data[0].signatureUrl,
            edit: false,
            openPopUp: true
        });
    };

    handleSendLicence = (data) => {
        this.setState({
            dataId: data[0].dataId,
            entryId: data[0].entryId,
            name: data[0].name,
            email: data[0].email,
            country: data[0].country,
            eyeColor: data[0].eyeColor,
            height: data[0].height,
            dateOfBirth: data[0].dateOfBirth?.substring(0, 10),
            address: data[0].address,
            shippingAddress: data[0].shippingAddress,
            shippingMethod: data[0].shippingMethod,
            un: data[0].un,
            idpValidity: data[0].idpValidity?.substring(0, 10),
            total: data[0].total,
            phone: data[0].phone,
            selfieUrl: data[0].selfieUrl,
            licenseClass: data[0].licenseClass,
            licenseFrontUrl: data[0].licenseFrontUrl,
            licenseBackUrl: data[0].licenseBackUrl,
            signatureUrl: data[0].signatureUrl,
            edit: false,
            open: true
        });
    };

    handleClose = () => {
        this.setState({ openPopUp: false, open: false, showPDF: false, activeStep: 0, skipped: new Set(), pdfUrl: '' });
    };

    handleChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value });
    };

    handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({ openNotif: false });
    };

    isStepSkipped = (step) => {
        return this.state.skipped.has(step);
    };

    handleNext = () => {
        let newSkipped = this.state.skipped;
        if (this.isStepSkipped(this.state.activeStep)) {
          newSkipped = new Set(newSkipped.values());
          newSkipped.delete(this.state.activeStep);
        }

        this.setState((prevState) => ({
          activeStep: prevState.activeStep + 1,
          skipped: newSkipped,
        }));
    };

    handleBack = () => {
        if (this.state.activeStep -1 === 0) this.setState((prevState) => ({ skipped: new Set(), pdfUrl: '', showPDF: false }));
            this.setState((prevState) => ({ activeStep: prevState.activeStep - 1 }));
    };

    handleReset = () => {
        this.setState({
          activeStep: 0,
          skipped: new Set(),
        });
    };

    handlePageChange = (page) => {
        this.setState({ pageNumber: page });
    };

    handleDocumentLoadError = (error) => {
        this.setState({ error: "Could not load the PDF document. Please try again." });
    };

    DataServiceTest = {
        getLicence: (licenceFileId, options = {}) => {
            return axios.get(`http://localhost:9000/api/data/getFile/${licenceFileId}`, {
                responseType: 'blob',
                ...options
            });
        }
    };

    saveLicence = () => {
        const { licenceFileId } = this.state
        this.DataServiceTest.getLicence(licenceFileId)
            .then(response => {
                const blob = new Blob([response.data], { type: 'application/pdf' });
                if (response.status === 200) {
                    const url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Drive-licence.pdf');
                    document.body.appendChild(link);
                    link.click();
                    link.remove();

                    window.URL.revokeObjectURL(url);
                }
            })
            .catch(error => {
                console.error("Error downloading the file:", error);
            });
    };


    generateLicence = () => {
        const { profileId, dataId } = this.state;
        this.setState({ loading: true });
        DataService.getPdf(dataId, profileId).then(result => {
            if(result?.status === 200 ) this.setState({ showPDF: true, loading: false, pdfUrl: result?.data })
        });
    };

    sendEmail = () => {
        const { dataId, email } = this.state;
        this.setState({ loading2: true });
        DataService.sendEmail(dataId, email).then(result => {
            if(result?.status === 200 ) {
                const untreated = result?.data.filter(item => !item.treated);
                const treated = result?.data.filter(item => item.treated);
                this.setState({ open: false, showPDF: false, activeStep: 0, skipped: new Set(), pdfUrl: '', data: untreated, loading2: false,
                            dataFiltred: treated, severity: 'success', message: 'Email sent successfully', openNotif: true });
            }
        }).catch(err => {
                this.setState({ openNotif: true, severity: 'error', message: err.response ? err.response.data.errors.message : '' });
        });
    };

    render() {
        const { classes } = this.props;
        const { message, data, dataFiltred, columns, entryId, name, email, country, eyeColor, height, dateOfBirth, address, openPopUp, edit, openNotif, severity, profiles, profileId, pageNumber, zoom, error,
         shippingAddress, shippingMethod, un, idpValidity, total, phone, selfieUrl, licenseFrontUrl, licenseBackUrl, signatureUrl, loading, loading2, open, activeStep, showPDF, pdfUrl } = this.state;
        // TODO Generalize this on all the pages
        const title = brand.name;
        const description = brand.desc;
        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                </Helmet>
                <PapperBlock whiteBg icon="ion-md-settings" title="Local Data" desc="">
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12} className={classes.gridSizing2}>
                              <GeneralTable
                                    title='Data Table'
                                    data={data}
                                    columns={columns}
                                    handlePreviewData={this.handlePreviewData}
                                    handleEditData={this.handleSendLicence}
                                    addButtonVisibility={false}
                                    editButtonVisibility={true}
                                    deleteButtonVisibility={false}
                              />
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12} className={classes.gridSizing2}>
                              <GeneralTable
                                    title='History Data Table'
                                    data={dataFiltred}
                                    columns={columns}
                                    handlePreviewData={this.handlePreviewData}
                                    addButtonVisibility={false}
                                    editButtonVisibility={false}
                                    deleteButtonVisibility={false}
                              />
                        </Grid>
                    </Grid>
                </PapperBlock>
                    <Dialog
                      open={openPopUp}
                      keepMounted
                      scroll="paper"
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                      fullWidth="md"
                      maxWidth="md"
                    >
                      <DialogTitle id="alert-dialog-slide-title">View Details</DialogTitle>
                      <DialogContent dividers>
                        <div>
                          <Grid
                              container
                              spacing={2}
                              alignItems="flex-start"
                              direction="row"
                              justify="center"
                          >
                            <Grid item xs={12} md={2} />
                            <Grid item xs={12} md={4}>
                               <TextField
                                   id="entryId"
                                   label="Entry Id"
                                   variant="outlined"
                                   name="entryId"
                                   value={entryId}
                                   type="number"
                                   required
                                   fullWidth
                                   onChange={this.handleChange}
                                   InputProps={{ readOnly: !edit }}
                               />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <TextField
                                  id="name"
                                  label="Name"
                                  variant="outlined"
                                  name="name"
                                  value={name}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={2} />
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="email"
                                  label="Email"
                                  variant="outlined"
                                  name="email"
                                  value={email}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="country"
                                  label="Country"
                                  variant="outlined"
                                  name="country"
                                  value={country}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                   label="Address"
                                   variant="outlined"
                                   name="address"
                                   value={address}
                                   required
                                   fullWidth
                                   onChange={this.handleChange}
                                   InputProps={{ readOnly: !edit }}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                                <TextField
                                    id="phone"
                                    label="Phone"
                                    variant="outlined"
                                    name="phone"
                                    value={phone}
                                    required
                                    fullWidth
                                    onChange={this.handleChange}
                                    InputProps={{ readOnly: !edit }}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="eyeColor"
                                  label="Eye Color"
                                  variant="outlined"
                                  name="eyeColor"
                                  value={eyeColor}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="height"
                                  label="Height"
                                  variant="outlined"
                                  name="height"
                                  value={height}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="dateOfBirth"
                                  label="BirthDate"
                                  variant="outlined"
                                  name="dateOfBirth"
                                  value={dateOfBirth}
                                  type="date"
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                                  InputLabelProps={{ shrink: true }}
                                />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="shippingAddress"
                                  label="Shipping Address"
                                  variant="outlined"
                                  name="shippingAddress"
                                  value={shippingAddress}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="shippingMethod"
                                  label="Shipping Method"
                                  variant="outlined"
                                  name="shippingMethod"
                                  value={shippingMethod}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="un"
                                  label="UN"
                                  variant="outlined"
                                  name="un"
                                  value={un}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="idpValidity"
                                  label="IDP Validity"
                                  variant="outlined"
                                  name="idpValidity"
                                  value={idpValidity}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5}>
                              <TextField
                                  id="total"
                                  label="Total"
                                  variant="outlined"
                                  name="total"
                                  value={total}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={10}>
                              <TextField
                                  id="selfieUrl"
                                  label="selfie"
                                  variant="outlined"
                                  name="selfieUrl"
                                  value={selfieUrl}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={10} md={10}>
                              <TextField
                                  id="licenseFrontUrl"
                                  label="license Front"
                                  variant="outlined"
                                  name="licenseFrontUrl"
                                  value={licenseFrontUrl}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={10} md={10}>
                              <TextField
                                  id="licenseBackUrl"
                                  label="license Back"
                                  variant="outlined"
                                  name="licenseBackUrl"
                                  value={licenseBackUrl}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={10} md={10}>
                              <TextField
                                  id="signatureUrl"
                                  label="signature"
                                  variant="outlined"
                                  name="signatureUrl"
                                  value={signatureUrl}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={5} />
                            <Grid item xs={12} md={2}>
                              <Button
                                color="primary"
                                variant="contained"
                                onClick={this.saveLicence}
                              >
                                Download Licence
                              </Button>
                            </Grid>
                            <Grid item xs={12} md={5} />
                          </Grid>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button color="secondary" onClick={this.handleClose}>
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>


                    <Dialog
                      open={open}
                      keepMounted
                      scroll="paper"
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-slide-title"
                      aria-describedby="alert-dialog-slide-description"
                      fullWidth="md"
                      maxWidth="md"
                    >
                       <DialogTitle id="alert-dialog-slide-title">Send Licence</DialogTitle>
                       <DialogContent dividers>
                          <Box sx={{ width: '100%' }}>
                                  <Stepper activeStep={activeStep}>
                                    {steps.map((label, index) => {
                                      const stepProps = {};
                                      const labelProps = {};
                                      if (this.isStepSkipped(index)) {
                                        stepProps.completed = false;
                                      }
                                      return (
                                        <Step key={label} {...stepProps}>
                                          <StepLabel {...labelProps}>{label}</StepLabel>
                                        </Step>
                                      );
                                    })}
                                  </Stepper>
                                  {activeStep === steps.length ? (
                                    <React.Fragment>
                                      <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                      </Typography>
                                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={this.handleReset}>Reset</Button>
                                      </Box>
                                    </React.Fragment>
                                  ) : (
                                    <React.Fragment>
                                      {activeStep === 0 ? (
                                          <React.Fragment>
                                             <Grid container
                                                   spacing={2}
                                                   alignItems="flex-start"
                                                   direction="row"
                                                   justify="center"
                                             >
                                                <Grid item xs={12} md={4} />
                                                <Grid item xs={12} md={4}>
                                                   <FormControl fullWidth required>
                                                      <InputLabel>Select Template</InputLabel>
                                                      <br />
                                                      <Select
                                                          name="profileId"
                                                          value={profileId}
                                                          variant="outlined"
                                                          onChange={this.handleChange}
                                                      >
                                                            {profiles.map((clt) => (
                                                                 <MenuItem key={clt.profileId} value={clt.profileId}>
                                                                      {clt.name}
                                                                 </MenuItem>
                                                            ))}
                                                      </Select>
                                                   </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={4} />
                                             </Grid>
                                          </React.Fragment>
                                      ) : null}

                                      {activeStep === 1 ? (
                                          <React.Fragment>
                                             <Grid container
                                                   spacing={2}
                                                   alignItems="flex-start"
                                                   direction="row"
                                                   justify="center"
                                             >
                                                <Grid item xs={12} md={5} />
                                                <Grid item xs={12} md={2}>
                                                   <Button
                                                      color="primary"
                                                      variant="contained"
                                                      onClick={this.generateLicence}
                                                   >
                                                       Generate License
                                                   </Button>
                                                </Grid>
                                                <Grid item xs={12} md={5} />
                                                <Grid item xs={12} md={5} />
                                                <Grid item xs={12} md={2}>
                                                     {loading && <div style={{ color: 'black' }}>Loading...</div>}
                                                </Grid>
                                                <Grid item xs={12} md={5} />
                                                {showPDF ? (
                                                    <Grid container
                                                       spacing={2}
                                                       alignItems="flex-start"
                                                       direction="row"
                                                       justify="center"
                                                    >
                                                        <Grid item xs={12} md={1} />
                                                        <Grid item xs={12} md={10}>
                                                          {error && <div style={{ color: 'red' }}>{error}</div>}
                                                                  <PDFViewer
                                                                    document={{
                                                                      url: pdfUrl,
                                                                    }}
                                                                    key={pageNumber}
                                                                    page={pageNumber}
                                                                    scale={zoom}
                                                                    onDocumentLoadError={this.handleDocumentLoadError}
                                                                    hideNavbar={true}
                                                                    externalInput={true}
                                                                  />
                                                            <div style={{
                                                                position: 'absolute',
                                                                bottom: 80,
                                                                left: '50%',
                                                                transform: 'translateX(-50%)'
                                                            }}>
                                                                <button
                                                                    onClick={() => this.handlePageChange(1)}
                                                                    color="primary" disabled={pageNumber <= 1}>
                                                                    {'<<'}
                                                                </button>
                                                                <button
                                                                    onClick={() => this.handlePageChange(pageNumber - 1)}
                                                                    color="primary" disabled={pageNumber <= 1}>
                                                                    Previous
                                                                </button>
                                                                <span
                                                                    style={{margin: '0 10px'}}>Page {pageNumber}</span>
                                                                <button
                                                                    onClick={() => this.handlePageChange(pageNumber + 1)}
                                                                    color="primary" disabled={pageNumber >= 16}>
                                                                    Next
                                                                </button>
                                                                <button
                                                                    onClick={() => this.handlePageChange(16)}
                                                                    color="primary" disabled={pageNumber >= 16}>
                                                                    >>
                                                                </button>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} md={1}/>
                                                    </Grid>
                                                ) : null}
                                             </Grid>
                                          </React.Fragment>
                                      ) : null}

                                      {activeStep === 2 ? (
                                        <React.Fragment>
                                          <Grid container
                                            spacing={2}
                                            alignItems="flex-start"
                                            direction="row"
                                            justify="center"
                                        >
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
                                          <Grid item xs={12} md={5} />
                                          <Grid item xs={12} md={2}>
                                            <Button
                                              color="primary"
                                              variant="contained"
                                              onClick={this.sendEmail}
                                            >
                                               Send Email
                                            </Button>
                                          </Grid>
                                          <Grid item xs={12} md={5} />
                                          <Grid item xs={12} md={5} />
                                          <Grid item xs={12} md={2}>
                                              {loading2 && <div style={{ color: 'black' }}>Sending Email...</div>}
                                          </Grid>
                                          <Grid item xs={12} md={5} />
                                        </Grid>
                                      </React.Fragment>
                                      ) : null}

                                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Grid container
                                            spacing={2}
                                            alignItems="flex-start"
                                            direction="row"
                                            justify="center"
                                        >
                                          <Grid item xs={12} md={1} />
                                          <Grid item xs={12} md={2}>
                                            <Button
                                              color="primary"
                                              disabled={activeStep === 0}
                                              onClick={this.handleBack}
                                              >
                                                  Back
                                            </Button>
                                          </Grid>
                                          <Grid item xs={12} md={7} />
                                          <Grid item xs={12} md={1}>
                                            <Button
                                               color="secondary"
                                               variant="contained"
                                               onClick={this.handleNext}
                                            >
                                              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                            </Button>
                                          </Grid>
                                          <Grid item xs={12} md={1} />
                                        </Grid>
                                      </Box>
                                    </React.Fragment>
                                  )}
                              </Box>
                      </DialogContent>
                      <DialogActions>
                        <Button color="primary" variant= "contained" onClick={this.handleClose}>
                          Close
                        </Button>
                      </DialogActions>
                    </Dialog>
                    <Snackbar
                         anchorOrigin={{
                             vertical: 'bottom',
                             horizontal: 'center'
                         }}
                         autoHideDuration={4000}
                         open={openNotif}
                         onClose={this.handleCloseSnack}
                    >
                              <MuiAlert onClose={this.handleCloseSnack} severity={severity}>
                                {message}
                              </MuiAlert>
                    </Snackbar>
            </div>
        );
    }
}

BlankPage.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
};

export default withStyles(styles)(BlankPage);
