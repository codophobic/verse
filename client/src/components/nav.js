import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Axios from 'axios';
import ACTIONS from '../redux/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();

  const onLogout=()=>{
  console.log('logout');
  Axios.get('/user/logout').then(res=>{
    console.log(res.data);
    const user={ isAuthenticated : false, user : {email : "",name : ""}};
      props.updateUser(user.user);
      props.updateisauthenticated(user.isAuthenticated);
    props.history.push('/login');
  }).catch(err=>{
    console.log(err);
  })
  }

  const onSignin=()=>{
   props.history.push('/login');
  }
  const onSignup=()=>{
    props.history.push('/register');
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome
          </Typography>
          {props.isAuthenticated &&
          <Button color="inherit" onClick={onLogout}>Logout</Button>}
          {
              !props.isAuthenticated &&
              <div>
              <Button color="inherit" onClick={onSignin}>Signin</Button>
              <Button color="inherit" onClick={onSignup}>Signup</Button>
                </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated:state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(ACTIONS.updateUser(user)),
  updateisauthenticated: val => dispatch(ACTIONS.updateIsauthenticated(val))
});
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(ButtonAppBar));