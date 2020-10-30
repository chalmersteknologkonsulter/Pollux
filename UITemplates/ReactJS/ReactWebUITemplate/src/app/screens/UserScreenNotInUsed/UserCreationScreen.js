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
import { AppHelper } from '../../helpers/AppHelper';
import TextField from '@material-ui/core/TextField';
import SimpleTable from '../../components/SimpleTable';
import { getUser, createUser } from '../../api/userApi';
import Box from '@material-ui/core/Box';

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
    margin: '15px 0',
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
    // marginLeft: 100
  },
  inputFieldWidth: {
    width: '400px',
  },
  actionButton: {
    paddingLeft: '10px',
    marginLeft: 100,
  },
});

class UserCreationScreen extends PureComponent<Props, State> {
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

  onAddClickHandler = () => {
    console.log('Add button clicked');
    let payLoad = {
      UserName: this.state.userName,
      UserLoginId: this.state.userLoginId,
      Password: this.state.password,
      UserType: 3,
      CreatedBy: 1,
      CustomerId: 1,
      IsActive: 1,
    };
    const newRoute = formatRoute('/page/users');

    this.props.history.push({
      pathname: newRoute,
      state: null,
    });
    createUser(payLoad).then((res) => {
      console.log(res);
      // const newRoute = formatRoute(ROUTES.USER_LIST.path);

      // this.props.history.push({
      //   pathname: newRoute,
      //   state: null,
      // });
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
          // style={{ minHeight: '100vh' }}
        >
          <Grid item xs={3}>
            <main>
              <form className={classes.root} noValidate autoComplete='off'>
                <div className={classes.inputForm}>
                  <TextField
                    className={classes.inputFieldWidth}
                    id='name'
                    label='Name'
                    variant='outlined'
                    value={this.state.userName}
                    onChange={this.onUserNameChange}
                  />
                </div>
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
                    type='password'
                    variant='outlined'
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                  />
                </div>
                <div className={classes.inputForm}>
                  <TextField
                    className={classes.inputFieldWidth}
                    id='userType'
                    label='User Type'
                    variant='outlined'
                  />
                </div>
                <div className={classes.inputForm}>
                  <TextField
                    className={classes.inputFieldWidth}
                    id='customer'
                    label='Customer'
                    variant='outlined'
                  />
                </div>
                <Grid item xs={12}>
                  <Box display='flex' width='100%'>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={this.onAddClickHandler}
                    >
                      Add
                    </Button>
                  </Box>
                  {/* <Grid container justify='center' spacing={5}>
                    <Grid item>
                      <Button
                        className={classes.actionButton}
                        size='medium'
                        variant='contained'
                        color='primary'
                        href={'/page/users'}
                      >
                        Back
                      </Button>
                    </Grid>
                    <Grid item></Grid>
                  </Grid> */}
                </Grid>
              </form>
            </main>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UserCreationScreen);
