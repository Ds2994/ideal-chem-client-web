import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ViewListIcon from '@material-ui/icons/ViewList';
import HomeIcon from '@material-ui/icons/Home';

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
    padding: theme.spacing(2),
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
                    <ListItem button key="Dashboard" onClick={() => setBody(<h1>Dashboard!!!</h1>)}>
                        <ListItemIcon><HomeIcon color="primary"/></ListItemIcon>
                        <ListItemText primary="Dashboard" color="primary"/>
                    </ListItem>
                    <ListItem button key="Customer" onClick={() => setBody(<h1>Customer!!!</h1>)}>
                        <ListItemIcon><PeopleAltRoundedIcon color="primary"/></ListItemIcon>
                        <ListItemText primary="Customer" color="primary"/>
                    </ListItem>
                    <ListItem button key="Invoices" onClick={() => setBody(<h1>Invoice!!!</h1>)}>
                        <ListItemIcon><ViewListIcon color="primary"/></ListItemIcon>
                        <ListItemText primary="Invoices" color="primary"/>
                    </ListItem>
                </List> 
            <Divider />
        </Drawer>
        <main className={classes.content}>
            {body}
        </main>
        </div>
    );
}

export default Navbar;