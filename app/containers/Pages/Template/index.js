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
    Typography,
    Snackbar,
    IconButton
} from '@material-ui/core';
import SendIcon from "@material-ui/icons/Send";
import MuiAlert from "@material-ui/lab/Alert";
import withStyles from '@material-ui/core/styles/withStyles';
import GeneralTable from '../GenralTables/GeneralTable';
import { PropTypes } from 'prop-types';
import Tooltip from "@material-ui/core/Tooltip";
import UserService from "../../Services/UserService";
import ProfileService from "../../Services/ProfileService";
import axios from "axios";
import {API} from "../../../config/apiUrl";
import {
    DataTable, PapperBlock
} from 'dan-components';

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
            name: '',
            email: '',
            website: '',
            profileId: '',
            tampon: '',
            tamponB: '',
            qrCode: '',
            record: '',
            users: [],
            data: [],
            currentUser: {},
            message: '',
            open: false,
            openNotif: false,
            openWarning: false,
            openPopUp: false,
            edit: false,
            fetch: false,
            success: false,
            preview: null,
            preview2: null,
            preview3: null,
            updated: false,
            updated2: false,
            updated3: false,
            columns: [
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
                      label: 'Web Site',
                      name: 'website',
                      options: {
                        filter: true
                      }
                    },
                    {
                      label: 'Tampon',
                      name: 'tampon',
                      options: {
                        filter: true,
                        customBodyRender: (value) => {
                                if (value) {
                                        const byteCharacters = atob(value);
                                        const byteNumbers = new Array(byteCharacters.length);
                                        for (let i = 0; i < byteCharacters.length; i++) {
                                          byteNumbers[i] = byteCharacters.charCodeAt(i);
                                        }
                                        const byteArray = new Uint8Array(byteNumbers);
                                        const blob = new Blob([byteArray], { type: 'image/png' });
                                        const url = URL.createObjectURL(blob);

                                        return <a href={url} download="tampon.png" target="_blank" rel="noopener noreferrer">View Tampon</a>;
                                      } else {
                                        return 'No image';
                                      }
                        }
                      }
                    },
                    {
                      label: 'Black Tampon',
                      name: 'tamponB',
                      options: {
                        filter: true,
                        customBodyRender: (value) => {
                                if (value) {
                                        const byteCharacters = atob(value);
                                        const byteNumbers = new Array(byteCharacters.length);
                                        for (let i = 0; i < byteCharacters.length; i++) {
                                          byteNumbers[i] = byteCharacters.charCodeAt(i);
                                        }
                                        const byteArray = new Uint8Array(byteNumbers);
                                        const blob = new Blob([byteArray], { type: 'image/png' });
                                        const url = URL.createObjectURL(blob);
                                        return <a href={url} download="tampon.png" target="_blank" rel="noopener noreferrer">View Tampon</a>;
                                      } else {
                                        return 'No image';
                                      }
                        }
                      }
                    },
                    {
                      label: 'QR Code',
                      name: 'qrCode',
                      options: {
                        filter: true,
                        customBodyRender: (value) => {
                                if (value) {
                                        const byteCharacters = atob(value);
                                        const byteNumbers = new Array(byteCharacters.length);
                                        for (let i = 0; i < byteCharacters.length; i++) {
                                          byteNumbers[i] = byteCharacters.charCodeAt(i);
                                        }
                                        const byteArray = new Uint8Array(byteNumbers);
                                        const blob = new Blob([byteArray], { type: 'image/png' });
                                        const url = URL.createObjectURL(blob);
                                        return <a href={url} download="tampon.png" target="_blank" rel="noopener noreferrer">View Tampon</a>;
                                      } else {
                                        return 'No image';
                                      }
                        }
                      }
                    }
                  ]
        };
    }

    componentDidMount() {
        const user = localStorage.getItem('user').toString();
        const id = user.slice(7, 31);
        UserService.getUsers().then(response => {
            response.data.map(row => {
                if (row.id === id) this.setState({ currentUser: row });
            });
            this.setState({ users: response.data, fetch: true });
        });
        ProfileService.getRequest().then(row => {
            if (row.status === 200) this.setState({ data: row?.data });
        });
    }

    componentWillReceiveProps(props) {
        // console.log(props);
    }

    handleSubmit = () => {
        const { name, email, website, tampon, tamponB, qrCode } = this.state;
        const file = tampon;
        const file2 = tamponB;
        const file3 = qrCode;
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('website', website);
        formData.append('file', file);
        formData.append('file2', file2);
        formData.append('file3', file3);
      
        ProfileService.saveRequest(formData).then(row => {
            if (row.status === 200) {
                ProfileService.getRequest().then(row => {
                    if (row.status === 200) this.setState({ data: row?.data });
                });
                this.setState({ open: false, severity: 'success', message: 'Template added successfully', openNotif: true, tampon: '', preview: null });
            }
        }).catch(err => {
            this.setState({ openNotif: true, severity: 'error', message: err.response ? err.response.data.errors.message : '' });
        });
       
    };

     handleUpdate = () => {
            const { profileId, name, email, website, tampon, tamponB, qrCode, updated, updated2, updated3 } = this.state;
            const file = tampon;
            const file2 = tamponB;
            const file3 = qrCode;
            const formData = new FormData();
            formData.append('profileId', profileId);
            formData.append('name', name);
            formData.append('email', email);
            formData.append('website', website);
            updated ? formData.append('file', file) : null;
            updated2 ? formData.append('file2', file2) : null;
            updated3 ? formData.append('file3', file3) : null;
            ProfileService.updateRequest(formData).then(row => {
                if (row.status === 200) {
                        ProfileService.getRequest().then(row => {
                             if (row.status === 200) this.setState({ data: row?.data });
                        });
                    this.setState({ openPopUp: false, severity: 'success', message: 'Template update successfully',
                                            openNotif: true, updated: false, updated2: false, updated3: false, });
                }
            }).catch(err => {
                this.setState({ openNotif: true, severity: 'error', message: err.response ? err.response.data.errors.message : '' });
            });
        };

    handleEditData = (data) => {
        const blob = new Blob([data[0].tampon], { type: 'image/png' });
        const newFile = new File([blob], "logo", { type: blob.type });
        const blob2 = new Blob([data[0].tamponB], { type: 'image/png' });
        const newFile2 = new File([blob2], "logo Blacked", { type: blob.type });
        const blob3 = new Blob([data[0].qrCode], { type: 'image/png' });
        const newFile3 = new File([blob3], "qrCode", { type: blob.type });
        this.setState({
            profileId: data[0].profileId,
            name: data[0].name,
            email: data[0].email,
            website: data[0].website,
            tampon: newFile,
            tamponB: newFile2,
            qrCode: newFile3,
            preview: `data:image/jpeg;base64,${data[0]?.tampon}`,
            preview2: `data:image/jpeg;base64,${data[0]?.tamponB}`,
            preview3: `data:image/jpeg;base64,${data[0]?.qrCode}`,
            edit: true,
            openPopUp: true
        });
    };

    handlePreviewData = (data) => {
        const blob = new Blob([data[0].tampon], { type: 'application/octet-stream' });
        const newFile = new File([blob], "logo", { type: blob.type });
        const blob2 = new Blob([data[0].tamponB], { type: 'application/octet-stream' });
        const newFile2 = new File([blob2], "logo Blacked", { type: blob.type });
        const blob3 = new Blob([data[0].qrCode], { type: 'application/octet-stream' });
        const newFile3 = new File([blob3], "qrCode", { type: blob.type });
        this.setState({
            name: data[0].name,
            email: data[0].email,
            website: data[0].website,
            tampon: newFile,
            tamponB: newFile2,
            qrCode: newFile3,
            preview: `data:image/jpeg;base64,${data[0]?.tampon}`,
            preview2: `data:image/jpeg;base64,${data[0]?.tamponB}`,
            preview3: `data:image/jpeg;base64,${data[0]?.qrCode}`,
            edit: false,
            openPopUp: true
        });
    };

    handleClose = () => {
        this.setState({ openPopUp: false, openWarning: false, open: false });
    };

    handleChange = (ev) => {
        this.setState({ [ev.target.name]: ev.target.value });
    };

    handleFileChange = (event) => {
        const tampon = event.target.files[0];
        this.setState({
            updated: true,
            tampon: tampon,
            preview: URL.createObjectURL(tampon)
        });
    };

    handleFileChange2 = (event) => {
        const tamponB = event.target.files[0];
        this.setState({
            updated2: true,
            tamponB: tamponB,
            preview2: URL.createObjectURL(tamponB)
        });
    };

    handleFileChange3 = (event) => {
        const qrCode = event.target.files[0];
        this.setState({
            updated3: true,
            qrCode: qrCode,
            preview3: URL.createObjectURL(qrCode)
        });
    };

    handleDeleteConfirmation = (data) => {
        this.setState({ openWarning: true, record: data[0].profileId });
    };

    handleDelete = () => {
    const { record } = this.state;
        ProfileService.deleteRequest(record).then(response => {
            if (response.status === 200) this.setState({ data: response?.data, openWarning: false });
        }).catch(err => {
            this.setState({ openNotif: true, severity: 'error', message: err.response ? err.response.data.errors.message : '' });
        });
    };

    handleAddData = () => {
        this.setState({ name: "", validityDate: "", tampon: "", open: true });
    };

    handleCloseSnack = (event, reason) => {
        if (reason === 'clickaway') return;
        this.setState({ openNotif: false });
    };

    render() {
        const { classes } = this.props;
        const { message, data, columns, name, email, website, preview, preview2, preview3, open, openPopUp, edit, openNotif, openWarning, severity } = this.state;
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
                <PapperBlock whiteBg icon="ion-md-settings" title="Templates" desc="">
                    <Grid
                        container
                        alignItems="center"
                        justify="center"
                    >
                        <Grid item xs={12} className={classes.gridSizing2}>
                              <GeneralTable
                                    title='Template Table'
                                    data={data}
                                    columns={columns}
                                    handleAddData={this.handleAddData}
                                    handleEditData={this.handleEditData}
                                    handleDeleteData={this.handleDeleteConfirmation}
                                    handlePreviewData={this.handlePreviewData}
                                    addButtonVisibility={true}
                                    editButtonVisibility={true}
                                    deleteButtonVisibility={true}
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
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                              <TextField
                                  id="website"
                                  label="Web Site"
                                  variant="outlined"
                                  name="website"
                                  value={website}
                                  required
                                  fullWidth
                                  onChange={this.handleChange}
                                  InputProps={{ readOnly: !edit }}
                              />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                     <input
                                         accept="image/*"
                                         style={{ display: 'none' }}
                                         id="upload-photo"
                                         type="file"
                                         onChange={this.handleFileChange}
                                     />
                                          <label htmlFor="upload-photo">
                                               <Button variant="contained" color="primary" component="span" disabled={!edit}>
                                                    Upload Tampon
                                               </Button>
                                          </label>
                                {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />}
                            </Grid>
                            <Grid item xs={12} md={4}>
                                     <input
                                         accept="image/*"
                                         style={{ display: 'none' }}
                                         id="upload-photo2"
                                         type="file"
                                         onChange={this.handleFileChange2}
                                     />
                                          <label htmlFor="upload-photo2">
                                               <Button variant="contained" color="primary" component="span" disabled={!edit}>
                                                    Upload Black Tampon
                                               </Button>
                                          </label>
                                {preview2 && <img src={preview2} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />}
                            </Grid><Grid item xs={12} md={4}>
                                     <input
                                         accept="image/*"
                                         style={{ display: 'none' }}
                                         id="upload-photo3"
                                         type="file"
                                         onChange={this.handleFileChange3}
                                     />
                                          <label htmlFor="upload-photo3">
                                               <Button variant="contained" color="primary" component="span" disabled={!edit}>
                                                    Upload Qr Code
                                               </Button>
                                          </label>
                                {preview3 && <img src={preview3} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />}
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
                                  onClick={this.handleUpdate}
                              >
                                  Update
                              </Button>
                        ) : null }
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
                      <DialogTitle id="alert-dialog-slide-title">Add new Profile</DialogTitle>
                      <DialogContent dividers>
                        <div>
                          <Grid
                              container
                              spacing={2}
                              alignItems="flex-start"
                              direction="row"
                              justify="center"
                          >
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
                              />
                            </Grid>
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
                              <Grid item xs={12} md={4}>
                                  <TextField
                                      id="website"
                                      label="Web Site"
                                      variant="outlined"
                                      name="website"
                                      value={website}
                                      required
                                      fullWidth
                                      onChange={this.handleChange}
                                  />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <input
                                   accept="image/*"
                                   style={{ display: 'none' }}
                                   id="upload-photo"
                                   type="file"
                                   onChange={this.handleFileChange}
                                />
                                     <label htmlFor="upload-photo">
                                          <Button variant="contained" color="primary" component="span">
                                               Upload Tampon
                                          </Button>
                                     </label>
                                {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />}
                            </Grid>
                              <Grid item xs={12} md={4}>
                                  <input
                                      accept="image/*"
                                      style={{ display: 'none' }}
                                      id="upload-photo2"
                                      type="file"
                                      onChange={this.handleFileChange2}
                                  />
                                  <label htmlFor="upload-photo2">
                                      <Button variant="contained" color="primary" component="span">
                                          Upload Black Tampon
                                      </Button>
                                  </label>
                                  {preview2 && <img src={preview2} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />}
                              </Grid>
                              <Grid item xs={12} md={4}>
                                  <input
                                      accept="image/*"
                                      style={{ display: 'none' }}
                                      id="upload-photo3"
                                      type="file"
                                      onChange={this.handleFileChange3}
                                  />
                                  <label htmlFor="upload-photo3">
                                      <Button variant="contained" color="primary" component="span">
                                          Upload Qr Code
                                      </Button>
                                  </label>
                                  {preview3 && <img src={preview3} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />}
                              </Grid>
                          </Grid>
                        </div>
                      </DialogContent>
                      <DialogActions>
                            <Button color="secondary" onClick={this.handleClose}>
                               Cancel
                            </Button>
                            <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={this.handleSubmit}
                              >
                                  Save
                            </Button>
                      </DialogActions>
                    </Dialog>
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
                           <DialogTitle id="alert-dialog-slide-title"> Confirm Action </DialogTitle>
                                 <DialogContent dividers>
                                      <Typography align="center" variant="inherit">
                                            Are you sure to delete this profile ?
                                      </Typography>
                                 </DialogContent>
                                 <DialogActions>
                                      <Button color="primary" onClick={this.handleClose}>
                                           Cancel
                                      </Button>
                                      <Button color="inherit" onClick={this.handleDelete}>
                                           Confirm
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
