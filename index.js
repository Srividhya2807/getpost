var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require("body-parser");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Demo'
});
var app = express();
app.use(require('express-domain-middleware'));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
connection.connect(function(err){
if(!err) {
    console.log("Database is connected ... nn");    
} else {
    console.log("Error connecting database ... nn");    
}
});

app.get("/vignesh",function(req,res){
connection.query('SELECT * from MyTable', function(err, rows, fields) {
connection.end();
  if (!err){
    // console.log('The solution is: ', fields);
    res.json(rows);
  }
  else{
    console.log('Error while performing Query.');
  }
  });
});

app.post("/vigneshsave",function(req,res){
  console.log(req.body);
  var post={
	   E_Id : req.body.E_Id,
	   E_Name : req.body.E_Name,
	   Designation : req.body.Designation,
	   Salary : req.body.Salary
	  
  };
connection.query('insert into MyTable set?', post, function(err) {
connection.end();
   if (error) {
           console.log(error.message);
       } else {
           console.log('success');    
       }
   });
   res.send('success');
});


app.listen(3000);

