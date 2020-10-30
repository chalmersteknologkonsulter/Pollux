import React from 'react';
import { Button, Fab, IconButton, Tooltip } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Add, Edit, Delete, AddBox } from '@material-ui/icons';
import UserContext from '../context';

export default function AlertDialog({
  title,
  message,
  onConfirmation,
  actionDisabled,
}) {
  const [open, setOpen] = React.useState(false);
  const { user } = React.useContext(UserContext);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmation = () => {
    handleClose();
    onConfirmation();
  };
  return (
    <div>
      <IconButton
        color='secondary'
        size='small'
        disabled={user.UserType !== 1 || actionDisabled}
        onClick={handleClickOpen}
      >
        <Delete />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='secondary' variant='contained'>
            Avbryt
          </Button>
          <Button
            onClick={handleConfirmation}
            color='secondary'
            variant='contained'
            autoFocus
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
