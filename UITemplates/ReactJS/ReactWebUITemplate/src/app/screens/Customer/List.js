import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Chip, Button } from '@material-ui/core';
import {
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from '../../api/customerApi';
import { getSeller } from '../../api/sellerApi';
// import { api } from '../../helpers/apiHelper';
import CreationDialog from './Form';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

export default class CustomerList extends Component {
  state = {
    customers: [],
    sellers: [],
  };
  getCustomers = () => {
    // getCustomer().then((data) => {
    //   this.setState({ customers: data });
    // });
  };

  getSellers = () => {
    // api
    //   .get('/sellers')
    //   .then((res) => this.setState({ sellers: res.data }));
  };

  componentDidMount() {
    // this.getCustomers();
    // this.getSellers();
  }

  onSaveHandler = (data) => {
    // let payLoad = {
    //   ...data,
    // };
    // if (data.CustomerId) {
    //   updateCustomer(payLoad).then((res) => {
    //     this.getCustomers();
    //   });
    // } else {
    //   createCustomer(payLoad).then((res) => {
    //     this.getCustomers();
    //   });
    // }
  };

  onDeleteConfirmation = ({ CustomerId }) => {
    // deleteCustomer(CustomerId).then((res) => {
    //   this.getCustomers();
    // });
  };

  getSellerName = () => {
    // const sellerDictionary = {};
    // this.state.sellers.map((seller) => {
    //   const { SellerId, SellerName } = seller;
    //   sellerDictionary[SellerId] = SellerName;
    // });
    // return sellerDictionary;
  };

  render() {
    return (
      <MaterialTable
        title='Kunder'
        columns={[
          {
            title: 'Namn',
            field: 'CustomerName',
          },
          { title: 'Adress', field: 'BusinessAddress' },
          {
            title: 'Säljkontakt',
            field: 'SellerId',
            lookup: this.getSellerName(),
          },
        ]}
        data={this.state.customers}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add Customer',
            isFreeAction: true,
          },
          {
            icon: 'save',
            tooltip: 'Save Customer',
          },
          {
            icon: 'delete',
            tooltip: 'delete Customer',
            onClick: (event, rowData) => this.onDeleteConfirmation(rowData),
          },
        ]}
        options={{
          actionsColumnIndex: -1,
        }}
        components={{
          Action: (props) => {
            if (props.action.icon === 'add') {
              return (
                <CreationDialog
                  onSave={this.onSaveHandler}
                  sellers={this.state.sellers}
                ></CreationDialog>
              );
            }
            if (props.action.icon === 'save') {
              return (
                <CreationDialog
                  isEdit={true}
                  customer={props.data}
                  sellers={this.state.sellers}
                  onSave={this.onSaveHandler}
                ></CreationDialog>
              );
            }
            if (props.action.icon === 'delete') {
              return (
                <DeleteConfirmationDialog
                  title='Bekräftelse'
                  message='Är du säker på att du vill radera denna kund?'
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
