var connect = require('connect');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = connect();

var logFile = fs.createWriteStream("./acesso.log", {flags: 'a'});


function log(req, res, next){

	console.log("Requisição: "+req.method+" "+req.url);
	next();
}
function hello(req, res, next){
	res.setHeader("Content-Type", "text/html");
	res.end("<h1>Hello World!</h1>");
}

function bye(req, res, next){
	res.setHeader("Content-Type", "text/html");
	res.end("<h1>Good bye World!</h1>");
}

function envio(req, res, next){
	res.setHeader("Content-Type", "text/plain");
	res.write('Você enviou:\n');
	res.end(JSON.stringify(req.body));
}
app.use(log);
app.use(morgan('combined', {stream: logFile}));
app.use(morgan('dev'));
app.use(serveStatic('public/html'));
app.use(serveStatic('public/css'));
app.use(serveStatic('public/images'));
app.use("/post", bodyParser.urlencoded({extended: false}));
app.use("/post", bodyParser.json());
app.use("/post", envio);
app.use("/hello.html", hello);
app.use("/bye.html", bye);

app.listen(3000);
console.log("Executando a aplicação em http://localhost:3000");