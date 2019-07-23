import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Link from '@material-ui/core/Link';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  align: {
    textAlign: 'center',
  },
}));

export default function HeaderBar() {

  const classes = useStyles();
  const [open, setOpen] = useState(false); 

  const aboutOpen = () => {
    setOpen(true);
  };

  const aboutClose = () => {
    setOpen(false);
  };    

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar> 
          <Button onClick={aboutOpen} color="inherit">About</Button>          
        </Toolbar>
      </AppBar>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={aboutClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Project made by Aleksandr Gribko"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" className={classes.align}>
            Used tools: React, material ui <br />
            Will be happy to work with you <br />
            <Link
              href='https://agribko.netlify.com/'
              variant="body2"              
            >
              Visit my Portfolio/CV website
            </Link>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={aboutClose} color="primary">
            Good work, Aleks
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
