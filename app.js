const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

//app config
const URI = 'mongodb://Jacob:password@ds239047.mlab.com:39047/octagon'
mongoose.connect(URI || "mongodb://localhost/form");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose/model config
var formSchema = new mongoose.Schema({
  first: String,
  last: String,
  email: String,
  zip: String,
  state: String,
  created: {type: Date, default: Date.now}
});
var Form = mongoose.model("Form", formSchema)

//Restful Routes
app.get('/', function(req,res){
  res.redirect('/home')
})

app.get('/home', function(req,res){
  res.render('index')
});

app.get('/form', function(req,res){
  res.render('form')
})

app.post('/form', function(req,res){
  Form.create(req.body.form, function(err, newForm){
    if(err){
      console.log(err)
    } else {
      res.redirect('/home')
    }
  })
})

app.listen(process.env.PORT || 8080, function(){
  console.log("Running on port 8080")
})
