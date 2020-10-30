import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MaterialTable, { MTableToolbar } from 'material-table';
import { Chip, Button } from '@material-ui/core';
import {
  getSeller,
  createSeller,
  updateSeller,
  deleteSeller,
} from '../../api/sellerApi';
import CreationDialog from './Form';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';

export default class SellerList extends Component {
  state = {
    sellers: [],
  };
  getSellers = () => {
    getSeller().then((data) => {
      this.setState({ sellers: data });
    });
  };

  componentDidMount() {
    this.getSellers();
  }

  onSaveHandler = (data) => {
    let payLoad = {
      ...data,
    };
    console.log('selller info:', data);
    if (data.SellerId) {
      updateSeller(payLoad).then((res) => {
        this.getSellers();
      });
    } else {
      createSeller(payLoad).then((res) => {
        this.getSellers();
      });
    }
  };

  onDeleteConfirmation = ({ SellerId }) => {
    deleteSeller(SellerId).then((res) => {
      this.getSellers();
    });
  };

  render() {
    return (
      <MaterialTable
        title='Seller List'
        columns={[
          {
            title: 'Name',
            field: 'SellerName',
          },
          { title: 'Designation', field: 'SellerDesignation' },
          { title: 'Email', field: 'Email' },
        ]}
        data={this.state.sellers}
        actions={[
          {
            icon: 'add',
            tooltip: 'Add User',
            isFreeAction: true,
            onClick: (event) => alert('You want to add a new row'),
          },
          {
            icon: 'save',
            tooltip: 'Save User',
            onClick: (event, rowData) => alert('You saved ' + rowData.name),
          },
          {
            icon: 'delete',
            tooltip: 'delete User',
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
                <CreationDialog onSave={this.onSaveHandler}></CreationDialog>
              );
            }
            if (props.action.icon === 'save') {
              return (
                <CreationDialog
                  isEdit={true}
                  seller={props.data}
                  onSave={this.onSaveHandler}
                ></CreationDialog>
              );
            }
            if (props.action.icon === 'delete') {
              return (
                <DeleteConfirmationDialog
                  title='Delete Confirmation'
                  message='Are you sure to delete the seller information'
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
