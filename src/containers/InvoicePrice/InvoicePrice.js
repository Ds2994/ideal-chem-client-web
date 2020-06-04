import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Appbar from '../../components/Appbar/Appbar';
import Styles from './InvoicePrice.module.css';
import PriceRow from '../../components/PriceRow/PriceRow';

const useStyles = makeStyles((theme) => ({
  toolbars: theme.mixins.toolbar,
  contents: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1),
  },  
}));

const InvoicePrice = (props) => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [final, setFinal] = useState({
    totalTaxableAmt: 0.00,
    totalCGST: 0.00,
    totalSGST: 0.00,
    totalIGST: 0.00,
    totalSum: 0.00
  });

  //Setup initial state and other work
  useEffect(() => {
    setProducts(props.selectedProducts);
  },[]);

   //Display name change handler
   const displayNameChangeHandler = (value, id) => {
    const local_products = products;
    var index = local_products.findIndex((data) => data.id === id);
    local_products[index].productName = value;
    setProducts([...local_products]);
  };

   //Rate change handler
   const rateChangedHandler = (value, id) => {
    const local_products = products;
    var index = local_products.findIndex((data) => data.id === id);
    local_products[index].price = value;
    setProducts([...local_products]);
  };

  //Discount change handler
  const discountChangedHandler = (value, id) => {
    const local_products = products;
    var index = local_products.findIndex((data) => data.id === id);
    local_products[index].discount = value;
    setProducts([...local_products]);
  };

  //SGST change handler
  const sgstChangeHandler = (value, id) => {
    const local_products = products;
    var index = local_products.findIndex((data) => data.id === id);
    local_products[index].sgst = value;
    setProducts([...local_products]);
  };

  //IGST change handler
  const igstChangeHandler = (value, id) => {
    const local_products = products;
    var index = local_products.findIndex((data) => data.id === id);
    local_products[index].igst = value;
    setProducts([...local_products]);
  };

  //CGST change handler
  const cgstChangeHandler = (value, id) => {
    const local_products = products;
    var index = local_products.findIndex((data) => data.id === id);
    local_products[index].cgst = value;
    setProducts([...local_products]);
  }

  //Populate row list for each items
  var priceRowList = null;
  if(products.length > 0) {
    var a = 0;
    var b = 0;
    var c = 0;
    var d = 0;
    var e = 0;

    priceRowList = products.map((product, index) => {
      product.total = product.unit * product.price;
      product.discountAmt = parseFloat((product.discount/100)*product.total).toFixed(2);
      product.taxableAmt = parseFloat(product.total - product.discountAmt).toFixed(2);
      product.cgstAmt = parseFloat((product.cgst/100)*product.taxableAmt).toFixed(2);
      product.sgstAmt = parseFloat((product.sgst/100)*product.taxableAmt).toFixed(2);
      product.igstAmt = parseFloat((product.igst/100)*product.taxableAmt).toFixed(2);
      product.totalAmt = parseFloat(Number(product.taxableAmt) + Number(product.sgstAmt) + Number(product.cgstAmt) + Number(product.igstAmt)).toFixed(2);
      a = a + Number(product.taxableAmt);
      b = b + Number(product.cgstAmt);
      c = c + Number(product.sgstAmt);
      d = d + Number(product.igstAmt);
      e = e + Number(product.totalAmt);
      return (
        <PriceRow 
          product={product} 
          key={index} 
          nameChangedHandler={displayNameChangeHandler}
          rateChangedHandler={rateChangedHandler}
          discountChangedHandler={discountChangedHandler}
          cgstChangeHandler={cgstChangeHandler}
          sgstChangeHandler={sgstChangeHandler}
          igstChangeHandler={igstChangeHandler}/>
      );
    });

    final.totalTaxableAmt = parseFloat(a).toFixed(2);
    final.totalCGST = parseFloat(b).toFixed(2);
    final.totalSGST = parseFloat(c).toFixed(2);
    final.totalIGST = parseFloat(d).toFixed(2);
    final.totalSum = parseFloat(e).toFixed(2);
  };

  return(
    <div> 
      <Appbar /> 
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" />  

        <main className={classes.contents}>
        <div className={classes.toolbars} />
        <h4>INVOICE PRICE DETAILS</h4>
        <div className={Styles.priceContainer}>
          <br />
        <table className="table table-bordered table-striped">
          <thead className={Styles.header}>
            <tr className={Styles.trInvPrice}>
              <th className={Styles.thInvPrice} scope="col" rowSpan="2">Sl. No.</th>
              <th scope="col" rowSpan="2">Description of Goods</th>
              <th scope="col" rowSpan="2">Qty</th>
              <th scope="col" rowSpan="2">UOM</th>
              <th scope="col" rowSpan="2">Rate</th>
              <th scope="col" rowSpan="2">Total</th>
              <th scope="col" rowSpan="2">Discount %</th>
              <th scope="col" rowSpan="2">Discount Amount</th>
              <th scope="col" rowSpan="2">Taxable Value</th>
              <th scope="col" colSpan="2">CGST</th>
              <th scope="col" colSpan="2">SGST</th>
              <th scope="col" colSpan="2">IGST</th>
              <th scope="col" rowSpan="2">Total</th>
            </tr>
            <tr>
              <th scope="col">Rate</th>
              <th scope="col">Total</th>
              <th scope="col">Rate</th>
              <th scope="col">Total</th>
              <th scope="col">Rate</th>
              <th scope="col">Total</th>
            </tr>
          </thead>
          <tbody>
            {priceRowList}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>{final.totalTaxableAmt}</td>
              <td></td>
              <td>{final.totalCGST}</td>
              <td></td>
              <td>{final.totalSGST}</td>
              <td></td>
              <td>{final.totalIGST}</td>
              <td>{final.totalSum}</td>
            </tr>
          </tbody>
        </table>
        </div>
        </main>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    selectedProducts: state.selectedProducts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPriceUpdate: (products) => dispatch({type: 'UPDATE_PRICE_MODEL' , value: products}),
    onTotalUpdate: (final) => dispatch({type: 'UPDATE_TOTAL_PRICE' , value: final})
  };
}

export default connect(mapStateToProps , mapDispatchToProps)(InvoicePrice);