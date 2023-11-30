import { IconButton, Dialog, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { displayConfirmation, dismissConfirmation } from "../../redux/controller/confirmationSlice";
import CloseIcon from "@mui/icons-material/Close";

const ConfirmationContainer = () => {
  const dispatch = useDispatch();
  const confirmation = useSelector((state) => state.controller.confirmation);
  const open = Boolean(confirmation.open);


  const handleClose = () => {
    dispatch(dismissConfirmation());
  };
  const handleYesClose = () => {
    confirmation.onConfirm()
    dispatch(dismissConfirmation());
  };

  return (
    <React.Fragment>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {confirmation.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYesClose}>Yes</Button>
        <Button onClick={handleClose} autoFocus>
          No
        </Button>
      </DialogActions>
    </Dialog>
  </React.Fragment>
    // <Dialog
    //   onClose={handleClose}
    //   open={open}
    //   message={confirmation.message}
    //   action={
    //     <IconButton
    //       size="small"
    //       aria-label="close"
    //       color="inherit"
    //       onClick={handleClose}
    //     >
    //       <CloseIcon fontSize="small" />
    //     </IconButton>
    //   }
    // />
  );
};

export default ConfirmationContainer;
