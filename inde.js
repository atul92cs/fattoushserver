var express = require('express');
var bodyparser=require('body-parser');
var mysql=require('mysql');

var db =mysql.createConnection({
      host:'trial.cpaoqpenaokn.us-east-2.rds.amazonaws.com',
	  user:'admin',
	  password:'savita92',
	  database:'fattoush'
	  
});
