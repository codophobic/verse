const express= require('express');
const app =express();
const cookieParser= require('cookie-parser');
const mongoose = require('mongoose');
const config = require("./config/key");
const cors = require('cors');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.connect(config.mongoURI,
    {
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex: true, useFindAndModify: false
    })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));



    const userRouter = require('./routes/User');
    app.use('/user',userRouter);

    


    const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log('Listening at '+port);
});

