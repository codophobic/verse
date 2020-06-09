import React, { Component } from 'react';
import ACTIONS from '../../redux/actions';
import classes from './home.module.css';
import {connect} from 'react-redux';
import Axios from 'axios';


 class Home extends Component {
constructor(){
    super();
    this.state={
        note:'',
        notes:[],
        reload:1
    };
} 
sumbithandler=(e)=>{
    e.preventDefault();
    Axios.post('/user/newNote',{note:this.state.note}).then(res=>{
        console.log(res);
        // const notesArray = this.state.notes;
        // notesArray.push(this.state.note);
        // this.setState({
        //     ...this.state,
        //     notes:notesArray
        // })
        this.setState({
            ...this.state,
            note:'',
            reload:this.state.reload===1?0:1
        });
    }).catch(err=>{
        console.log(err);
    })
}
    
componentDidMount=()=>{
   Axios.get('/user/getNotes').then(res=>{
       console.log(res);
       this.setState({
           ...this.state,
           notes:res.data.notes
       });
      console.log(this.state);
   }).catch(err=>{
       console.log(err);
   })
}

componentDidUpdate=(prevprops,prevstate)=>{
  if(prevstate.reload!==this.state.reload)
  {
    Axios.get('/user/getNotes').then(res=>{
        //console.log(res);
        this.setState({
            ...this.state,
            notes:res.data.notes
        });
       //console.log(this.state);
    }).catch(err=>{
        console.log(err);
    })
  }
}
onDelete=(index)=>{
    console.log(index);
    Axios.delete('/user/deleteNote',{index:index}).then(res=>{
        console.log(res);
        this.setState({
            ...this.state,
            reload:this.state.reload===1?0:1
        });
    })
}

onEdit= (index)=>{
    console.log(index + this.state.notes[index]);

    //  this.setState({
    //      ...this.state,
    //      reload:this.state.reload===0?1:0
    //  });
}

    render() {

        const allNotes= this.state.notes.map((el,index)=>{
            return(
                <div key={index} className='row block-margin' style={{border:'2px solid black',marginBottom:'10px',marginLeft:'195px',display:'inline-block',width:'70%',background:'#f2f2f2'}}>
                  <div className='col-sm-8 col-md-9 col-lg-9'>
                 <div style={{marginLeft:'30px',color:'red',fontSize:'15px',fontWeight:'500',marginTop:'10px'}}>{el}</div>
                 <hr/>
                 </div>
               <div className='col-sm-4 col-md-3 col-lg-3'>
                   <div style={{marginTop:'20px'}}>
                   <button onClick={()=>{this.onEdit(index)}} className={classes.btn1}>Edit</button>
                   <button onClick={()=>{this.onDelete(index)}} className={classes.btn1}>Delete</button>
                   </div>
               </div>
              </div>
            )
        })
        
     



        return (
            <div className='container-fluid '>
                     <div className={classes.heading}>
                           Welcome {this.props.user.name},you can create your notes here.
                     </div>

                   
                   <div className={classes.form}>
                        <form onSubmit={this.sumbithandler}>
                            <br/>
                            <textarea value={this.state.note} onChange={(e)=>{
                                this.setState({
                                    ...this.state,
                                    note:e.target.value
                                })
                            }} placeholder='write your note' rows="5" cols="70" maxLength='200' required></textarea>
                            <br/>
                            <br/>
                            <button className={classes.btn} >Create Note</button>
                            
                        </form>
                   </div>


                    <div className='container-fluid'>
                        {allNotes}
                    </div>


                   </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
    isAuthenticated:state.isAuthenticated,
  });
  
  const mapDispatchToProps = dispatch => ({
    updateUser: user => dispatch(ACTIONS.updateUser(user)),
    updateisauthenticated: val => dispatch(ACTIONS.updateIsauthenticated(val)),

  });
export default connect(mapStateToProps,mapDispatchToProps)(Home);