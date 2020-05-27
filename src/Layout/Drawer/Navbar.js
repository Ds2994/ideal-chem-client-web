import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link, Route, Switch } from 'react-router-dom';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ViewListIcon from '@material-ui/icons/ViewList';
import HomeIcon from '@material-ui/icons/Home';
import CustomerHome from '../../containers/CustomerHome/CustomerHome';
import CustomerCreate from '../../containers/CustomerCreate/CustomerCreate';
import InvoiceHome from '../../containers/InvoiceHome/InvoiceHome';

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
    const [body, setBody] = useState(<h1>Hello World</h1>);
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
                  <Link to="/" style={{ textDecoration: 'none'}}>
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
          </Switch>
        </main>
    </div>
    );
}

export default Navbar;