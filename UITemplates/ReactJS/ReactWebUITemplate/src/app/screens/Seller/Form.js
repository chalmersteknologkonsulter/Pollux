import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Fab,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default class extends Component {
  state = { open: false };
  state = this.getInitState();

  getInitState() {
    const { seller } = this.props;
    console.log('row data:', seller);
    return (
      seller || {
        SellerName: '',
        SellerDesignation: '',
        Email: '',
        ContactAddress: '',
        ContactNumber: '',
      }
    );
  }

  handleChange = ({ target: { value, name } }) =>
    this.setState({
      [name]: value,
    });

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = () => {
    this.handleToggle();
    const user = {
      SellerId: this.state.SellerId,
      SellerName: this.state.SellerName,
      SellerDesignation: this.state.SellerDesignation,
      Email: this.state.Email,
      ContactAddress: this.state.ContactAddress,
      ContactNumber: this.state.ContactNumber,
    };
    this.props.onSave(user);
  };

  render() {
    const { open } = this.state;
    const {
      SellerName,
      SellerDesignation,
      Email,
      ContactAddress,
      ContactNumber,
    } = this.state;
    const { isEdit } = this.props;
    return (
      <div>
        {isEdit ? (
          <IconButton
            color='secondary'
            size='small'
            onClick={this.handleToggle}
          >
            <Edit />
          </IconButton>
        ) : (
          <Fab onClick={this.handleToggle} color='secondary' size='small'>
            <Add />
          </Fab>
        )}
        <Dialog
          onClose={this.handleToggle}
          aria-labelledby='customized-dialog-title'
          open={open}
          fullWidth
          disableBackdropClick
        >
          <DialogTitle id='customized-dialog-title' onClose={this.handleToggle}>
            {isEdit ? 'Edit User' : 'Add User'}
          </DialogTitle>
          <DialogContent dividers>
            <form>
              <TextField
                id='name'
                label='Name'
                name='SellerName'
                value={SellerName}
                onChange={this.handleChange}
                fullWidth
              />
              <br />
              <TextField
                id='sellerDesignation'
                label='Designation'
                name='SellerDesignation'
                value={SellerDesignation}
                onChange={this.handleChange}
                fullWidth
              />
              <br />
              <TextField
                id='email'
                label='Email'
                name='Email'
                value={Email}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id='contactAddress'
                label='Address'
                name='ContactAddress'
                value={ContactAddress}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                id='contactNumber'
                label='Contact Number'
                name='ContactNumber'
                value={ContactNumber}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              color='secondary'
              variant='contained'
            >
              {isEdit ? 'Edit' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
