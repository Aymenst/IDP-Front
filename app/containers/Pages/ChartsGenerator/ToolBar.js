import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DetailsIcon from '@material-ui/icons/Details';
import DescriptionIcon from '@material-ui/icons/Description';
import ShareIcon from '@material-ui/icons/Share';
import SaveIcon from '@material-ui/icons/Save';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import GetAppIcon from '@material-ui/icons/GetApp';
import BackupIcon from '@material-ui/icons/Backup';


const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(1),
  },
  absolute: {
    position: 'absolute',
    bottom: theme.spacing(0),
    right: theme.spacing(0),
  },
}));

export default function SimpleTooltips(props) {
  const classes = useStyles();

  const handleSave = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('save');
  };
  const handleAdd = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('add');
  };
  const handleEdit = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('edit');
  };
  const handleDownload = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('download');
  };
  const handleDetails = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('details');
  };
  const handleShared = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('share');
  };
  const handleReset = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('reset');
  };
  const handleDelete = () => {
    // eslint-disable-next-line react/prop-types,react
    props.buttonCall('delete');
  };

  return (
    <div>
      <Tooltip title=" Save Chart" aria-label="Save">
        <Fab color="primary" className={classes.fab} size="small">
          <SaveIcon onClick={handleSave} />
        </Fab>
      </Tooltip>
      <Tooltip title=" New Chart" aria-label="Add">
        <Fab color="primary" className={classes.fab} size="small">
          <AddIcon onClick={handleAdd} />
        </Fab>
      </Tooltip>
      <Tooltip title=" Edit Data" aria-label="Update">
        <Fab color="primary" className={classes.fab} size="small">
          <EditIcon onClick={handleEdit} />
        </Fab>
      </Tooltip>
      <Tooltip title="DownLoad Chart Data (CSV)" aria-label="downLoad">
        <Fab color="primary" className={classes.fab} size="small">
          <GetAppIcon onClick={handleDownload} />
        </Fab>
      </Tooltip>
      <Tooltip title="Import new Data" aria-label="importnew">
        <Fab color="secondary" className={classes.fab} size="small" href="/app/import-data/Import-DataBase">
          <BackupIcon />
        </Fab>
      </Tooltip>
      <Tooltip title=" Data Details" aria-label="details">
        <Fab color="secondary" className={classes.fab} size="small">
          <DetailsIcon onClick={handleDetails} />
        </Fab>
      </Tooltip>
      <Tooltip title=" Add to Report" aria-label="viewReport">
        <Fab color="secondary" className={classes.fab} size="small" href="/app/report">
          <DescriptionIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Share" aria-label="Share">
        <Fab color="secondary" className={classes.fab} size="small">
          <ShareIcon onClick={handleShared} />
        </Fab>
      </Tooltip>
      <Tooltip title="Reset">
        <IconButton aria-label="Reset">
          <RotateLeftIcon onClick={handleReset} />
        </IconButton>
      </Tooltip>
      <Tooltip title="Clear All">
        <IconButton aria-label="Delete">
          <DeleteIcon onClick={handleDelete} />
        </IconButton>
      </Tooltip>
    </div>
  );
}
