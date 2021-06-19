var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
const cors = require('cors');
const dotenv = require('dotenv')
//var logger = require('morgan');
//var connection = require('./connection.js');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })


var app = express();


//app.use(logger('dev'));
app.use(express.json());



//CROS VALIDATION HTTP HTTPS

app.use(cors());
const courseRoute = require('./Routes/courses') 
const authRoute = require('./Routes/auth') 
const userRoute = require('./Routes/users') 
const formateurRoute = require('./Routes/formateur') 
//app.use('/', indexRouter);

app.use('/courses',courseRoute)
app.use('/formateur',formateurRoute)
app.use('/auth', authRoute)
app.use('/user', userRoute)

app.use('/uploadsFolder', express.static(path.join(__dirname, '/uploads')));


//connection()
mongoose.connect('DB_CONNECTION=mongodb://localhost:27017/firas', {useNewUrlParser: true},
()=>{ console.log("connected to db")})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
const port = 8000
app.listen(port, () => console.log(`server started on port${port}`))
module.exports = app;
