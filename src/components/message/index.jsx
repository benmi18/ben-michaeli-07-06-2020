import React, { Fragment, useState } from 'react'
import MuiAlert from '@material-ui/lab/Alert';
import './index.css';
import { Snackbar } from '@material-ui/core';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Message = ({ text, type, autoHideDuration }) => {
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <Fragment>
      {
        autoHideDuration ?
          <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
            <Alert onClose={handleClose} variant="outlined" severity={type}>{text}</Alert>
          </Snackbar> :
          <Alert variant="outlined" severity={type}>{text}</Alert>
      }
    </Fragment>
  );
};

export default Message
