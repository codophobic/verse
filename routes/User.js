const express = require('express');

const userRouter = express.Router();

const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');

const signToken = userId=>{
    return JWT.sign({
        iss:'ankit',
        sub:userId
    },"verse",{expiresIn:'1h'});
}


userRouter.post('/register',async (req,res)=>{
    const { email,name,password } = req.body;
    await User.findOne({email},(err,user)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        if(user)
            res.status(400).json({message : {msgBody : "Email already exists", msgError: true}});
        else{
            const newUser = new User({email,name,password});
             newUser.save(err=>{
                if(err)
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                else
                    res.status(200).json({message : {msgBody : "Account successfully created", msgError: false}});
            });
        }
    });
});



userRouter.post('/login',passport.authenticate('local',{session : false}),(req,res)=>{
    if(req.isAuthenticated()){
       const {_id,name,email} = req.user;
       const token = signToken(_id);
       res.cookie('access_token',token,{httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true,user : {name,email}});
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.clearCookie('access_token');
    res.json({user:{email:"",name:""},success:true});
})

userRouter.post('/newNote',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const note = req.body.note;
    //console.log(req.body);
    const {notes}= req.user;
    const newNotes = [...notes,note];
    req.user.notes= newNotes;
        req.user.save(err=>{
            if(err)
            res.status(500).json({message:{msgBody:'err occured',msgError:true}});
            else
            {
                res.status(200).json({message:'notes uploaded'});
                console.log(req.user);
            } 
        })

});

userRouter.get('/getNotes',passport.authenticate('jwt',{session:false}),(req,res)=>{
   User.findOne({_id:req.user._id},(err,doc)=>{
       if(err)
       res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
       else{
           res.status(200).json({notes:doc.notes,authenticated:true});
       }

   })
});

userRouter.delete('/deleteNote',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const index= req.body.index;
    const curNotes = req.user.notes;
    curNotes.splice(index,1);
    req.user.notes= curNotes;

    req.user.save(err=>{
        if(err)
        res.status(500).json({message:{msgBody:'err occured',msgError:true}});
        else
        {
            res.status(200).json({message:'note deleted'});
            console.log(req.user);
        } 
    })


});

userRouter.patch('/editNote',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const index= req.body.index;
    const note = req.body.note;

    const curNotes= req.user.notes;
    curNotes[index]= note;
    const {_id} = req.user;

    User.findOne({_id:_id},(err,doc)=>{
        if(err)
        console.log(err);
        else{
            doc.notes.index= note
            console.log(doc);
            doc.save();
        }
    })
    // console.log(curNotes);

    // req.user.notes= curNotes;

    // req.user.save(err=>{
    //     if(err)
    //     res.status(500).json({message:{msgBody:'err occured',msgError:true}});
    //     else
    //     {
    //         res.status(200).json({message:'note edited'});
    //         console.log(req.user);
    //     } 
    // })
    

});

userRouter.get('/authenticated',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const {email,name}= req.user;
    res.status(200).json({isAuthenticated:true,user:{email,name}});
})

module.exports= userRouter;