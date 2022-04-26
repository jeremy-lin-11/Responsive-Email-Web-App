import React from 'react';
import loader from './data/loader';
import EmailList from './EmailList';
// import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import {useState, useEffect} from 'react';

loader(); // do not remove this!
loader(); // do not remove this!

// App.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

const drawerWidth = 160;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 101,
    position: 'fixed',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
}));

// Based on:
// https://mui.com/components/drawers/#ResponsiveDrawer.js

/**
 * Simple component with no state.
 *
 * See the basic-react example for an example of adding and reacting to
 * changes in state and lecture 10 for details on Material-UI
 * @return {object} JSX
 */
function App() {
  // dimension stuff taken from sample code
  const winDims = () => ({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  const [dimensions, setDimensions] = useState(winDims);
  useEffect(() => {
    const handleResize = () => {
      setDimensions(winDims);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const width = dimensions;
  // console.log(width.width);
  const classes = useStyles();
  // const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  let [mailbox, setMailbox] = React.useState('Inbox');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMailToggle = (text) => {
    mailbox = text;
    setMailbox(mailbox);
  };

  const drawerContent = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['Inbox', 'Trash'].map((text, index) => (
          <ListItem button onClick={()=>{
            handleMailToggle(text);
            handleDrawerToggle();
          }} key={text}>
            <ListItemIcon>
              {index % 2 === 0 ?
                <InboxIcon />:
                <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window.document.body;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            role= 'button'
            aria-label='toggle drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            CSE183 Mail - {mailbox}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {width.width < 600 ?
          <Drawer
            container={container}
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
              // hideBackdrop: true,
            }}
            BackdropProps= {{
              invisible: true,
            }}>
            {drawerContent}
          </Drawer> : <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open>
            {drawerContent}
          </Drawer>}
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <EmailList mailboxprop={mailbox}/>
      </main>
    </div>
  );
}
export default App;
