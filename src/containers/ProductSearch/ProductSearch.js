import React, { useState } from 'react';
import Appbar from '../../components/Appbar/Appbar';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Styles from './ProductSearch.module.css';
import Product from '../../components/Product/Product';
import { getProductDetails } from '../../utils/API/ProductAPI';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import SelectedProduct from '../../components/Product/SelectedProduct';

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const ProductSearch = () => {
  const classes = useStyles();
  const [name, setName] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  //Validation Method for Input
  const validateName = (name) => {
    if(name == null || name === "") {
      return false;
    } else {
      return true;
    }
  };

  //Handler for input value change
  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  //Handler For product requesting API call
  const onSearchHandler = () => {
    setLoading(true);

    if(validateName(name)) {
      setProducts([]);
      getProductDetails(name, 
        (response) => {
          setProducts(response.data);
          setLoading(false);
          console.log(response.data)},
        (err) => {
          console.error(err.data);
          setLoading(false);
        });
    }else {
      setLoading(false);
    }
  };

  //Adding selected products
  const addSelectedProduct = (product) => {
    const local_products = selectedProducts;
    local_products.push(product);
    setSelectedProducts([...local_products]);
  };

  //Removing selected products
  const deleteSelectedProduct = (id) => {
    const local_products = (selectedProducts.filter((product, index) => {
      return product.id !== id;
    }));
    console.log(local_products);
    setSelectedProducts([...local_products]);
  };

  //Adding units on click of Add
  const onAddHandler = (id) => {
    const local_products = selectedProducts;

    var index = local_products.findIndex((data) => data.id === id);

    var unit = Number(local_products[index].unit);
    local_products[index].unit = unit + 1;
    setSelectedProducts([...local_products]);
  };

  //Removingunits on click on Reduce
  const onReduceHandler = (id) => {
    const local_products = selectedProducts;
    
    var index = local_products.findIndex((data) => data.id === id);

    var unit = Number(local_products[index].unit);
    if(unit !== 0) {
      local_products[index].unit = unit - 1;
      setSelectedProducts([...local_products]);
    }
  };

  // This is right side product card
  var updateProduct = null;
  if(selectedProducts.length > 0) {
    updateProduct = (selectedProducts.map((product, index) => {
      return (
        <SelectedProduct 
          product={product}
          key={product.id}
          add={onAddHandler}
          reduce={onReduceHandler}
          onRemove={deleteSelectedProduct} />
        );
    }));
  };

  

  // This is left side product card
  var displayProduct = null;
  if(products.length > 0) {
    displayProduct = (products.map((product, index) => {
      return (
          <Product 
            product={product}
            onAdd={addSelectedProduct}
            key={index} />
        );
    }));
  };
  
  return(
    <div>
      <Appbar title="PRODUCT SEARCH" />

      <main className={classes.content}>
      <div className={classes.toolbar} />
        <div className={Styles.container}>
          <div className={Styles.box1}>
            <br />
            <Backdrop className={classes.backdrop} open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>  
            <TextField key="TextField" id="outlined-basic" 
                label="Search" variant="outlined" size="small"
                onChange={nameChangeHandler}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton color="primary" onClick={onSearchHandler}>
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                }} className={Styles.searchBar} />
                <br />
              {displayProduct}
              
          </div>
          <div className={Styles.box2}>
            <h1>Selected Products</h1>
              {updateProduct}
          </div>
        </div>

      </main>
    </div>  
  )
};

export default ProductSearch;