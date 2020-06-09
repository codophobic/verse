const express= require('express');
const app =express();
const cookieParser= require('cookie-parser');
const mongoose = require('mongoose');
const config = require("./config/key");

app.use(cookieParser());
app.use(express.json());

mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

    // const User = require('./models/User');
    // const det={
    //     email:"k",
    //     password:"1234567",
    //     name:"ank"
    // };

    // const newUser= new User(det);
    // newUser.save((err,doc)=>{
    //     if(err)
    //     console.log(err);

    //     console.log(doc);
    // })


    const userRouter = require('./routes/User');
    app.use('/user',userRouter);

    


    const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('Listening at '+port);
});

