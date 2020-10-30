import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Chip, Button } from '@material-ui/core';
import { getCustomer } from '../../api/customerApi';
import CreationDialog from './Form';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
// import { api } from '../../helpers/apiHelper';
import UserContext from '../../context';
import { UserTypes } from '../../utils/appConst';

const userTypes = [
  { type: 1, name: 'FastEx-användare' },
  { type: 2, name: 'Kundanvändare' },
  { type: 3, name: 'Appanvändare' },
];

export default class UserListList extends Component {
  state = {
    users: [],
    customers: [],
  };

  static contextType = UserContext;

  getUsers = () => {
    // api.get('/users').then((res) => this.setState({ users: res.data }));
  };

  getCustomers = () => {
    // getCustomer().then((data) => {
    //   this.setState({ customers: data });
    // });
  };

  componentDidMount() {
    console.log('user types', UserTypes);
    this.getUsers();
    this.getCustomers();
  }

  onSaveHandler = (data) => {
    // let payload = {
    //   ...data,
    // };
    // if (data.UserId) {
    //   api.put('/users/', payload).then((response) => this.getUsers());
    // } else {
    //   api.post('/users/', payload).then((response) => this.getUsers());
    // }
  };

  onDeleteConfirmation = ({ UserId }) => {
    // api
    //   .delete('/users/', {
    //     params: {
    //       userId: UserId,
    //     },
    //   })
    //   .then((response) => this.getUsers());
  };

  getCustomerName = () => {
    // const customerDictionary = {};
    // this.state.customers.map((customer) => {
    //   const { CustomerId, CustomerName } = customer;
    //   customerDictionary[CustomerId] = CustomerName;
    // });
    // return customerDictionary;
  };

  render() {
    const { user } = this.context;
    return (
      <MaterialTable
        title='Användare'
        columns={[
          {
            title: 'Namn',
            field: 'UserName',
          },
          { title: 'Användarnamn', field: 'UserLoginId' },
          {
            title: 'Användartyp',
            field: 'UserType',
            lookup: {
              1: 'FastEx-användare',
              2: 'Kundanvändare',
              3: 'Appanvändare',
            },
          },
          {
            title: 'Kund',
            field: 'CustomerId',
            lookup: this.getCustomerName(),
          },
          {
            title: 'Status',
            field: 'IsActive',
            lookup: { 1: 'Aktiv', 0: 'Inaktiv' },
          },
        ]}
        data={this.state.users}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
          },
          {
            icon: 'edit',
            tooltip: 'Edit User',
          },
          {
            icon: 'delete',
            tooltip: 'Delete User',
            onClick: (event, rowData) => this.onDeleteConfirmation(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
          pageSize: 20,
        }}
        components={{
          Action: (props) => {
            if (props.action.icon === 'add') {
              return (
                <CreationDialog
                  onSave={this.onSaveHandler}
                  customers={this.state.customers}
                  userTypes={userTypes}
                ></CreationDialog>
              );
            }
            if (props.action.icon === 'edit') {
              return (
                <CreationDialog
                  isEdit={true}
                  user={props.data}
                  customers={this.state.customers}
                  userTypes={userTypes}
                  onSave={this.onSaveHandler}
                ></CreationDialog>
              );
            }
            if (props.action.icon === 'delete') {
              return (
                <DeleteConfirmationDialog
                  title='Bekräftelse'
                  message='Är du säker på att du vill radera denna användare?'
                  onConfirmation={(event) =>
                    props.action.onClick(event, props.data)
                  }
                ></DeleteConfirmationDialog>
              );
            } else return null;
          },
        }}
        localization={{
          body: {
            emptyDataSourceMessage: 'Ingen information att visa',
          },
          toolbar: {
            searchTooltip: 'Sök',
            searchPlaceholder: 'Sök',
          },
          pagination: {
            labelRowsSelect: 'Rader',
            labelDisplayedRows: '{from}-{to} av {count}',
          },
          header: {
            actions: 'Aktion',
          },
        }}
      />
    );
  }
}
