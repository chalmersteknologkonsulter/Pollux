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
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
// import { api } from '../../helpers/apiHelper';
import moment from 'moment';

import ReactSelect from 'react-select';

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

const REPORT_TYPE_WITHDRAWAL = 1;
const REPORT_TYPE_ORDER = 2;
const REPORT_TYPE_PROJECT_SUMMARY = 3;

const reports = [
  { value: 1, label: 'Utplockshistorik' },
  { value: 2, label: 'Beställningshistorik' },
  { value: 3, label: 'Projektsammanfattning' },
];

export default withStyles(styles)(
  class ProjectRepots extends Component {
    state = {
      projects: [],
      reportData: [],
    };
    static contextType = UserContext;

    getProjects = () => {
      // const { user } = this.context;

      // api.get('/projects').then((res) => {
      //   let items = res.data.map((item) => {
      //     return {
      //       value: item.ProjectCode,
      //       label: item.ProjectCode,
      //       customerId: user.CustomerId,
      //     };
      //   });
      //   this.setState({ projects: items });
      // });
    };

    getProjectsByCustomer = () => {
      // const { user } = this.context;

      // const payLoad = this.state.myCustomer
      //   ? {
      //       params: {
      //         sellerId: user.UserId,
      //       },
      //     }
      //   : {};

      // api.get('/projects-by-customer', payLoad).then((res) => {
      //   let items = res.data.map((item) => {
      //     return {
      //       value: item.CustomerId + '_' + item.ProjectCode,
      //       label: item.ProjectCode + ' - ' + item.CustomerName,
      //       customerId: item.CustomerId,
      //     };
      //   });
      //   this.setState({ projects: items });
      // });
    };

    getWithdrawalsSummaryByProjectCode = () => {
      // api
      //   .get('/withdrawals_summary_by_project_code', this.getPayload())
      //   .then((res) => {
      //     this.setState({ reportData: res.data });
      //   });
    };

    getWithdrawalsHistoryByProjectCode = () => {
      // api
      //   .get('/withdrawals_history_by_project_code', this.getPayload())
      //   .then((res) => {
      //     this.setState({ reportData: res.data });
      //   });
    };

    getOrdersHistoryByProjectCode = () => {
      // api
      //   .get('/orders_history_by_project_code', this.getPayload())
      //   .then((res) => {
      //     this.setState({ reportData: res.data });
      //   });
    };

    getOrdersByProjectCode = () => {
      // api
      //   .get('/orders_summary_by_project_code', this.getPayload())
      //   .then((res) => {
      //     this.setState({ reportData: res.data });
      //   });
    };
    getProjectSummary = () => {
      // api.get('/projects-summary', this.getPayload()).then((res) => {
      //   this.setState({ reportData: res.data });
      // });
    };

    getPayload = () => {
      // const { user } = this.context;
      // return {
      //   params: {
      //     projectCode: user.CustomerId
      //       ? this.state.selectedProject.value
      //       : this.state.selectedProject.value.split(/_(.+)/)[1],
      //     customerId: this.state.selectedProject.customerId,
      //   },
      // };
    };

    componentDidMount() {
      const { user } = this.context;
      if (user.CustomerId) this.getProjects();
      else this.getProjectsByCustomer();
    }

    onLoadClick = () => {
      // if (this.state.selectedReport.value === REPORT_TYPE_WITHDRAWAL)
      //   this.getWithdrawalsHistoryByProjectCode();
      // else if (this.state.selectedReport.value === REPORT_TYPE_ORDER)
      //   this.getOrdersHistoryByProjectCode();
      // else if (this.state.selectedReport.value === REPORT_TYPE_PROJECT_SUMMARY)
      //   this.getProjectSummary();
    };

    handleChange = (selectedProject) => {
      this.setState({ selectedProject });
      console.log(this.state);
    };

    handleReportTypeChange = (selectedReport) => {
      this.setState({ selectedReport, reportData: [] });
    };

    handleMyCustomerCheckChange = (event) => {
      this.setState({ myCustomer: event.target.checked }, () =>
        this.getProjectsByCustomer()
      );
    };
    render() {
      const { classes } = this.props;
      const { user } = this.context;
      return (
        <MaterialTable
          title='Projektrapporter'
          columns={
            this.state.selectedReport &&
            this.state.selectedReport.value === REPORT_TYPE_PROJECT_SUMMARY
              ? [
                  {
                    title: 'Artikelnummer',
                    field: 'ArticleNumber',
                  },
                  {
                    title: 'Beskrivning',
                    field: 'Description',
                  },
                  {
                    title: 'Beställning',
                    field: 'OrderQuantity',
                  },
                  {
                    title: 'Utplock',
                    field: 'WithdrawQuantity',
                  },
                ]
              : [
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
                        {moment(rowData.CreationDate).format(
                          'YYYY-MM-DD  kk:mm:ss'
                        )}
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
                ]
          }
          data={this.state.reportData}
          options={{
            actionsColumnIndex: -1,
            pageSize: 10,
            exportButton: true,
          }}
          components={{
            Toolbar: (props) => (
              <div className={classes.root}>
                <MTableToolbar {...props} />
                <Grid container item xs={9} className={classes.gridContainer}>
                  <div
                    style={{
                      zIndex: 100,
                      width: 300,
                    }}
                  >
                    <ReactSelect
                      value={this.state.selectedProject}
                      onChange={this.handleChange}
                      placeholder={'Välj projekt'}
                      options={this.state.projects}
                    />
                  </div>

                  <div
                    style={{
                      zIndex: 100,
                      width: 200,
                    }}
                  >
                    <ReactSelect
                      value={this.state.selectedReport}
                      placeholder={'Välj rapporttyp'}
                      onChange={this.handleReportTypeChange}
                      options={reports}
                    />
                  </div>
                  {!user.CustomerId && (
                    <FormControlLabel
                      className={classes.checkboxControl}
                      control={
                        <Checkbox
                          checked={this.state.myCustomer == 1}
                          onChange={this.handleMyCustomerCheckChange}
                          name='IsActive'
                          color='primary'
                        />
                      }
                      label='Mina kunder'
                    />
                  )}
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
