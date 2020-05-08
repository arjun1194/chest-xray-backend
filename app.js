const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./config/db');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resultRouter = require('./routes/result');



app.use(cors());

//Models
require('./models/index');
db.sync();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());



//API Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/results', resultRouter);


app.use((req,res,next)=>{
   const err = new Error('Not Found');
   err.status = 404;
   next(err);
});

app.use((error,req,res,next)=>{
   res.status(error.status||500).json({err:error,status:error.status,success:false})
});

module.exports = app;
