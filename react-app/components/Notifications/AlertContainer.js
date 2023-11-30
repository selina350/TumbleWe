import { IconButton, Snackbar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { dismissAlert } from "../../redux/controller/alertSlice";
import CloseIcon from "@mui/icons-material/Close";

const AlertContainer = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.controller.alert);
  const open = Boolean(alert.open);

  const handleClose = () => {
    dispatch(dismissAlert());
  };
  return (
    <Snackbar
      onClose={handleClose}
      open={open}
      message={alert.message}
      autoHideDuration={4000}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    />
  );
};

export default AlertContainer;
