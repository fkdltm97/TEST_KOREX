var http=require('http');
var express=require('express');
var fs=require('fs');
var url=require('url');
var bodyParser=require('body-parser');
var cors=require('cors');

var app=express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());

app.get('/page1',function(request,response){
    fs.readFile('public/index.html',function(err,data){
        if(err){
            console.log('Error: file read error:',err);
            response.writeHead(404,{'Content-Type':'text/html'});
        }else{
            response.writeHead(200,{'Content-Type':'text/html'});
            console.log('읽은 데이터:',data,data.toString());
            response.write(data.toString());
        }
        response.end();
    });
});
app.get('/page2',function(request,response){
    fs.readFile('public/index2.html',function(err,data){
        if(err){
            console.log('Error: file read error:',err);
            response.writeHead(404,{'Content-Type':'text/html'});
        }else{
            response.writeHead(200,{'Content-Type':'text/html'});
            console.log('읽은 데이터:',data,data.toString());
            response.write(data.toString());
        }
        response.end();
    });
});
app.get('/page3',function(request,response){
    fs.readFile('public/index3.html',function(err,data){
        if(err){
            console.log('Error: file read error:',err);
            response.writeHead(404,{'Content-Type':'text/html'});
        }else{
            response.writeHead(200,{'Content-Type':'text/html'});
            console.log('읽은 데이터:',data,data.toString());
            response.write(data.toString());
        }
        response.end();
    });
});
app.get('/mailform',function(request,response){
    fs.readFile('public/emailTest.html',function(err,data){
        if(err){
            console.log('Error: file read error:',err);
            response.writeHead(404,{'Content-Type':'text/html'});
        }else{
            response.writeHead(200,{'Content-Type':'text/html'});
            console.log('읽은 데이터:',data,data.toString());
            response.write(data.toString());
        }
        response.end();
    });
});
http.createServer(app).listen(60001,function(){
    console.log('server running at 127.0.0.1:60001');
});
