import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { formatRoute } from 'react-router-named-routes';
import { login } from '../../api/userApi';
import { setClientToken } from '../../helpers/apiHelper';
import Cookie from 'js-cookie';
import { values } from 'lodash/values';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inputFieldHeight: {
    height: '50%',
  },
}));

export default function UserForm(props) {
  const classes = useStyles();

  const [userType, setUserType] = React.useState('');

  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const newRoute = formatRoute(ROUTES.DASHBOARD.path);

    // props.history.push({
    //   pathname: newRoute,
    //   state: null,
    // });

    let payLoad = {
      userLoginId: event.target[0].value,
      password: event.target.elements.password.value,
    };
    login(payLoad).then((res) => {
      console.log(res.headers['authorization']);
      Cookie.remove('auth-token');
      Cookie.set('auth-token', res.headers['authorization']);
      const newRoute = formatRoute('/page');
      props.history.push({
        pathname: newRoute,
        state: null,
      });
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Add New User
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            // e.preventDefault();
            handleSubmit(e);
          }}
          noValidate
        >
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            className={classes.inputFieldHeight}
            label='Email Address'
            name='email'
            autoComplete='email'
            defaultValue='height fff'
            autoFocus
          />
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={userType}
            onChange={handleUserTypeChange}
          >
            <MenuItem value={1}>Mobile User</MenuItem>
            <MenuItem value={2}>Customer User</MenuItem>
            <MenuItem value={3}>FastEx User </MenuItem>
          </Select>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            defaultValue='jasim123456'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            defaultValue='jasim123456'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            defaultValue='jasim123456'
            autoFocus
          />

          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            defaultValue='123456'
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}
