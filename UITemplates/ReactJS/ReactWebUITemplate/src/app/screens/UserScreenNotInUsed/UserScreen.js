// @flow

import React, { PureComponent } from 'react';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { formatRoute } from 'react-router-named-routes';
import { type ArticleType } from '../../types/articleType';
import CircularProgress from '@material-ui/core/CircularProgress';
import { AppHelper } from '../../helpers/AppHelper';
import { getUser, createUser } from '../../api/userApi';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import SimpleTable from '../../components/SimpleTable';

import '../../../App.css';
import Modal from './components/modal';

// import BootstrapModal from './components/modal';
// import 'bootstrap/dist/css/bootstrap.min.css';

/** Maximum page number that api supports for pagination */
const maxPage = 100;
/** Number of items per page */
const itemsPerPage = 10;
/** Character limit for displaying article heading */
const headingCharLimit = 150;
/** Character limit for displaying article description */
const descriptionCharLimit = 100;

type Props = {
  /** Classes attached with the component */
  classes: Object,
  /** History object for navigation */
  history: any,
};

type State = {
  articles: ArticleType[],
  loading: boolean,
  sortBy: $Values<typeof SortType>,
  searchBy: string,
  total: number,
  currentPage: number,
  users: any,
  userList: any,
};

const styles = (theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  centeredContent: {
    textAlign: 'center',
  },
  pagination: {
    padding: '20px 5px',
    'overflow-x': 'auto',
    textAlign: 'center',
  },
  actionButton: {
    margin: '10px',
  },
});

/**
 * Articles Container Screen
 * A wrapper component for all articles
 */
class UserScreen extends PureComponent<Props, State> {
  state = {
    articles: [],
    loading: false,
    searchBy: '',
    total: 0,
    currentPage: 1,
    users: [],
    userList: [],
  };

  componentDidMount() {
    // this.getNewArticles({ page: 0, sort: SortType.Newest, q: "" });
    // this.getUser1();
    this.loadUsers();
  }

  handleOnClick = (article: ArticleType) => {
    const splitted = article._id.split('/');
    const articleId = splitted[splitted.length - 1];

    // const newRoute = formatRoute(ROUTES.USER_DETAILS.path, {
    //   articleId,
    // });

    // this.props.history.push({
    //   pathname: newRoute,
    //   state: article,
    // });
  };

  loadUsers = () => {
    getUser().then((data) => {
      this.setState({ users: data });
      console.log('User list', this.state.users);
    });
  };

  handleOnAddClick = () => {
    const newRoute = formatRoute('/page/user');
    this.props.history.push({
      pathname: newRoute,
      state: null,
    });
  };

  createData = (name, calories, fat, carbs, protein) => {
    return { name, calories, fat, carbs, protein };
  };

  render() {
    const { classes } = this.props;
    const { heroContent, cardGrid } = classes;
    const { articles, loading, sortBy, currentPage, total } = this.state;

    const notFoundMessage = (
      <Typography
        component='h1'
        variant='h3'
        align='center'
        color='textPrimary'
        gutterBottom
      >
        No results found
      </Typography>
    );

    return (
      <>
        <main>
          {/* <div className={heroContent}></div> */}
          <Container
            className={cx({ [classes.centeredContent]: loading }, cardGrid)}
            maxWidth='md'
          >
            {loading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align='right'>User Login ID</TableCell>
                        <TableCell align='right'>User Type</TableCell>
                        <TableCell align='right'>Customer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.users.map((row) => (
                        <TableRow key={row.UserId}>
                          <TableCell component='th' scope='row'>
                            {row.UserName}
                          </TableCell>
                          <TableCell align='right'>{row.UserLoginId}</TableCell>
                          <TableCell align='right'>Mobile User</TableCell>
                          <TableCell align='right'>BYGG POISEDON</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            <Grid item xs={12}>
              <Button
                className={1 == 1 && classes.actionButton}
                variant='contained'
                color='primary'
                onClick={() => {
                  console.log('Button Clicked');
                  this.handleOnAddClick();
                }}
              >
                Add
              </Button>
            </Grid>
            {/* <BootstrapModal /> */}
          </Container>
        </main>
      </>
    );
  }
}

export default withStyles(styles, { withTheme: true })(UserScreen);
