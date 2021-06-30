const axios = require("axios"); 

class PaymentService {
  constructor() {
    this.tokensMercadoPago = {
      prod: {},
      test: {
        access_token:
          "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398" ,
        integrator_id:
           "dev_24c65fb163bf11ea96500242ac130004",
// el access_token de MP
      }
    }; 
// token
    this.mercadoPagoUrl = "https://api.mercadopago.com/checkout"; 
  }

  async createPaymentMercadoPago(name, price, unit, img) {  
    const url = `${this.mercadoPagoUrl}/preferences?access_token=${this.tokensMercadoPago.test.access_token}`; 

console.log(name)

    const items = [
      {
        id: "1234", 
        title: name, 
        description: "Dispositivo movil de Tienda e-commerce",
        picture_url: "https://courseit.com.ar/static/logo.png", 
        category_id: "1234",  
        quantity: parseInt(unit), 
        currency_id: "ARS", 
        unit_price: parseFloat(price)
      }
    ];  

    const preferences = { 
      items, 
      external_reference: "perexlito@gmail.com", 
      payer: { 
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "011",
          number: "22223333"
        },
        address: {
          zip_code: "1111",
          street_name: "Falsa",
          street_number: "123"
        }
      }, 
      payment_methods: { 
        excluded_payment_methods: [ 
          {
            id: "amex"
          }
        ],
        excluded_payment_types: [{ id: "atm" }], 
        installments: 6, 
        default_installments: 6 
      }, 
      back_urls: {
        success: "https://perex125-mp-ecommerce-nodejs.herokuapp.com/success", 
        pending: "https://perex125-mp-ecommerce-nodejs.herokuapp.com/pending", 
        failure: "https://perex125-mp-ecommerce-nodejs.herokuapp.com/error" 

      }, 
      notification_url: "https://perex125-mp-ecommerce-nodejs.herokuapp.com/webhook", 

      auto_return: "approved" 
    };

    try {
      const request = await axios.post(url, preferences, {
        headers: { 
          "Content-Type": "application/json"
        }
      });

      return request.data; 
      console.log(request.data);
    } catch (e) {
      console.log(e); 
    }
  }
}


module.exports = PaymentService;