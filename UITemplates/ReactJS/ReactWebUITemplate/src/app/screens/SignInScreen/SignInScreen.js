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
import { setClientToken } from '../../helpers/apiHelper';
import Cookie from 'js-cookie';
import { values } from 'lodash/values';
//import { api } from '../../helpers/apiHelper';

import UserContext from '../../context';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://ctk.se/'>
        CTK-IT
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInScreen(props) {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState('');
  const userContext = React.useContext(UserContext);
  const { setUser } = userContext;

  const handleSubmit = (event) => {
    event.preventDefault();
    let payload = {
      userLoginId: event.target[0].value,
      password: event.target.elements.password.value,
      origin: 'web',
    };
     const newRoute = formatRoute('/page');
        const userInfo = {
          UserId: "",
          UserName: "",
          userLoginId: "",
          UserType: "",
          CustomerId: "",
        };
        setUser(userInfo);
        props.history.push({
          pathname: newRoute,
          state: "",
        });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Logga in
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
            label='Användarnamn'
            name='email'
            autoComplete='email'
            autoFocus
            // value='admin'
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Lösenord'
            type='password'
            id='password'
            autoComplete='current-password'
            // value='admin'
          />
          {/* <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          /> */}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Logga in
          </Button>
        </form>
        <Typography variant='subtitle2' color='error'>
          {errorMessage}
        </Typography>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
