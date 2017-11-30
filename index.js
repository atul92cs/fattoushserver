var express = require('express');
var bodyparser=require('body-parser');
var mysql=require('mysql');

var db =mysql.createConnection({
      host:'trial.cpaoqpenaokn.us-east-2.rds.amazonaws.com',
	  user:'admin',
	  password:'savita92',
	  database:'fattoush'
	  
});

db.connect((error)=>{
	if(error) throw error;
	
	console.log('Database connected');
});
var port =process.env.PORT||8080;
var app =express();
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.post('/addProduct',function(req,res){
	var name =req.body.name;
	var cost =req.body.cost;
	var picture=req.body.picture,
	var category=req.body.categroy,
	var diet=req.body.diet
	let body={product_name:name,product_cost:cost,product_picture:picture,product_category:category,product_diet:diet};
	let sql='INSERT INTO products SET ?';
	let query=db.query(sql,body,(err,result)=>{
		if(err)throw err;
		res.send('Product Added');
	});
});
app.post('/createOrder',function(req,res){
	/*code to create final order */
	var name=req.body.name;
	var summary=req.body.summary;
	var cost=req.body.cost;
	var date=req.body.date;
	var contact=req.body.contact;
	var address=req.body.address;
	var status='placed';
    let body={order_summary:summary,order_cost:cost,order_date:date,user_contact:contact,user_name:name,order_address:address,order_status:status};
	let sql='INSERT INTO orders SET ?';
	let query=db.query(sql,body,(err,result)=>
	{
		if(err)throw err;
		res.send('Order placed');
	}
	 );
	});
app.post('/',function(req,res){
	res.send('appworks');
});
app.listen(port,function(){
	
	console.log('server started on 80');
});	