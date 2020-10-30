// @flow

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
  Button,
  IconButton,
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';
import { formatRoute } from 'react-router-named-routes';
import { api } from '../../../helpers/apiHelper';
import sortBy from 'lodash/sortBy';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
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

  productWrapper: {
    margin: '40px',
    border: '1px solid',
  },
  outterContainer: {
    display: 'block',
    border: '1px solid',
    margin: 25,
  },
  container: {
    display: 'flex',
    borderBottom: '1px solid',
    alignItems: 'center',
    backgroundColor: '#D7DBDD',
  },
  left: {
    flex: 0.1,
    minWidth: 25,
    textAlign: 'center',
    backgroundColor: '#D7DBDD',
  },
  right: {
    flex: 0.1,
    minWidth: 25,
    backgroundColor: '#D7DBDD',
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
    backgroundColor: '#E5E7E9',
    padding: 8,
  },
  control: {
    flex: 3,
    backgroundColor: 'white',
    padding: 5,
  },
  moreInfoContainer: {
    display: 'flex',
    width: '100%',
  },
  moreInfoControlWrapper: {
    margin: 10,
  },
  moreInfoControl: {
    display: 'flex',
    borderBottom: '1px solid',
    height: 40,
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  cellIndexPanel: {
    display: 'flex',
    minWidth: 25,
    height: '100%',
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  cellIndexRowColor: {
    backgroundColor: '#D7DBDD',
  },
}));
export default function CategoryDeatails(props) {
  const classes = useStyles();
  const { location, history } = props;
  const { state: data } = location;

  //Filtering out default attribute
  //Default attribute type is 1
  const attributes = data.attributes.filter((item) => item.Type !== 1);

  //   const { Title, Description, Application, ImageURL, Products } = data.category;

  const [category, setValues] = React.useState({
    CategoryId: data.category ? data.category.Id : '',
    Title: data.category ? data.category.Title : '',
    Description: data.category ? data.category.Description : '',
    Application: data.category ? data.category.Application : '',
    ImageURL: data.category ? data.category.ImageURL : '',
    Products: [
      {
        ProductId: '',
        Artikelnr: '',
        EANCode: '',
        Beskrivning: '',
        Options: [],
      },
    ],
  });

  React.useEffect(() => {
    if (data && data.category) {
      getProducts(category.CategoryId);
    }
  }, []);

  const getProducts = (categoryId) => {
    api
      .get('/product/product-by-category', {
        params: {
          categoryId: categoryId,
        },
      })
      .then((res) => {
        //Sorted by article number
        let sortedProducts = sortBy(res.data.Products, 'ArticleNumber');

        let attributeMap = res.data.Attributes.filter((item) => item.Type != 1);
        let products = sortedProducts.map((item) => {
          return {
            ProductId: item.ProductId,
            Artikelnr: item.ArticleNumber,
            Beskrivning: item.Description,
            EANCode: item.EANCode,
            Options: attributeMap.map((option) => {
              return { AttributeId: option.Id, Value: item[option.FieldName] };
            }),
          };
        });
        setValues({ ...category, ['Products']: products });
      });
  };

  const addItem = (index) => {
    let newProduct = {
      Artikelnr: '',
      EANCode: '',
      Beskrivning: '',
      Options: [],
    };
    const products = category.Products;
    products.splice(index + 1, 0, newProduct);
    setValues({ ...category, ['Products']: products });
  };

  const addOption = (index) => {
    const products = category.Products;
    const option = { AttributeId: '', Value: '' };
    products[index].Options.push(option);
    setValues({ ...category, ['Products']: products });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...category, [prop]: event.target.value });
  };

  const handleProductPropertiesChange = (value, index, name) => {
    const products = category.Products;
    products[index][name] = value;
    setValues({ ...category, ['Products']: products });
  };

  const handleOptionChange = (value, productIndex, OptionIndex, name) => {
    const products = category.Products;
    products[productIndex].Options[OptionIndex][name] = value;
    setValues({ ...category, ['Products']: products });
  };

  const handleChangeWithIndex = (prop, index) => (event) => {
    setValues({ ...category, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    if (category.CategoryId) {
      api.put('/product-category/', category).then((response) => backToList());
    } else {
      api.post('/product-category/', category).then((response) => backToList());
    }
  };

  const backToList = () => {
    const newRoute = formatRoute('/page/Products');
    props.history.push({
      pathname: newRoute,
      state: null,
    });
  };

  return (
    <div>
      <Grid container item xs={6} className={classes.gridContainer}>
        <TextField
          fullWidth
          id='Title'
          label='Kategori'
          name='Title'
          size='small'
          value={category.Title}
          onChange={handleChange('Title')}
        />
        <br />
        <TextField
          fullWidth
          multiline
          rowsMax={4}
          id='Description'
          label='Beskrivning'
          name='Description'
          value={category.Description}
          onChange={handleChange('Description')}
        />
        <TextField
          fullWidth
          multiline
          rowsMax={2}
          id='Application'
          label='Användningsområde'
          name='Application'
          value={category.Application}
          onChange={handleChange('Application')}
        />
        <TextField
          fullWidth
          id='ImageURL'
          label='Foto URL'
          name='ImageURL'
          value={category.ImageURL}
          onChange={handleChange('ImageURL')}
        />
      </Grid>
      <div className={classes.outterContainer}>
        {category.Products.map((item, index) => (
          <div style={{ position: 'relative' }}>
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
                        handleProductPropertiesChange(
                          value,
                          index,
                          'Artikelnr'
                        );
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
                        handleProductPropertiesChange(value, index, 'EANCode');
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
                        handleProductPropertiesChange(
                          value,
                          index,
                          'Beskrivning'
                        );
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
                      {/* More info div; OK */}
                      <div className={classes.moreInfoControlWrapper}>
                        {/* More info control table */}
                        <div style={{ border: '1px solid' }}>
                          <div className={classes.moreInfoControl}>
                            <div className={classes.cellIndexPanel}></div>
                            <div
                              style={{
                                flex: 1,
                                borderLeft: '1px solid',
                                borderRight: '1px solid',
                                height: '100%',
                                paddingLeft: 4,
                                paddingTop: 10,
                              }}
                            >
                              Benämning
                            </div>
                            <div
                              style={{
                                flex: 1,
                                borderRight: '1px solid',
                                height: '100%',
                                paddingLeft: 4,
                                paddingTop: 10,
                              }}
                            >
                              Data
                            </div>
                            <div className={classes.cellIndexPanel}></div>
                          </div>
                          {item.Options.map((item, optionIndex) => (
                            <div
                              className={classes.moreInfoControl}
                              key={optionIndex}
                            >
                              <div
                                className={clsx(
                                  classes.cellIndexPanel,
                                  classes.cellIndexRowColor
                                )}
                              >
                                <div className={classes.left}>
                                  {optionIndex + 1}
                                </div>
                              </div>
                              <div
                                style={{
                                  flex: 1,
                                  borderLeft: '1px solid',
                                  borderRight: '1px solid',
                                  height: '100%',
                                  padding: 2,
                                }}
                              >
                                <Select
                                  fullWidth
                                  native
                                  value={item.AttributeId}
                                  name={'AttributeId'}
                                  onChange={(event) => {
                                    let { name, value } = event.target;
                                    handleOptionChange(
                                      value,
                                      index,
                                      optionIndex,
                                      name
                                    );
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
                                  flex: 1,
                                  borderRight: '1px solid',
                                  height: '100%',
                                  padding: 2,
                                }}
                              >
                                <Input
                                  fullWidth
                                  placeholder='Data'
                                  value={item.Value}
                                  name={'Value'}
                                  onChange={(event) => {
                                    let { name, value } = event.target;
                                    handleOptionChange(
                                      value,
                                      index,
                                      optionIndex,
                                      name
                                    );
                                  }}
                                  inputProps={{
                                    'aria-label': 'Value',
                                  }}
                                />
                              </div>
                              <div
                                className={clsx(
                                  classes.cellIndexPanel,
                                  classes.cellIndexRowColor
                                )}
                              ></div>
                            </div>
                          ))}
                        </div>
                        {/* button to add more row; OK */}
                        <div
                          style={{
                            paddingTop: 10,
                            textAlign: 'right',
                          }}
                        >
                          <Button
                            onClick={() => {
                              addOption(index);
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
                {/* <div>
                  <IconButton
                    color='secondary'
                    size='small'
                    onClick={() => {
                      addItem(index);
                    }}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                </div> */}
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                right: -1,
                bottom: -15,
                zIndex: 100,
              }}
            >
              {' '}
              <IconButton
                color='secondary'
                size='small'
                onClick={() => {
                  addItem(index);
                }}
              >
                <AddCircleOutlineIcon />
              </IconButton>
            </div>
          </div>
        ))}
      </div>
      <div style={{ paddingTop: 10, margin: 20, textAlign: 'right' }}>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          color='secondary'
          variant='contained'
        >
          Skapa
        </Button>
      </div>
    </div>
  );
}
