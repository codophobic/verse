import React, { Component } from 'react'
import classes from '../home/home';
import Axios from 'axios';
import { withRouter} from 'react-router-dom';
class Edit extends Component {

    constructor(){
        super();
        this.state={
            note:''
        }
    }
    componentDidMount=()=>{
        console.log(this.props.location.state);
        this.setState({
            ...this.state,
            note:this.props.location.state.note
        });
    }

    sumbithandler=(e)=>{
        e.preventDefault();
        Axios.patch('/user/editNote',{note:this.state.note,index:this.props.location.state.index})
        .then(res=>{
            this.props.history.push({
                pathname:'/',
                state:{
                    reload:true
                }
            });
            console.log(res);
        }).catch(err=>{
            console.log(err);
                })
    }
    render() {
       //console.log( this.props.location.state.note);
        return (

                   
                   <div className={classes.form}>
                        <form onSubmit={this.sumbithandler}>
                            <br/>
                            <textarea value={this.state.note} onChange={(e)=>{
                                this.setState({
                                    ...this.state,
                                    note:e.target.value
                                })
                            }} placeholder='edit your note' rows="5" cols="70" maxLength='200' required></textarea>
                            <br/>
                            <br/>
                            <button className={classes.btn} >Edit Note</button>
                            
                        </form>
                   </div>
        )
    }
}

export default withRouter(Edit);
