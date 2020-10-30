import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  TextField,
  Select,
  InputLabel,
  MenuItem,
  Fab,
  Grid,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import MaterialTable, { MTableToolbar } from 'material-table';
import UserContext from '../../context';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant='h6'>{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label='close'
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default class extends Component {
  state = { open: false };
  static contextType = UserContext;
  handleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  handleSubmit = () => {
    this.handleToggle();
    const order = {
      OrderId: this.props.data.OrderId,
    };
    this.props.onSave(order);
  };

  render() {
    const { open } = this.state;
    const { CustomerName, BusinessAddress, SellerId } = this.state;
    const { isEdit, sellers, data } = this.props;
    const { user } = this.context;
    return (
      <div>
        <IconButton color='secondary' size='small' onClick={this.handleToggle}>
          <Edit />
        </IconButton>
        <Dialog
          onClose={this.handleToggle}
          aria-labelledby='customized-dialog-title'
          open={open}
          fullWidth
          disableBackdropClick
        >
          <DialogTitle id='customized-dialog-title' onClose={this.handleToggle}>
            {isEdit ? 'Hantera beställningen' : 'Hantera beställningen'}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={2}>
                <Typography inline variant='body1' align='left'>
                  Kund:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography inline variant='body1' align='left'>
                  {data.CustomerName}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography inline variant='body1' align='left'>
                  Användare:
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Typography inline variant='body1' align='left'>
                  {data.UserName}
                </Typography>
              </Grid>
            </Grid>

            <br />
            <MaterialTable
              columns={[
                { title: 'Artikelnummer', field: 'ArticleNumber' },
                { title: 'Beskrivning', field: 'Description' },
                { title: 'Märkning', field: 'ProjectCode' },
                { title: 'Kvantitet', field: 'Quantity', type: 'numeric' },
              ]}
              data={data.OrderDetails}
              options={{
                paging: false,
                search: false,
                showTitle: false,
                toolbar: false,
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              color='secondary'
              variant='contained'
              disabled={data.Status != 1 || user.UserType !== 1}
            >
              Godkänd
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
