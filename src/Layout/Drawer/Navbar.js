import React from 'react';

import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import HomeIcon from '@material-ui/icons/Home';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import ViewListIcon from '@material-ui/icons/ViewList';
import { Link, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InvoiceHome from '../../containers/InvoiceHome/InvoiceHome';
import CustomerHome from '../../containers/CustomerHome/CustomerHome';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ProductSearch from '../../containers/ProductSearch/ProductSearch';
import CustomerCreate from '../../containers/CustomerCreate/CustomerCreate';
import InvoicePrice from '../../containers/InvoicePrice/InvoicePrice';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Navbar = () => {
    const classes = useStyles();

    return(
    <div className={classes.root}>
        <CssBaseline />
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left">
            <div className={classes.toolbar} />
            <Divider />
                <List>
                  <Link to="/invoice/price" style={{ textDecoration: 'none'}}>
                    <ListItem button key="Dashboard">
                        <ListItemIcon><HomeIcon color="primary"/></ListItemIcon>
                        <ListItemText primary="Dashboard" color="primary"/>
                    </ListItem>
                  </Link>
                  <Link to="/customer" style={{ textDecoration: 'none'}}>
                      <ListItem button key="Customer">
                          <ListItemIcon><PeopleAltRoundedIcon color="primary"/></ListItemIcon>
                          <ListItemText primary="Customer" color="primary"/>
                      </ListItem>
                   </Link>
                   <Link to="/invoice" style={{ textDecoration: 'none'}}>
                      <ListItem button key="Invoice">
                          <ListItemIcon><ViewListIcon color="primary"/></ListItemIcon>
                          <ListItemText primary="Invoice" color="primary"/>
                      </ListItem>
                    </Link>
                </List> 
            <Divider />
        </Drawer>
         
        <main className={classes.content}>
          <Switch>
            <Route exact path="/customer" component={CustomerHome} />
            <Route exact path="/customer/create" component={CustomerCreate} />
            <Route exact path="/invoice" component={InvoiceHome} />
            <Route exact path="/invoice/product" component={ProductSearch} />
            <Route exact path="/invoice/price" component={InvoicePrice} />
          </Switch>
        </main>
    </div>
    );
}

export default Navbar;