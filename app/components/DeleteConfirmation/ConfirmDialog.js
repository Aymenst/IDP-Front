import React from "react";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const ConfirmDialog = (props) => {

    return (
        <Dialog open={props.confirmationDialog.open} maxWidth="sm" fullWidth>
            <DialogTitle>Confirm the action</DialogTitle>
            <Box position="absolute" top={0} right={0}>
                <IconButton onClick={() => {
                    props.setConfirmationDialog(prevState => {
                        return {...prevState, open:false}
                    })
                }}>
                    <Close/>
                </IconButton>
            </Box>
            <DialogContent>
                <Typography>{props.confirmationDialog.message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button  variant="contained" onClick={() => {
                    props.setConfirmationDialog(prevState => {
                        return {...prevState, open:false}
                    })
                }}>
                    Cancel
                </Button>
                <Button color={"primary"} variant="contained"
                        onClick={() => {
                            props.confirmationDialog.deleteSelectedItems();
                            props.setConfirmationDialog(prevState => {
                                return {...prevState, open:false}
                            })
                        }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default ConfirmDialog;
