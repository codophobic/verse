import React,{Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ACTIONS from './redux/actions';
import Login from './components/login/login';
import Register from './components/register/register';
import Home from './components/home/home';
import Nav from './components/nav';

import {BrowserRouter,Route,Switch,Link} from 'react-router-dom'

class App extends Component {

  componentDidMount=()=>{
    axios.get('/user/authenticated').then(res=>{
     console.log(res);
     this.props.updateUser(res.data.user);
     this.props.updateisauthenticated(res.data.isAuthenticated);
       
          
    }).catch(err=>{
      console.log(err);
      const user={ isAuthenticated : false, user : {email : "",name : ""}};
      this.props.updateUser(user.user);
      this.props.updateisauthenticated(user.isAuthenticated);
           console.log(user);
    })
  }
  render(){
  return (
    <BrowserRouter >
     <div  style={{margin:'0px'}}className='container-fluid'>
     <Nav/>
    <Switch>
        {this.props.isAuthenticated&&
          <Route path='/' component={Home}/>
          }
          <Route path='/register' component={Register} exact/>
        <Route path='/' component={Login} />
        
    </Switch>
    </div>
  
    </BrowserRouter>
  );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  isAuthenticated:state.isAuthenticated,
});

const mapDispatchToProps = dispatch => ({
  updateUser: user => dispatch(ACTIONS.updateUser(user)),
  updateisauthenticated: val => dispatch(ACTIONS.updateIsauthenticated(val))
});

export default connect(mapStateToProps,mapDispatchToProps)(App);
