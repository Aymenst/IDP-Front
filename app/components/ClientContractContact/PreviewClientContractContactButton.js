import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {Country, State} from 'country-state-city';
import VisibilityIcon from "@material-ui/icons/Visibility";

const PreviewClientContractContactButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const data = props.selected.length === 1 ? props.selected[0] : null;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      data ? <>
        <Tooltip title="Preview Contact">
          <IconButton color="primary" onClick={handleClickOpen} aria-label="preview">
            <VisibilityIcon />
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
          <DialogTitle id="add-dialog-title">Preview Contact</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                      value={data.firstName}
                      name="firstName"
                      fullWidth
                      label="First name"
                      aria-readonly
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      value={data.lastName}
                      name="lastName"
                      fullWidth
                      label="Last name"
                      aria-readonly
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      value={data.middleName}
                      name="middleName"
                      fullWidth
                      label="Middle name"
                      aria-readonly
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={4}>
                  <TextField
                      value={data.companyInfo.email}
                      name="companyInfo.email"
                      fullWidth
                      label="Company Email"
                      aria-readonly
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      value={data.companyInfo.fix}
                      name="companyInfo.fix"
                      fullWidth
                      label="Company fix-phone"
                      aria-readonly
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      value={data.companyInfo.mobile}
                      name="companyInfo.mobile"
                      fullWidth
                      label="Company mobile-phone"
                      aria-readonly
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    value={data.companyInfo.skype}
                    name="companyInfo.skype"
                    fullWidth
                    label="Company skype"
                    aria-readonly
                />
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                      value={data.personalInfo.email}
                      name="personalInfo.email"
                      fullWidth
                      label="Personal email"
                      aria-readonly
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      value={data.personalInfo.mobile}
                      name="personalInfo.mobile"
                      fullWidth
                      label="Personal mobile-phone"
                      aria-readonly
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    value={data.personalInfo.skype}
                    name="personalInfo.skype"
                    fullWidth
                    label="Personal skype"
                    aria-readonly
                />
              </Grid>
              {/* ADDRESS */}
              <Grid container>
                <Grid item xs={4}>
                  <TextField
                      InputProps={{ readOnly: true }}
                      fullWidth
                      value={(data && data.address.country) ? Country.getCountryByCode(data.address.country).name : ''}
                      id="address.country"
                      label="Country"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      InputProps={{ readOnly: true }}
                      fullWidth
                      value={(data && data.address.state) ? State.getStateByCodeAndCountry(data.address.state, data.address.country).name : ''}
                      id="address.state"
                      label="State"
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                      InputProps={{ readOnly: true }}
                      fullWidth
                      value={data?.address.city || ''}
                      id="address.city"
                      label="City"
                  />
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6}>
                  <TextField
                      InputProps={{ readOnly: true }}
                      fullWidth
                      value={data?.address?.number || ''}
                      id="address.number"
                      label="Number"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      type="number"
                      InputProps={{ readOnly: true }}
                      fullWidth
                      value={data?.address?.postalCode || ''}
                      id="address.postalCode"
                      label="Postal Code"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    InputProps={{ readOnly: true }}
                    fullWidth
                    value={data?.address?.addressLine1 || ''}
                    id="address.addressLine1"
                    label="Address line 1"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                    InputProps={{ readOnly: true }}
                    fullWidth
                    value={data?.address?.addressLine2 || ''}
                    id="address.addressLine2"
                    label="Address line 2"
                />
              </Grid>

            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              {'Cancel'}
            </Button>
          </DialogActions>
        </Dialog>
      </> : null
  );
};

export default PreviewClientContractContactButton;
