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
  Typography,
} from '@material-ui/core';
// import { api } from '../../helpers/apiHelper';
import OrderDetails from './OrderDetails';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import moment from 'moment';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import UserContext from '../../context';

const styles = (theme) => ({
  root: {},
  gridContainer: {
    display: 'flex',
    alignItems: 'baseline',
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  checkboxControl: {
    display: 'block',
  },
});

export default withStyles(styles)(
  class OrderList extends Component {
    state = {
      orders: [],
      customers: [],
      sellers: [],
      fromDate: moment(new Date()).subtract(1, 'days'),
      toDate: moment(new Date()).add(1, 'days'),
      myOrder: 0,
    };
    static contextType = UserContext;

    getOrders = () => {
      // const { user } = this.context;
      // let payload = {
      //   dateRange: {
      //     fromDate: moment(this.state.fromDate)
      //       .startOf('day')
      //       .format('YYYY-MM-DD kk:mm:ss'),
      //     toDate: moment(this.state.toDate)
      //       .endOf('day')
      //       .format('YYYY-MM-DD kk:mm:ss'),
      //   },
      // };
      // if (this.state.myOrder) {
      //   payload.sellerId = user.UserId;
      // }
      // api.post('/orders-by-date-range', payload).then((res) => {
      //   this.setState({ orders: res.data });
      // });
    };

    componentDidMount() {
      this.getOrders();
    }

    onSaveHandler = (data) => {
      // let payload = {
      //   ...data,
      // };
      // console.log('payload:', data);
      // api.put('/orders', payload).then((res) => {
      //   this.getOrders();
      // });
    };

    handleFromDateChange = (date) => {
      // this.setState({ fromDate: date });
      // console.log('momoment:', moment(date).format('DD-MM-YYYY'));
    };

    handleToDateChange = (date) => {
      // this.setState({ toDate: date });
      // console.log('momoment:', moment(date).format('DD-MM-YYYY'));
    };

    handleCheckChange = (event) => {
      // this.setState({ myOrder: event.target.checked });
    };
    onLoadClick = () => {
      this.getOrders();
    };

    onDeleteConfirmation = ({ OrderId }) => {
      // api
      //   .delete('/orders/', {
      //     params: {
      //       orderId: OrderId,
      //     },
      //   })
      //   .then((response) => this.getOrders());
    };

    render() {
      const { classes } = this.props;
      return (
        <MaterialTable
          title='Beställningar'
          columns={[
            {
              title: 'Kund',
              field: 'CustomerName',
            },
            { title: 'Användare', field: 'UserName' },
            {
              title: 'Datum',
              field: 'CreationDate',
              render: (rowData) => (
                <Typography variant='body' gutterBottom>
                  {moment(rowData.CreationDate).format('YYYY-MM-DD  kk:mm:ss')}
                </Typography>
              ),
            },
            {
              title: 'Status',
              field: 'Status',
              lookup: { 1: 'Skapad', 2: 'Hanterad', 3: 'Raderad' },
            },
          ]}
          data={this.state.orders}
          actions={[
            {
              icon: 'save',
              tooltip: 'Save Customer',
              onClick: (event, rowData) => alert('You saved ' + rowData.name),
            },
            {
              icon: 'delete',
              tooltip: 'delete Customer',
              onClick: (event, rowData) => this.onDeleteConfirmation(rowData),
            },
          ]}
          options={{
            pageSize: 20,
            actionsColumnIndex: -1,
            rowStyle: (rowData) => ({
              backgroundColor: rowData.Status === 1 ? '#ff9100' : '#FFF',
            }),
          }}
          components={{
            Action: (props) => {
              if (props.action.icon === 'save') {
                return (
                  <OrderDetails
                    isEdit={true}
                    customer={props.data}
                    data={props.data}
                    sellers={this.state.sellers}
                    onSave={this.onSaveHandler}
                  ></OrderDetails>
                );
              }
              if (props.action.icon === 'delete') {
                return (
                  <DeleteConfirmationDialog
                    title='Bekräftelse'
                    message='Är du säker på att du vill radera beställningen?'
                    actionDisabled={props.data.Status == 2}
                    onConfirmation={(event) =>
                      props.action.onClick(event, props.data)
                    }
                  ></DeleteConfirmationDialog>
                );
              } else return null;
            },

            Toolbar: (props) => (
              <div className={classes.root}>
                <MTableToolbar {...props} />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container item xs={9} className={classes.gridContainer}>
                    <KeyboardDatePicker
                      disableToolbar
                      variant='inline'
                      format='yyyy-MM-dd'
                      margin='normal'
                      id='fromDate'
                      label='Från'
                      value={this.state.fromDate}
                      onChange={this.handleFromDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <KeyboardDatePicker
                      disableToolbar
                      variant='inline'
                      format='yyyy-MM-dd'
                      margin='normal'
                      id='toDate'
                      label='Till'
                      value={this.state.toDate}
                      onChange={this.handleToDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                    <FormControlLabel
                      className={classes.checkboxControl}
                      control={
                        <Checkbox
                          checked={this.state.myOrder == 1}
                          onChange={this.handleCheckChange}
                          name='IsActive'
                          color='primary'
                        />
                      }
                      label='Mina kunder'
                    />
                    <Button
                      color='secondary'
                      variant='contained'
                      onClick={this.onLoadClick}
                    >
                      Hämta
                    </Button>
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
            ),
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
);
