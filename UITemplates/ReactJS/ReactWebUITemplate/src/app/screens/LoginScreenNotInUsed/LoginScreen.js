// @flow

import React, { PureComponent } from 'react';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { formatRoute } from 'react-router-named-routes';
import { ROUTES } from '../Router/Router.config';
import { AppHelper } from '../../helpers/AppHelper';
import TextField from '@material-ui/core/TextField';
import SimpleTable from '../../components/SimpleTable';
import { login } from '../../api/userApi';
import { setClientToken } from '../../helpers/apiHelper';
import Cookie from 'js-cookie';
import CustomComponent from '../../components/CustomComponent';
import Title from '../../components/dashboard/Title';

const publishedDateFormat = 'MMMM D, YYYY';

type Props = {
  /** Classes attached with the component */
  classes: Object,
  /** router: current url */
  location: any,
  /** router: router history */
  history: any,
};

type State = {
  userName: string,
  userLoginId: string,
  password: string,
};

const styles = (theme) => ({
  toolbar: {
    paddingLeft: 0,
    margin: '15px 50px',
  },
  toolbarTitle: {
    flex: 1,
  },
  cardMedia: {
    minHeight: 400,
    backgroundSize: 'auto',
    backgroundColor: '#F6F6F6',
  },
  chip: {
    margin: '10px 0',
  },
  inputForm: {
    paddingBottom: 10,
    // marginLeft: "100px"
  },
  inputFieldWidth: {
    width: '300px',
  },
});

class LoginScreen extends PureComponent<Props, State> {
  state = {
    userName: '',
    userLoginId: '',
    password: '',
  };

  componentDidMount() {
    // this.getUser();
  }

  onUserNameChange = (event) => {
    this.setState({ userName: event.target.value });
  };

  onUserLoginIdChange = (event) => {
    this.setState({ userLoginId: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onCustomButtonClicked = (event) => {
    console.log('hello from custom');
  };

  loginClickHandler = () => {
    const newRoute = formatRoute(ROUTES.USER_LIST.path);

    this.props.history.push({
      pathname: newRoute,
      state: null,
    });
    let payLoad = {
      userLoginId: this.state.userLoginId,
      password: this.state.password,
    };
    login(payLoad).then((res) => {
      console.log(res.headers['authorization']);
      Cookie.remove('auth-token');
      Cookie.set('auth-token', res.headers['authorization']);
      const newRoute = formatRoute(ROUTES.USER_LIST.path);
      this.props.history.push({
        pathname: newRoute,
        state: null,
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth='lg'>
        <Grid
          container
          spacing={0}
          direction='column'
          alignItems='center'
          justify='center'
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <form className={classes.root} noValidate autoComplete='off'>
              <div className={classes.inputForm}>
                <TextField
                  className={classes.inputFieldWidth}
                  id='loginId'
                  label='User Id'
                  variant='outlined'
                  value={this.state.userLoginId}
                  onChange={this.onUserLoginIdChange}
                />
              </div>
              <div className={classes.inputForm}>
                <TextField
                  className={classes.inputFieldWidth}
                  id='password'
                  label='Password'
                  variant='outlined'
                  hintText='Password'
                  floatingLabelText='Password'
                  type='password'
                  value={this.state.password}
                  onChange={this.onPasswordChange}
                />
              </div>

              <div className={classes.inputForm}>
                <Button
                  styles='paddingLeft:50'
                  variant='contained'
                  color='primary'
                  onClick={this.loginClickHandler}
                >
                  Login
                </Button>
              </div>
            </form>
            <CustomComponent
              title='Hello FastEx'
              onChange={this.onCustomButtonClicked}
            />
          </Grid>
        </Grid>
        {/* <div className={classes.toolbar}></div>
        <main>
          <form className={classes.root} noValidate autoComplete="off">
            <div className={classes.inputForm}>
              <TextField
                id="loginId"
                label="User Id"
                variant="outlined"
                value={this.state.userLoginId}
                onChange={this.onUserLoginIdChange}
              />
            </div>
            <div className={classes.inputForm}>
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                hintText="Password"
                floatingLabelText="Password"
                type="password"
                value={this.state.password}
                onChange={this.onPasswordChange}
              />
            </div>

            <div className={classes.inputForm}>
              <Button
                styles="paddingLeft:50"
                variant="contained"
                color="primary"
                onClick={this.loginClickHandler}
              >
                Login
              </Button>
            </div>
          </form>
        </main> */}
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(LoginScreen);
