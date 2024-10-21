import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';
import PropTypes from 'prop-types';
import DocViewer, {DocViewerRenderers} from 'react-doc-viewer';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import FileViewer from "react-file-viewer";

const PreviewDocumentButton = (props) => {
    const [open, setOpen] = React.useState(false);
    const {selected} = props;
    const data = selected.length > 0 ? selected.map(d => (
        {
            uri: d.path
        }
    )) : null;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const onError = (e) => {
        console.log(e, 'error in file-viewer');
    }
    return (
        data ? (
            <>
                <Tooltip title="Preview">
                    <IconButton color="primary" onClick={handleClickOpen} aria-label="documents">
                        <VisibilityIcon/>
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
                    <DialogTitle id="preview-dialog-title">Preview Attachment</DialogTitle>
                    <DialogContent>
                        <DocViewer
                            config={{header: {disableFileName: true, disableHeader: true}}}
                            pluginRenderers={DocViewerRenderers}
                            documents={data}
                        />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            {'Back'}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        ) : null
    );
};

PreviewDocumentButton.propTypes = {
    selected: PropTypes.array
};

export default PreviewDocumentButton;
