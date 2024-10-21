import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { connect } from 'react-redux';
import DialogContentText from '@material-ui/core/DialogContentText';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams } from 'react-router-dom';
import { deleteContracts } from '../../redux/actions/contracts';


const DeleteClientContractsButton = (props) => {
  const [open, setOpen] = React.useState(false);
  const data = props.selected.length > 0 ? props.selected.map(s => s.id) : null;
  const { clientId } = useParams();

  const handleDelete = () => {
    props.deleteContracts({ clientId, contractIds: data });
    props.resetSelection();
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    data ? (
      <>
        <Tooltip title="Delete Contracts">
          <IconButton color="primary" onClick={handleClickOpen} aria-label="edit">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Dialog
          disableBackdropClick
          fullWidth
          maxWidth="lg"
          open={open}
          onClose={handleClose}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Action</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              {`Are you sure to delete: ${data.length} selected records`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>
              {'Cancel'}
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              {'Confirm'}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    ) : null
  );
};

DeleteClientContractsButton.propTypes = {
  selected: PropTypes.array,
  resetSelection: PropTypes.func
};

const mapDispatchToProps = { deleteContracts };

export default connect(null, mapDispatchToProps)(DeleteClientContractsButton);