var http = require('http');
var express = require('express');
var fs = require('fs');
var path = require('path');
var routes = require('./routes');

var app = express();

//环境变量
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, 'public')));

// 开发模式
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.use(express.bodyParser({uploadDir:'./uploads'}));	//用来上传文件

//routes
routes(app);

var server = http.createServer(app).listen(3000);

console.log('serve is listening in 3000.');

