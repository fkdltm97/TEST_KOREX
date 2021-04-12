var http=require('http');
var express=require('express');
var fs=require('fs');
var ejs=require('ejs');

var app=express();
var server=http.createServer(app);

app.use(express.static(__dirname+"../public"));

app.get('/',function(request,response){
    fs.readFile('../views/first_ejs.ejs','utf-8',function(err,data){
        response.writeHead(200,{"Content-Type":"text/html"});
        response.end(ejs.render(data,{
            name:'EJS PAGE',
            description:'hello ejs with node.js'
        }));
    });
});

server.listen(8888,function(){
    console.log('888888 8 sgsgsggogoo web server ');
});
