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
	/* code to create to add product */
	var name =req.body.name;
	var cost =req.body.cost;
	var picture=req.body.picture;
	var category=req.body.category;
	var diet=req.body.diet;
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
app.get('/getProducts/:category',function(req,res){
	/*code to disply products*/
	var category=req.params.category;
	let sql='SELECT product_name,product_cost,product_category,product_diet FROM products WHERE product_category=?';
	let query=db.query(sql,[category],function(err,rows,fields){
		
		if(!err)
		{
			var response =[];
			if(rows.length!=0)
			{
				for(var i=0;i<rows.length;i++)
				{
					/*var row = rows[i];*/
					var name=rows[i].product_name;
					var cost=rows[i].product_cost;
					var category=rows[i].product_category;
					var diet=rows[i].product_diet;
					response.push({name,cost,category,diet});
				}
				
			}
			else
			{
				response.push({'response':'no data found'});
				
			}
			res.json({response});
		}
		else
		{
			res.status(404).send('error occured');
		}
		
	});
});
app.get('/getCategory',function(req,res){
	let sql='SELECT DISTINCT product_category FROM products';
	let query=db.query(sql,function(err,rows,fields){
		if(!err)
		{
			var response =[];
			if(rows.length!=0)
			{
				for(i=0;i<rows.length;i++)
				{
					var name =rows[i].product_category;
					response.push({name});
				}
				
			}
			else
			{
				response.push({'response':'no data found'});
				
			}
			res.json({response});
		}
		else
		{
			res.status(404).send('error occured');
		}
		
	});
});
app.get('/orderDetails/:contact',function(req,res){
	/*fetching order details to display it to user*/
	var contact = req.params.contact;
	let sql ="SELECT MAX(order_id) FROM orders WHERE user_contact =?";
	let query=db.query(sql,[contact],function(err,rows,fields){
		if(!err)
		{
			var response=[];
			if(rows.length!=0)
			{
				response.push({rows});
			}
			else
			{
				response.push({'response':'no data found '});
			}
			res.json(response);
		}
		else
		{
			res.status(400).send('error occured');
		}
	});
});
app.put('/updateOrder/:orderid',function(req,res){
	/*code to update the order status*/
	var orderid=req.params.orderid;
	var status='delivered';
	let sql='UPDATE orders SET order_status = ? WHERE order_id=?';
	let query=db.query(sql,[status,orderid],function(err,rows){
		if(err)
		{
			console.log(err);
		}
		res.send('Order delivered').status(200);
	});
});
app.listen(port,function(){
	
	console.log('server started on 80');
});	