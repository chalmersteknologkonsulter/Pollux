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
  class WithdrawalList extends Component {
    state = {
      withdraws: [],
      fromDate: moment(new Date()).subtract(1, 'days'),
      toDate: moment(new Date()).add(1, 'days'),
      myOrder: 0,
    };
    static contextType = UserContext;

    getWithdraws = () => {
      // const { user } = this.context;

      // let payload = {
      //   dateRange: {
      //     fromDate: moment(this.state.fromDate).format('YYYY-MM-DD'),
      //     toDate: moment(this.state.toDate).format('YYYY-MM-DD'),
      //   },
      // };

      // if (this.state.myOrder) {
      //   payload.sellerId = user.UserId;
      // }

      // api.post('/withdrawals-by-date-range', payload).then((res) => {
      //   console.log('withdrawals:', res.data);
      //   this.setState({ withdraws: res.data });
      // });
    };

    componentDidMount() {
      // this.getWithdraws();
    }

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
      // this.getWithdraws();
    };

    render() {
      const { classes } = this.props;
      return (
        <MaterialTable
          title='Utplock'
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
              title: 'Märkning',
              field: 'ProjectCode',
            },
            {
              title: 'Artikelnummer',
              field: 'ArticleNumber',
            },
            {
              title: 'Beskrivning',
              field: 'Description',
            },
            {
              title: 'Kvantitet',
              field: 'Quantity',
            },
          ]}
          data={this.state.withdraws}
          options={{
            actionsColumnIndex: -1,
            pageSize: 20,
          }}
          components={{
            Toolbar: (props) => (
              <div className={classes.root}>
                <MTableToolbar {...props} />
                <Grid container item xs={9} className={classes.gridContainer}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                  </MuiPickersUtilsProvider>
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
