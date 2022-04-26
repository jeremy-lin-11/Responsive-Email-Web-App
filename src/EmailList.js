import React from 'react';
import emails from './data/emails.json';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {ListItemText} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import {useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

// import Modal from '@material-ui/core/Modal';
// import Slide from '@material-ui/core/Slide';
// import Dialog from '@material-ui/core/Dialog';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  table: {
    // minWidth: 200,
  },
  closeButton: {
    marginRight: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  paperOn: {
    display: 'flex',
    position: 'fixed',
    zIndex: 10000,
    bottom: 0,
    // width: '85%',
    height: '50%',
    minWidth: 'calc(100% - 160)',
    // justifyContent: 'center',
    // alignItems: 'flex-end',
    flexWrap: 'nowrap',
    flexFlow: 'column wrap',
    flexGrow: 1,
    overflow: 'auto',
    // zIndex: 100,
    // backgroundColor: 'white',
    // width: 600,
    // boxShadow: theme.shadows[5],
    // maxWidth: calc(100% - 80 px),
    // maxHeight: calc(100% - 80 px),
    [theme.breakpoints.down('xs')]: {
      height: '100%',
      width: '100%',
    },
  },
  paperOff: {
    display: 'none',
  },
  content: {
    padding: theme.spacing(1),
    marginRight: theme.spacing(3),
  },
}));

/**
 * Simple component with no state.
 *
 * See the basic-react example for an example of adding and reacting to
 * changes in state and lecture 10 for details on Material-UI
 * @param {object} props
 * @return {object} JSX
 */
function EmailList(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(classes.paperOff);
  const [date, setDate] = React.useState('');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [content, setContent] = React.useState('');
  const [name2, setName2] = React.useState('');
  const [email2, setEmail2] = React.useState('');

  const handleClickOpen = (email) => {
    // console.log(email);
    setDate(email.received);
    setName(email.from.name);
    setEmail(email.from.email);
    setSubject(email.subject);
    setContent(email.content);
    setName2(email.to.name);
    setEmail2(email.to.email);
    setOpen(classes.paperOn);
  };

  const handleClose = () => {
    setOpen(classes.paperOff);
  };
  // window.addEventListener('keydown', function(e) {
  //   // console.log('pressed keydown' + e.code);
  //   if (e.code === 'Escape') {
  //     handleClose();
  //   }
  // });

  return (
    <ClickAwayListener onClickAway={handleClose} >
      <div className={classes.root} >
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableBody>
              {emails.filter(function(email) {
                if (email.mailbox === props.mailboxprop.toLowerCase()) {
                  return true;
                } else {
                  return false;
                }
              }).sort(function(email1, email2) {
                // https://developer.mozilla.org/
                // en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                const date1 = receievedToDate(email1.received);
                const date2 = receievedToDate(email2.received);
                return date2.getTime() - date1.getTime();
                // if (date1 < date2) {
                //   return 1;
                // } else if (date1 > date2) {
                //   return -1;
                // }
                // return 0;
                // use get time() 1970?
              }).map((email) => (
                <TableRow key={email.id}
                  onClick={(e) => handleClickOpen(email)}
                  role='button'>
                  <TableCell component='th' scope='row'>
                    <List>
                      <ListItem>
                        <ListItemText primary={email.from.name}
                          secondary={email.subject}
                          role='button'/>
                      </ListItem>
                    </List>
                  </TableCell>
                  <TableCell align='right'>{parseDate(email.received)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Paper className={open}>
          <AppBar position='static'>
            <Toolbar>
              <Typography variant='h6' className={classes.title}>
                {subject}
              </Typography>
              <IconButton
              // autoFocus
                onClick={handleClose}
                className={classes.iconButton}
                color='inherit'
                aria-label='close desktop reader'
              >
                <CloseIcon />
              </IconButton>
              <IconButton
              // autoFocus
                onClick={handleClose}
                className={classes.iconButton}
                color='inherit'
                aria-label='close mobile reader'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Typography className={classes.content}>
            From: {name} ({email})
          </Typography>
          <Typography className={classes.content}>
            To: {name2} ({email2})
          </Typography>
          <Typography className={classes.content}>
            Subject: {subject}
          </Typography>
          <Typography className={classes.content}>
            Received: {printDate(date)}
          </Typography>
          <Typography className={classes.content}>
            {content}
          </Typography>
        </Paper>
      </div>
    </ClickAwayListener>
  );
}
/**
 * @param {*} dateInput
 * @return {string}
 */
function printDate(dateInput) {
  const months = [
    'January', 'February', 'March', 'April', ' May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const re = /\D/gm;
  const dateArr = dateInput.split(re);
  const year = dateArr[0];
  const month = dateArr[1] - 1;
  const day = dateArr[2];
  const hour = dateArr[3];
  const min = dateArr[4];
  const date = months[month] + ' ' + day + ', ' + year +
  ' @ ' + hour + ':' + min;
  return date;
}
/**
 *
 * @param {*} dateInput
 * @return {string} displayedDate
 */
function parseDate(dateInput) {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', ' May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  let displayedDate = '';
  const date = receievedToDate(dateInput);
  const today = new Date();
  // console.log(monthDiff(date, today));
  // console.log(dayDiff(new Date(2000, 6, 22), today));
  if (dayDiff(date, today) > 365) {
    displayedDate = date.getFullYear();
    return displayedDate;
  } else if (date.getFullYear() === today.getFullYear() &&
  date.getMonth() === today.getMonth() &&
  date.getDate() === today.getDate()) {
    // if (date.getHours() < 10) {
      displayedDate = '0' + date.getHours() + ':' + date.getMinutes();
    // }
    // } else {
    //   displayedDate = date.getHours() + ':' + date.getMinutes();
    // }
    return displayedDate;
  } else {
    if (date.getDate() < 10) {
      displayedDate = months[date.getMonth()] + ' 0' + date.getDate();
    } else {
      displayedDate = months[date.getMonth()] + ' ' + date.getDate();
    }
    return displayedDate;
  }
}

/**
 * taken from https://stackoverflow.com/
 * questions/4944750/how-to-subtract-date-time-in-javascript
 * @param {*} d1
 * @param {*} d2
 * @return {*} # of days between two dates
 */
function dayDiff(d1, d2) {
  const milliSecDiff = Math.abs(d1-d2);
  const dayDiff = milliSecDiff / (1000 * 60 * 60 * 24);
  return dayDiff;
}


/**
 * @param {*} dateInput
 * @return {Object} date
 */
function receievedToDate(dateInput) {
  // const re = /\D/gm;
  // const dateArr = dateInput.split(re);
  // const year = dateArr[0];
  // const month = dateArr[1] - 1;
  // const day = dateArr[2];
  // const hour = dateArr[3];
  // const min = dateArr[4];
  // const sec = dateArr[5];
  // const date = new Date(year, month, day, hour, min, sec);
  const date = new Date(dateInput);
  return date;
}

export default EmailList;
