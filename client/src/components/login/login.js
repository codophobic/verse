import React, { Component } from 'react';
import Axios from 'axios';
import ACTIONS from '../../redux/actions';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class Login extends Component {
     
    constructor(){
        super();
        this.state={
            email:'',
            password:''
        };
    }

     onLogin=(e)=>{
         e.preventDefault();
         const user={
             email:this.state.email,
             password:this.state.password
         };
               
         this.setState({
             email:'',
             password:''
         });
         console.log(user);
       Axios.post('/user/login',user).then(res=>{
               console.log(res.data);
                   this.props.updateUser(res.data.user);
                   console.log(res.data.isAuthenticated);
                   this.props.updateisauthenticated(res.data.isAuthenticated);
                   this.props.history.push('/');
               })
           .catch(err=>{
            const user={ isAuthenticated : false, user : {email : "",name : ""}};
            this.props.updateUser(user.user);
            this.props.updateisauthenticated(user.isAuthenticated);
           alert('Inavlid credentials');
       })
    }
    render() {
        return (
       <div style={{alignItems:'center'}}>
           <h2>Login</h2>
           <form onSubmit={this.onLogin}>
  <div className="form-group">
    <label >Email address</label>
    <input onChange={(e)=>{
    this.setState({
        ...this.state,
        email:e.target.value
    })
    }} value={this.state.email} required type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label >Password</label>
    <input onChange={(e)=>{
        this.setState({
            ...this.state,
            password:e.target.value
        })
    }} value={this.state.password} required type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
 </form>
       </div>
     );
 }}
        

 const mapStateToProps = state => ({
    user: state.user,
    isAuthenticated:state.isAuthenticated,
  });
  
  const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(ACTIONS.updateUser(user)),
    updateisauthenticated: val => dispatch(ACTIONS.updateIsauthenticated(val))
  });

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Login));
