import React, { Component } from 'react';
import clsx from 'clsx';
import {
  Chip,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  withStyles,
  Paper,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';
import { api } from '../../helpers/apiHelper';
import debounce from 'lodash/debounce';
import CreationDialog from './Form';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import UserContext from '../../context';

import Category from './components/Category';
import SearchBar from './components/SearchBar';

import { formatRoute } from 'react-router-named-routes';

const styles = (theme) => ({
  root: { flexGrow: 1 },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 0, 2),
  },
  centeredContent: {
    textAlign: 'center',
  },
  cardGrid: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'baseline',
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

export default withStyles(styles)(
  class CategoryList extends Component {
    state = {
      categories: [],
      attributes: [],
      loading: true,
    };
    static contextType = UserContext;

    getCategories = (searchBy) => {
      this.setState({ loading: true });
      api
        .get('/product-category', {
          params: {
            q: searchBy,
          },
        })
        .then((res) => this.setState({ loading: false, categories: res.data }))
        .catch((ex) => {
          this.setState({ loading: false });
        });
    };

    getAttributes = () => {
      api
        .get('/product-attribute')
        .then((res) => this.setState({ attributes: res.data }));
    };

    componentDidMount() {
      this.getCategories();
      this.getAttributes();
    }

    handleViewClick(category) {
      const data = { category: category, attributes: this.state.attributes };
      const newRoute = formatRoute('/page/ProductDetails');
      this.props.history.push({
        pathname: newRoute,
        state: data,
      });
    }
    onSaveHandler = (data) => {
      let payload = {
        ...data,
      };
      if (data.CategoryId) {
        api
          .put('/product-category/', payload)
          .then((response) => this.getCategories());
      } else {
        api
          .post('/product-category/', payload)
          .then((response) => this.getCategories());
      }
    };

    onDeleteConfirmation = ({ Id }) => {
      api
        .delete('/product-category/', {
          params: {
            categoryId: Id,
          },
        })
        .then((response) => this.getCategories());
    };

    handleInputChange = debounce((value: string) => {
      const payload: any = {
        sort: this.state.sortBy,
        page: 0,
        q: value.trim(),
      };

      this.getCategories(payload.q);
    }, 500);

    render() {
      const { loading } = this.state;
      const { classes } = this.props;
      return (
        <div>
          <div className={classes.heroContent}>
            <Container maxWidth='sm'>
              <Typography
                component='h1'
                variant='h2'
                align='center'
                color='textPrimary'
                gutterBottom
              >
                <SearchBar
                  onChnageInputValue={this.handleInputChange}
                  onAdd={() => this.handleViewClick(null)}
                />
              </Typography>
            </Container>
          </div>
          <Container
            className={clsx(
              loading && classes.centeredContent,
              classes.cardGrid
            )}
            maxWidth='md'
          >
            {loading ? (
              <CircularProgress className={classes.progress} />
            ) : (
              <div className={classes.root}>
                <Grid container spacing={4}>
                  {this.state.categories.map((category, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                      <Category
                        category={category}
                        onClick={() => {
                          this.handleViewClick(category);
                        }}
                        onDelete={() => {
                          this.onDeleteConfirmation(category);
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </Container>
        </div>
      );
    }
  }
);
