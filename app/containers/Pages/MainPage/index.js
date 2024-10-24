import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Box,
    TextField,
    DialogActions,
    Snackbar, InputLabel, Select, MenuItem, FormControl, Checkbox
} from '@material-ui/core';
import MuiAlert from "@material-ui/lab/Alert";
import withStyles from '@material-ui/core/styles/withStyles';
import GeneralTable from '../GenralTables/GeneralTable';
import { PropTypes } from 'prop-types';
import DataService from "../../Services/DataService";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Remove';

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

class BlankPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entryId: '',
            name: '',
            email: '',
            country: '',
            eyeColor: '',
            height: '',
            licenseClass: '',
            dateOfBirth: '',
            address: '',
            shippingAddress: '',
            shippingMethod: '',
            un: '',
            idpValidity: new Date(),
            total: '',
            phone: '',
            selfieUrl: '',
            licenseFrontUrl: '',
            licenseBackUrl: '',
            signatureUrl: '',
            record: '',
            users: [],
            data: [],
            currentUser: {},
            message: '',
            openNotif: false,
            openWarning: false,
            openPopUp: false,
            edit: false,
            fetch: false,
            success: false,
            treated: false,
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

    worker () {
        self.addEventListener('message', e => {
          if (!e) return;
          setInterval(() => {
                // postMessage(seconds);
                DataService.getRequest().then(row => {
                if (row.status === 200)
                  this.setState({ data: row?.data, fetch: true });
                });
              },
              120000); //1 min *60000 //50000
        })
    }

    componentDidMount() {
        DataService.getRequest().then(row => {
             if (row.status === 200) this.setState({ data: row?.data });
        });
        this.clock = new Worker(this.worker());
        this.updateClock();
    }

    updateClock = ()=>{
        this.clock.addEventListener('message', event => {
        });
    };

    componentWillUnmount(){
        this.clock.terminate();
    }

    componentWillReceiveProps(props) {
       // console.log(props);
    }

    handleSubmit = () => {
            const { entryId, name, email, country, eyeColor, height, dateOfBirth, address, shippingAddress, shippingMethod, un,
             idpValidity, total, phone, selfieUrl, licenseFrontUrl, licenseBackUrl, licenseClass, signatureUrl, treated } = this.state;

            const Data = {
                  entryId, name, email, country, eyeColor, height, dateOfBirth, address, shippingAddress, shippingMethod, un,
                    idpValidity, total, phone, selfieUrl, licenseFrontUrl, licenseBackUrl, licenseClass, signatureUrl, treated
            };
        DataService.saveRequest(Data).then(row => {
            if (row.status === 200) {
                    DataService.getRequest().then(row => {
                         if (row.status === 200) this.setState({ data: row?.data });
                    });
                this.setState({ openPopUp: false, severity: 'success', message: 'Data added successfully', openNotif: true });
            }
        }).catch(err => {
            this.setState({ openNotif: true, severity: 'error', message: err.response ? err.response.data.errors.message : '' });
        });
    };

    handleEditData = (data) => {
        const parts = data[0].dateOfBirth.split("/");
        const month = String(parts[0]).padStart(2, '0');
        const day = String(parts[1]).padStart(2, '0');
        const year = parts[2];
        const formattedDate = `${year}-${month}-${day}`;
        this.setState({
           entryId: data[0].entryId,
           name: data[0].name,
           email: data[0].email,
           country: data[0].country,
           eyeColor: data[0].eyeColor,
           height: data[0].height,
           dateOfBirth: formattedDate,
           address: data[0].address,
           shippingAddress: data[0].shippingAddress,
           shippingMethod: data[0].shippingMethod,
           un: data[0].un, 
           idpValidity: data[0].idpValidity?.substring(0, 10),
           total: data[0].total,
           phone: data[0].phone,
           selfieUrl: data[0].selfieUrl,
           licenseFrontUrl: data[0].licenseFrontUrl,
           licenseBackUrl: data[0].licenseBackUrl,
           signatureUrl: data[0].signatureUrl,
           treated: false,
           edit: true,
           openPopUp: true
       });
    };

    handlePreviewData = (data) => {
        const parts = data[0].dateOfBirth.split("/");
        const month = String(parts[0]).padStart(2, '0');
        const day = String(parts[1]).padStart(2, '0');
        const year = parts[2];
        const formattedDate = `${year}-${month}-${day}`;
        this.setState({
            entryId: data[0].entryId,
            name: data[0].name,
            email: data[0].email,
            country: data[0].country,
            eyeColor: data[0].eyeColor,
            height: data[0].height,
            dateOfBirth: formattedDate,
            address: data[0].address,
            shippingAddress: data[0].shippingAddress,
            shippingMethod: data[0].shippingMethod,
            un: data[0].un,
            idpValidity: data[0].idpValidity?.substring(0, 10),
            total: data[0].total,
            phone: data[0].phone,
            selfieUrl: data[0].selfieUrl,
            licenseFrontUrl: data[0].licenseFrontUrl,
            licenseBackUrl: data[0].licenseBackUrl,
            signatureUrl: data[0].signatureUrl,
            edit: false,
            openPopUp: true
        });
    };

    handleIncrease = () => {
        const { idpValidity } = this.state;
        const date = new Date(idpValidity);
        date.setFullYear(date.getFullYear() + 1);
        const newIdpValidity = date.toISOString().split('T')[0];
        this.setState({ idpValidity: newIdpValidity });
    };
    
    handleDecrease = () => {
        const { idpValidity } = this.state;
        const date = new Date(idpValidity);
        date.setFullYear(date.getFullYear() - 1);
        const newIdpValidity = date.toISOString().split('T')[0];
        this.setState({ idpValidity: newIdpValidity });
    };
    
    handleClose = () => {
        this.setState({ openPopUp: false, openWarning: false });
    };

    handleChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value });
    };

    handleChangeLicence= (event) => {
        const valueArray = event.target.value;
        const valueString = valueArray.join(', ');
        this.setState({  licenseClass: valueString });
    };

    handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({ openNotif: false });
    };

    render() {
        const { classes } = this.props;
        const { message, data, columns, entryId, name, email, country, eyeColor, height, dateOfBirth, address, openPopUp, edit, openNotif, severity,
         shippingAddress, shippingMethod, un, idpValidity, total, phone, selfieUrl, licenseFrontUrl, licenseBackUrl, signatureUrl, licenseClass } = this.state;
        // TODO Generalize this on all the pages
        const title = brand.name;
        const description = brand.desc;
        const selectedLicenses = licenseClass ? licenseClass.split(', ') : [];
        const licences = [
            { value: 'A', name: 'licence A' },
            { value: 'B', name: 'licence B' },
            { value: 'C', name: 'licence C' },
            { value: 'D', name: 'licence D' },
            { value: 'E', name: 'licence E' }
        ];
        
        return (
            <div>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                </Helmet>

                <Grid
                    container
                    spacing={4}
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={12} className={classes.gridSizing}>
                        <Box
                           color="white"
                           textAlign="center"
                           fontWeight="fontWeightBold"
                           fontSize={42}
                           letterSpacing={2}
                           sx={{
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                        fontFamily: '"Poppins", sans-serif',
                                        padding: '20px',
                                        borderRadius: '10px',
                                        background: 'linear-gradient(45deg, rgba(255, 0, 150, 0.7), rgba(0, 204, 255, 0.7))',
                                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                           }}
                        >
                            iDP Platform
                        </Box>
                    </Grid>
                </Grid>

                <Grid
                    container
                    alignItems="center"
                    justify="center"
                >
                    <Grid item xs={12} className={classes.gridSizing2}>
                          <GeneralTable
                                title='Real-Time Data Table'
                                data={data}
                                columns={columns}
                                handleEditData={this.handleEditData}
                                handlePreviewData={this.handlePreviewData}
                                addButtonVisibility={false}
                                deleteButtonVisibility={false}
                          />
                    </Grid>
                </Grid>
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
                          <Grid item xs={12} md={2}>
                              <br/>
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
                                  InputProps={{readOnly: !edit}}
                              />
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <br />
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
                          <Grid item xs={12} md={2}>
                              <FormControl fullWidth required>
                                  <InputLabel>Select License</InputLabel>
                                  <Select
                                      name="licenseClass"
                                      multiple
                                      value={selectedLicenses}
                                      onChange={this.handleChangeLicence}
                                      renderValue={(selected) => selected.join(', ')}
                                      inputProps={{readOnly: !edit}}
                                      InputLabelProps={{shrink: true}}
                                  >
                                      {licences.map((clt) => (
                                          <MenuItem key={clt.value} value={clt.value}>
                                              <Checkbox
                                                  checked={selectedLicenses.indexOf(clt.value) > -1}
                                              />
                                              {clt.name}
                                          </MenuItem>
                                      ))}
                                  </Select>
                              </FormControl>
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
                        <Grid item xs={12} md={3}>
                          <TextField
                              id="idpValidity"
                              label="IDP Validity"
                              variant="outlined"
                              name="idpValidity"
                              value={idpValidity}
                              type="date"
                              required
                              fullWidth
                              onChange={this.handleChange}
                              InputProps={{ readOnly: !edit }}
                          />
                        </Grid>
                          <Grid item xs={12} md={1}>
                              <IconButton disabled={!edit} onClick={() => this.handleIncrease()}>
                                  <AddIcon color="primary" />
                              </IconButton>
                          </Grid>
                          <Grid item xs={12} md={1}>
                              <IconButton color={"primary"} disabled={!edit} onClick={() => this.handleDecrease()}>
                                  <DeleteIcon color="secondary" />
                              </IconButton>
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
                        </Grid><Grid item xs={10} md={10}>
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
                        </Grid><Grid item xs={10} md={10}>
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
                        </Grid><Grid item xs={10} md={10}>
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
                      </Grid>
                    </div>
                  </DialogContent>
                  <DialogActions>
                    <Button color="secondary" onClick={this.handleClose}>
                      Cancel
                    </Button>
                    {edit ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSubmit}
                        >
                          Save to Database
                        </Button>
                    ) : null }
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
