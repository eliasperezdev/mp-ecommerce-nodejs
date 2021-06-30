var express = require('express');
var exphbs  = require('express-handlebars');

var port = process.env.PORT || 3000;

var app = express();

const mercadopago=require('mercadopago');


mercadopago.configure({
    access_token:'APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398', 
    integrator_id: 'dev_24c65fb163bf11ea96500242ac130004',
});

app.get('/pending', function (req, res) {

    res.render('pending');
});

app.get('/error', function (req, res) {

    res.render('error');
});

app.get('/', function (req, res) {

    res.render('home');
});


app.post('/checkout/new',function (req,res) {

 const { name, price, unit} = req.query; 
  let preference ={

    back_urls: {
        success: 'https://perex125-mp-ecommerce-nodejs.herokuapp.com/success/',
        failure: 'https://perex125-mp-ecommerce-nodejs.herokuapp.com/error/',
        pending: 'https://perex125-mp-ecommerce-nodejs.herokuapp.com/pending/'
    },
    auto_return: 'approved',
    // ...

    payer: {
        phone: {
            area_code:'11',
            number: 22223333
        },
        
        address: {
            street_name: 'false',
            street_number: 123,
            zip_code: '1111',

        },
        
        email: 'test_user_63274575@testuser.com',
        identification: {},
        name: 'Lalo',
        surname: 'Landa',
        date_created: null,
        last_purchase: null
    },
    // ...
    notification_url: 'https://7bf0e09591ed8252025d97ba243bd893.m.pipedream.net',

    // ...
    payment_methods: {
        excluded_payment_types:[
            {id:'amex'}
           
        ],
        excluded_payment_types: [{ id: "atm" }], 
        installments: 6, 
        default_installments: 6
        
        installments: 6, 
        default_installments: 6 
    },
      
    // ...

    external_reference: 'perexlito@gmail.com',

    items:[
    {
        id:1234,
        category_id: "1234",  
        picture_url: 'https://perex125-mp-ecommerce-nodejs.herokuapp.com/assets/samsung-galaxy-s9-xxl.jpg',
        description: 'Dispositivo móvil de Tienda e-commerce',
        title:name,
        unit_price:parseFloat(price),
        quantity:parseInt(unit),
        unit_price:15000,
        quantity:1,

    }
    ]

};

mercadopago.preferences.create(preference)
    .then(function(response){
        res.redirect(response.body.init_point);
    }).catch(function(error){
        console.log(error);
    });

});
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

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.listen(port);
