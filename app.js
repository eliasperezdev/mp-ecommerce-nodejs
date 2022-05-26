var express = require('express');
var exphbs  = require('express-handlebars');

var port = process.env.PORT || 3000;

var app = express();

const mercadopago=require('mercadopago');


mercadopago.configure({
    access_token:process.env.ACCESS_TOKEN, 
    integrator_id: process.env._INTEGRATOR_ID,
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

 const { name,unit, price} = req.query; 
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
            street_name: 'Falsa',
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
    notification_url: process.env.NOTIFICATION,

    // ...
    payment_methods: {
        excluded_payment_methods:[
            {id:'amex'}
           
        ],
        excluded_payment_types: [{ id: "atm" }], 

        default_installments: 1,
        installments: 6, 

    },
      
    // ...

    external_reference: process.env.EMAIL,

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
