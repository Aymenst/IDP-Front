import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { State, City, Country } from 'country-state-city';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import VisibilityIcon from '@material-ui/icons/Visibility';

const PreviewClientButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const data = props.selected.length === 1 ? props.selected[0] : null;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    data ? (
      <>
        <Tooltip title="Preview Client">
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
          aria-labelledby="preview-dialog-title"
          aria-describedby="preview-dialog-description"
        >
          <DialogTitle id="preview-dialog-title">Preview Client</DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  value={data?.name || ''}
                  id="name"
                  label="Name"
                  multiline
                  rowsMax={4}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  value={data?.taxRef || ''}
                  id="taxRef"
                  label="Tax ID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  value={data?.webPage || ''}
                  id="webPage"
                  label="WEB Page"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputProps={{ readOnly: true }}
                  fullWidth
                  value={data?.info?.phone || ''}
                  id="phone"
                  label="Phone"
                />
              </Grid>
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
            <Button onClick={handleClose}>
              {'Cancel'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    ) : null
  );
};

PreviewClientButton.propTypes = {
  selected: PropTypes.array
};

export default PreviewClientButton;
