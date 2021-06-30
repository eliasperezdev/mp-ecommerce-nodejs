var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();

const PaymentController = require("./controllers/PaymentController");

const PaymentService = require("./Service/PaymentService"); 

const PaymentInstance = new PaymentController(new PaymentService()); 
 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post("/payment/new", (req, res) => 
  PaymentInstance.getMercadoPagoLink(req, res) 
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

app.listen(port);