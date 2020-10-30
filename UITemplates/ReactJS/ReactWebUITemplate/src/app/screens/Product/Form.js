import React, { Component, Fragment } from 'react';
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
  Checkbox,
  FormControlLabel,
  Box,
  Input,
} from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import { borders } from '@material-ui/system';
import UserContext from '../../context';
import { UserTypes } from '../../utils/appConst';

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
  gridContainer: {
    display: 'flex',
    alignItems: 'baseline',
    paddingLeft: 30,
    justifyContent: 'space-between',
  },
  dottedBox: {
    margin: '40px',
    border: '1px solid pink',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
  },
  productWrapper: {
    margin: '40px',
    border: '1px solid',
  },
  moreInfo: {
    border: '1px solid blue',
  },
  outterContainer: {
    display: 'block',
    border: '1px solid',
    margin: 25,
  },
  container: {
    display: 'flex',
    border: '1px solid',
    alignItems: 'center',
    backgroundColor: '#b5bcc7',
  },
  left: {
    flex: 0.1,
    minWidth: 25,
    textAlign: 'center',
    backgroundColor: '#b5bcc7',
  },
  right: {
    flex: 0.1,
    minWidth: 25,
    backgroundColor: '#b5bcc7',
  },
  componentPanelWrapper: {
    flex: 3,
  },
  componentPanel: {
    display: 'flex',
    borderBottom: '1px solid',
  },
  caption: {
    flex: 1,
    backgroundColor: 'grey',
  },
  control: {
    flex: 3,
    backgroundColor: 'white',
  },
  moreInfoContainer: {
    display: 'flex',
    width: '100%',
    minHeight: 200,
    backgroundColor: 'blue',
  },
  moreInfoControlWrapper: {
    margin: 10,
    display: 'block',
  },
  moreInfoControl: {
    display: 'flex',
    minHeight: 40,
    border: '1px solid',
  },
});
const defaultProps = {
  bgcolor: 'background.paper',
  border: 1,
  m: 1,
  borderColor: 'text.primary',
  style: { width: '5rem', height: '5rem' },
};
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

