import React, { Component, Fragment } from 'react';
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
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import UserContext from '../../context';
import { UserTypes } from '../../utils/appConst';
import { api } from '../../helpers/apiHelper';
import debounce from 'lodash/debounce';

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
  state = { open: false, updatePassword: false };
  state = this.getInitState();

  static contextType = UserContext;

  getInitState() {
    const { user } = this.props;

    return (
      user || {
        UserName: '',
        UserLoginId: '',
        Password: '',
        Email: '',
        ContactNumber: '',
        UserType: 1,
        CustomerId: 0,
        IsActive: 1,
        updatePassword: true,
        open: false,
      }
    );
  }
  handleCheckChange = (event) => {
    this.setState({ IsActive: event.target.checked }, () => {
      this.checkIfFormIsReady();
    });
  };
  handleChange = ({ target: { value, name } }) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.checkIfFormIsReady();
      }
    );
  };

  handleLoginIdChange = (name, value) => {
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.checkIfLoginIdExist(value);
      }
    );
  };

  checkIfLoginIdExist = debounce((id) => {
    api
      .get('user/user-by-login-Id', {
        params: {
          id: id,
        },
      })
      .then((res) => {
        if (res.data) {
          this.setState({ loginIdExist: true });
        } else {
          this.setState({ loginIdExist: false });
        }
      })
      .catch((ex) => {
        console.log('error in api calling');
      });
  }, 500);

  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handlePasswrodToggle = () => {
    this.setState({ updatePassword: !this.state.updatePassword }, () => {
      this.checkIfFormIsReady();
    });
  };

  checkIfFormIsReady = debounce(() => {
    let ready =
      this.state.UserName.trim() !== '' && this.state.UserLoginId.trim() !== '';

    if (this.state.updatePassword)
      ready = ready && this.state.Password && this.state.Password.trim() !== '';

    if (this.state.UserType !== UserTypes.FASTEX_USER)
      ready = ready && this.state.CustomerId;

    this.setState({
      readyToSubmit: ready,
    });
  }, 500);

  handleSubmit = () => {
    this.handleToggle();
    const user = {
      UserId: this.state.UserId,
      UserName: this.state.UserName,
      Email: this.state.Email,
      ContactNumber: this.state.ContactNumber,
      UserLoginId: this.state.UserLoginId,
      UserType: this.state.UserType,
      CustomerId: this.state.CustomerId,
      IsActive: this.state.IsActive,
    };
    if (this.state.updatePassword) user.Password = this.state.Password;
    this.props.onSave(user);
  };

  render() {
    const { open } = this.state;
    const {
      UserName,
      Email,
      ContactNumber,
      UserLoginId,
      Password,
      UserType,
      CustomerId,
      IsActive,
      updatePassword,
    } = this.state;
    const { customers, userTypes, isEdit } = this.props;
    const { user } = this.context;

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
          <Fab
            onClick={this.handleToggle}
            color='secondary'
            disabled={user.UserType !== UserTypes.FASTEX_USER}
            size='small'
          >
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
            {isEdit ? 'Redigera användare' : 'Skapa användare'}
          </DialogTitle>
          <DialogContent dividers>
            <TextField
              id='name'
              label='Namn och efternamn'
              name='UserName'
              value={UserName}
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
              id='contactNumber'
              label='Telefonnummer'
              name='ContactNumber'
              value={ContactNumber}
              onChange={this.handleChange}
              fullWidth
            />
            <br />
            <TextField
              disabled={isEdit}
              error={this.state.loginIdExist}
              helperText={
                this.state.loginIdExist
                  ? 'Detta användarnamn är upptaget. Vänligen välj ett annat.'
                  : ''
              }
              id='loginId'
              label='Användarnamn'
              name='UserLoginId'
              value={UserLoginId}
              onChange={(e) => {
                this.handleLoginIdChange(e.target.name, e.target.value);
              }}
              fullWidth
            />
            {updatePassword && (
              <Fragment>
                <br />
                <TextField
                  id='password'
                  label='Lösenord'
                  name='Password'
                  type='password'
                  value={Password}
                  onChange={this.handleChange}
                  fullWidth
                />
              </Fragment>
            )}
            <br />
            <InputLabel htmlFor='userType'>Användartyp</InputLabel>
            <Select
              name='UserType'
              disabled={user.UserType !== UserTypes.FASTEX_USER}
              value={UserType}
              onChange={this.handleChange}
              fullWidth
            >
              {userTypes.map((userType) => (
                <MenuItem key={userType.type} value={userType.type}>
                  {userType.name}
                </MenuItem>
              ))}
            </Select>
            {(UserType == UserTypes.CUSTOMER_USER ||
              UserType == UserTypes.MOBILE_USER) && (
              <Fragment>
                <br />
                <InputLabel htmlFor='customer'>Kund</InputLabel>
                <Select
                  name='CustomerId'
                  disabled={user.UserType !== UserTypes.FASTEX_USER}
                  onChange={this.handleChange}
                  value={CustomerId}
                  fullWidth
                >
                  {customers.map((customer) => (
                    <MenuItem
                      key={customer.CustomerId}
                      value={customer.CustomerId}
                    >
                      {customer.CustomerName}
                    </MenuItem>
                  ))}
                </Select>
              </Fragment>
            )}

            <FormControlLabel
              control={
                <Checkbox
                  checked={IsActive == 1}
                  onChange={this.handleCheckChange}
                  name='IsActive'
                  color='primary'
                />
              }
              label='Aktiv'
            />
            {isEdit && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={updatePassword}
                    onChange={this.handlePasswrodToggle}
                    name='UpdatedPassword'
                    color='primary'
                  />
                }
                label='Ändra lösenord'
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button
              disabled={!this.state.readyToSubmit}
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
