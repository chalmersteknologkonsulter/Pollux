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
    const { seller, customer } = this.props;
    return (
      customer || {
        CustomerName: '',
        BusinessAddress: '',
        SellerId: '',
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
    const customer = {
      CustomerId: this.state.CustomerId,
      CustomerName: this.state.CustomerName,
      BusinessAddress: this.state.BusinessAddress,
      SellerId: this.state.SellerId,
    };
    this.props.onSave(customer);
  };

  render() {
    const { open } = this.state;
    const { CustomerName, BusinessAddress, SellerId } = this.state;
    const { isEdit, sellers } = this.props;
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
            {isEdit ? 'Redigera kund' : 'Skapa kund'}
          </DialogTitle>
          <DialogContent dividers>
            <form>
              <TextField
                id='name'
                label='Namn'
                name='CustomerName'
                value={CustomerName}
                onChange={this.handleChange}
                fullWidth
              />
              <br />
              <TextField
                id='businessAddress'
                label='Företagsadress'
                name='BusinessAddress'
                value={BusinessAddress}
                onChange={this.handleChange}
                fullWidth
              />
              <br />
              <br />
              <InputLabel htmlFor='Seller'>Säljkontakt</InputLabel>
              <Select
                name='SellerId'
                onChange={this.handleChange}
                value={SellerId}
                fullWidth
              >
                {sellers.map((seller) => (
                  <MenuItem key={seller.SellerId} value={seller.SellerId}>
                    {seller.SellerName}
                  </MenuItem>
                ))}
              </Select>
            </form>
            <br />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              color='secondary'
              variant='contained'
            >
              {isEdit ? 'Redigera' : 'Skapa'}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