export default withStyles(styles)(
  class extends Component {
    state = {
      open: false,
      updatePassword: false,
      products: [],
    };
    state = this.getInitState();

    static contextType = UserContext;

    getInitState() {
      console.log('I am here');
      const { category } = this.props;
      return {
        Title: '',
        Description: '',
        Application: '',
        ImageURL: '',
        Products: [
          {
            Artikelnr: '',
            EANCode: '',
            Beskrivning: '',
            Options: [{ AttributeId: null, Value: '' }],
          },
        ],
      };
    }
    addItem = (index) => {
      let newProduct = {
        Artikelnr: '',
        EANCode: '',
        Beskrivning: '',
        Options: [{ AttributeId: null, Value: '' }],
      };
      const products = this.state.Products;
      products.splice(index + 1, 0, newProduct);
      this.setState({ Products: products });
    };

    addOption = (index) => {
      const products = this.state.Products;
      const option = { AttributeId: '', Value: '' };
      products[index].Options.push(option);
      this.setState({ Products: products });
    };

    handleCheckChange = (event) => {
      this.setState({ IsActive: event.target.checked });
    };

    handleChange = ({ target: { value, name } }) => {
      this.setState({
        [name]: value,
      });
    };

    handleArticleNumberChange = (value, index) => {
      const products = this.state.Products;
      products[index].Artikelnr = value;
    };

    handleBeskrivningChange = (value, index) => {
      const products = this.state.Products;
      products[index].Beskrivning = value;
    };

    handleProductPropertiesChange = (value, index, name) => {
      const products = this.state.Products;
      products[index][name] = value;
    };
    handleOptionChange = (value, productIndex, OptionIndex, name) => {
      const products = this.state.Products;
      const options = products[productIndex].Options;
      options[OptionIndex][name] = value;
    };

    handleToggle = () => {
      console.log('open:', this.state.open);
      this.setState({ open: !this.state.open });

      // this.setState({ Products: [] });
    };

    handleSubmit = () => {
      this.handleToggle();
      const category = {
        Title: this.state.Title,
        Description: this.state.Description,
        Application: this.state.Application,
        ImageURL: this.state.ImageURL,
        Products: this.state.Products,
      };
      this.props.onSave(category);
    };

    render() {
      const { open } = this.state;
      const {
        Title,
        Description,
        ImageURL,
        Application,
        Products,
      } = this.state;
      const { customers, userTypes, isEdit, classes, attributes } = this.props;
      const { user } = this.context;
      return (
        <div>
          {isEdit ? (
            <IconButton
              color='secondary'
              size='small'
              onClick={this.handleToggle}
            >
              <Edit />
            </IconButton>
          ) : (
            <Fab
              onClick={this.handleToggle}
              color='secondary'
              disabled={user.UserType !== UserTypes.FASTEX_USER}
              size='small'
            >
              <Add />
            </Fab>
          )}
          <Dialog
            fullScreen
            onClose={this.handleToggle}
            aria-labelledby='customized-dialog-title'
            open={open}
            fullWidth
            disableBackdropClick
          >
            <DialogTitle
              id='customized-dialog-title'
              onClose={this.handleToggle}
            >
              {isEdit ? 'Update products' : 'Create new products'}
            </DialogTitle>
            <DialogContent dividers>
              <Grid container item xs={4} className={classes.gridContainer}>
                <TextField
                  fullWidth
                  id='Title'
                  label='Kategori'
                  name='Title'
                  size='small'
                  value={Title}
                  onChange={this.handleChange}
                />
                <br />
                <TextField
                  fullWidth
                  multiline
                  rowsMax={4}
                  id='Description'
                  label='Beskrivning'
                  name='Description'
                  value={Description}
                  onChange={this.handleChange}
                />
                <TextField
                  fullWidth
                  multiline
                  rowsMax={2}
                  id='Application'
                  label='Användningsområde'
                  name='Application'
                  value={Application}
                  onChange={this.handleChange}
                />
                <TextField
                  fullWidth
                  id='ImageURL'
                  label='Foto URL'
                  name='ImageURL'
                  value={ImageURL}
                  onChange={this.handleChange}
                />
              </Grid>
              <div className={classes.outterContainer}>
                {Products.map((item, index) => (
                  <div className={classes.container} key={index}>
                    <div className={classes.left}> {index + 1} </div>
                    <div className={classes.componentPanelWrapper}>
                      <div className={classes.componentPanel}>
                        <div className={classes.caption}>Artikelnr</div>
                        <div className={classes.control}>
                          <Input
                            fullWidth
                            onChange={(event) => {
                              let { name, value } = event.target;
                              this.handleArticleNumberChange(value, index);
                              this.setState({
                                [name]: value,
                              });
                            }}
                            name={'Artikelnr' + index}
                            value={item.Artikelnr}
                            index={index}
                            placeholder='Artikelnr'
                            inputProps={{ 'aria-label': 'Artikelnr' }}
                          />
                        </div>
                      </div>
                      <div className={classes.componentPanel}>
                        <div className={classes.caption}>EANCode</div>
                        <div className={classes.control}>
                          <Input
                            fullWidth
                            onChange={(event) => {
                              let { name, value } = event.target;
                              this.handleProductPropertiesChange(
                                value,
                                index,
                                name
                              );
                              this.setState({
                                [name]: value,
                              });
                            }}
                            name={'EANCode'}
                            value={item.EANCode}
                            placeholder='EANCode'
                            inputProps={{ 'aria-label': 'EANCode' }}
                          />
                        </div>
                      </div>
                      <div className={classes.componentPanel}>
                        <div className={classes.caption}>Beskrivning</div>
                        <div className={classes.control}>
                          <Input
                            fullWidth
                            onChange={(event) => {
                              let { name, value } = event.target;
                              this.handleBeskrivningChange(value, index);
                              this.setState({
                                [name]: value,
                              });
                            }}
                            name={'Beskrivning' + index}
                            value={item.Beskrivning}
                            placeholder='Beskrivning'
                            inputProps={{ 'aria-label': 'Beskrivning' }}
                          />
                        </div>
                      </div>
                      <div className={classes.componentPanel}>
                        <div className={classes.moreInfoContainer}>
                          <div className={classes.caption}>Mer information</div>
                          <div className={classes.control}>
                            <div className={classes.moreInfoControlWrapper}>
                              <div className={classes.moreInfoControl}>
                                <div className={classes.left}></div>
                                <div className={classes.componentPanelWrapper}>
                                  <div style={{ display: 'flex' }}>
                                    <div
                                      style={{
                                        flex: 0.5,
                                      }}
                                    >
                                      Benamning
                                    </div>
                                    <div
                                      style={{
                                        flex: 0.5,
                                      }}
                                    >
                                      Data
                                    </div>
                                  </div>
                                </div>
                                <div className={classes.right}></div>
                              </div>
                              {item.Options.map((item, optionIndex) => (
                                <div
                                  className={classes.moreInfoControl}
                                  key={optionIndex}
                                >
                                  <div className={classes.left}>
                                    {optionIndex + 1}
                                  </div>
                                  <div
                                    className={classes.componentPanelWrapper}
                                  >
                                    <div style={{ display: 'flex' }}>
                                      <div
                                        style={{
                                          flex: 0.5,
                                        }}
                                      >
                                        <Select
                                          fullWidth
                                          native
                                          value={item.AttributeId}
                                          name={'AttributeId'}
                                          onChange={(event) => {
                                            let { name, value } = event.target;
                                            this.handleOptionChange(
                                              value,
                                              index,
                                              optionIndex,
                                              name
                                            );
                                            this.setState({
                                              [name]: value,
                                            });
                                          }}
                                          inputProps={{
                                            name: 'AttributeId',
                                            id: 'age-native-simple',
                                          }}
                                        >
                                          <option aria-label='None' value='' />
                                          {attributes.map((item) => (
                                            <option value={item.Id}>
                                              {item.Title}
                                            </option>
                                          ))}
                                        </Select>
                                      </div>
                                      <div
                                        style={{
                                          flex: 0.5,
                                        }}
                                      >
                                        <Input
                                          fullWidth
                                          placeholder='Data'
                                          value={item.Value}
                                          name={'Value'}
                                          onChange={(event) => {
                                            let { name, value } = event.target;
                                            this.handleOptionChange(
                                              value,
                                              index,
                                              optionIndex,
                                              name
                                            );
                                            this.setState({
                                              [name]: value,
                                            });
                                          }}
                                          inputProps={{
                                            'aria-label': 'Value',
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className={classes.right}></div>
                                </div>
                              ))}
                              <div style={{ paddingTop: 10 }}>
                                <Button
                                  onClick={() => {
                                    this.addOption(index);
                                  }}
                                  color='secondary'
                                  variant='contained'
                                >
                                  Lägg till rad
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.right}>
                      <div>
                        <Fab
                          onClick={() => {
                            this.addItem(index);
                          }}
                          color='secondary'
                          size='small'
                        >
                          <Add />
                        </Fab>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.handleSubmit}
                color='secondary'
                variant='contained'
              >
                {isEdit ? 'Redigera' : 'Skapa'}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    }
  }
);
