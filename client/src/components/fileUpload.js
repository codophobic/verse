import React, { Component } from 'react'
import './fileUpload.css';
import Axios from 'axios';
class FileUpload extends Component {


    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
      }

      maxSelectFile=(event)=>{
        let files = event.target.files // create file object
            if (files.length > 3) { 
               const msg = 'Only 3 images can be uploaded at a time'
               event.target.value = null // discard selected file
               alert(msg);
              return false;
     
          }
        return true;
     
     }

     checkMimeType=(event)=>{
        let files = event.target.files ;
        let err = '';
       const types = ['application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.template']
        for(var x = 0; x<files.length; x++) {
           console.log(files[x].type);
             if (types.every(type => files[x].type !== type)) {
             err = 'only doc,dot,doct or docx files are supported \n';
           }
         };
      
       if (err !== '') { // if message not same old that mean has error 
            event.target.value = null // discard selected file
            alert(err);
             return false; 
        }
       return true;
      
      }
      checkFileSize=(event)=>{
        let files = event.target.files
        let size = 15000 
        let err = ""; 
        for(var x = 0; x<files.length; x++) {
        if (files[x].size > size) {
         err ='File is too large, please pick a file less than 15KB\n';
       }
     };
     if (err !== '') {
        event.target.value = null
        alert(err);
        return false
   }
   
   return true;
   
   }
    
    onChangeHandler=(event)=>{
      
        var files = event.target.files
        if(this.maxSelectFile(event)&& this.checkMimeType(event) && this.checkFileSize(event)){ 
        // if return true allow to setState
           this.setState({
           selectedFile: files
        })
     }
    }
    onClickHandler = () => {
        const data = new FormData() ;
        console.log(this.state);

        if(this.state.selectedFile===null)
        return alert('Please select files');
        for(var x = 0; x<this.state.selectedFile.length; x++) {
            data.append('file', this.state.selectedFile[x])
        }

        Axios.post('user/upload',data,{

        }).then(res=>{
            console.log(res);
            this.setState({
                selectedFile:null
            });
            alert('File uploaded')
            document.getElementById('fileinput').value=null;
        })
    }
    
    
    render() {
       
       
       
       
        return (
            


    <div>
      {/* Hello world */}
      <div className="container" style={{marginBottom:'20px'}}>
        <div className="row">
            <div className='col-md-3 col-sm-3'></div>
          <div className="col-md-6">
            <form >
              <div className="form-group files color">
                <label>Upload Your File </label>
                <input accept=".txt,.docx" id='fileinput' onChange={this.onChangeHandler} multiple type="file" className="form-control"/>
              </div>
            </form>
            <button className='btn btn-success btn-block' onClick={this.onClickHandler}>Upload</button>
          </div>
        </div>
      </div>
    </div>
        )
    }
}

export default FileUpload;