import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable, { MTableToolbar } from 'material-table';
import {
  Chip,
  Button,
  Grid,
  FormControlLabel,
  Checkbox,
  withStyles,
} from '@material-ui/core';
import { api } from '../../helpers/apiHelper';
import moment from 'moment';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import CreationDialog from './Form';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import UserContext from '../../context';

const styles = (theme) => ({
  root: {},
  gridContainer: {
    display: 'flex',
    alignItems: 'baseline',
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
});

export default withStyles(styles)(
  class CategoryList extends Component {
    state = {
      categories: [],
      attributes: [],
    };
    static contextType = UserContext;

    getCategories = () => {
      api
        .get('/product-category')
        .then((res) => this.setState({ categories: res.data }));
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

    onDeleteConfirmation = ({ UserId }) => {
      api
        .delete('/users/', {
          params: {
            userId: UserId,
          },
        })
        .then((response) => this.getUsers());
    };

    render() {
      const { classes } = this.props;
      return (
        <MaterialTable
          title='Product Categories'
          columns={[
            {
              title: 'Category',
              field: 'Title',
            },
            { title: 'Description', field: 'Description' },
            {
              title: 'Application',
              field: 'Application',
            },
            {
              title: 'Image',
              field: 'ImageURL',
              render: (rowData) => (
                <img
                  src={rowData.ImageURL}
                  style={{ width: 60, borderRadius: '50%' }}
                />
              ),
            },
          ]}
          data={this.state.categories}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
          }}
          actions={[
            {
              icon: 'add',
              tooltip: 'Add Product',
              isFreeAction: true,
              onClick: (event) => alert('You want to add a new row'),
              disabled: 1 === 1,
            },
            {
              icon: 'edit',
              tooltip: 'Edit Product',
              onClick: (event, rowData) => alert('You saved ' + rowData.name),
            },
            {
              icon: 'delete',
              tooltip: 'Delete Product',
              onClick: (event, rowData) => this.onDeleteConfirmation(rowData),
            },
          ]}
          components={{
            Action: (props) => {
              if (props.action.icon === 'add') {
                return (
                  <CreationDialog
                    attributes={this.state.attributes}
                    onSave={this.onSaveHandler}
                  ></CreationDialog>
                );
              }
              if (props.action.icon === 'edit') {
                return (
                  <CreationDialog
                    isEdit={true}
                    category={props.data}
                    attributes={this.state.attributes}
                    onSave={this.onSaveHandler}
                  ></CreationDialog>
                );
              }
              if (props.action.icon === 'delete') {
                return (
                  <DeleteConfirmationDialog
                    title='Bekräftelse'
                    message='Är du säker på att du vill radera produktinformationen?'
                    onConfirmation={(event) =>
                      props.action.onClick(event, props.data)
                    }
                  ></DeleteConfirmationDialog>
                );
              } else return null;
            },
          }}
        />
      );
    }
  }
);
