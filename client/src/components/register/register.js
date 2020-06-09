import React, { Component } from 'react';
import ACTIONS from '../../redux/actions';

import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'

class Register extends Component {
     
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            name:''
        };
    };

     onRegister=(e)=>{
         e.preventDefault();
         const user={
             email:this.state.email,
             password:this.state.password,
             name:this.state.name
         };
             console.log(user);  
         this.setState({
             email:'',
             password:'',
             name:''
         });
    //    Axios.post('/user/register',user).then(res=>{
    //            console.log(res.data);
    //             this.props.history.push('/login');
    //            })
    //        .catch(err=>{
    //         console.log(err);
    //         if(err.status===400)
    //        alert('Email exists');
    //    })

    fetch('/user/register',{
        method : "post",
        body : JSON.stringify(user),
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(res => 
        {
            if(res.status!==200)
            {
        res.json().
        then(data =>{ 
            alert(data.message.msgBody);
        console.log(data)})
            }
            else{
                this.props.history.push('/login');
            }
        })
      
    }
    render() {
        return (
       <div style={{alignItems:'center'}}>
           <h2>SignUp</h2>
           <form onSubmit={this.onRegister}>
           <div className="form-group">
    <label >Name</label>
    <input onChange={(e)=>{
    this.setState({
        ...this.state,
        name:e.target.value
    })
    }} value={this.state.name} required type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name"/>
    
  </div>           
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

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Register));
