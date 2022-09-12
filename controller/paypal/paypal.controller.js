const paypal = require('paypal-rest-sdk');

paypal.configure({
      'mode': 'sandbox', //sandbox or live
      'client_id': 'AU7yzoJEdvoSHQlXOipQfqFEepHQ9bcR3t_UGL-NIyhcqRDisenxNs6yrr0Xa8YC-MNZVxKXnG5l_Iqt',
      'client_secret': 'EKyA8i_o-nHi4fU8mPFIOsjFbhUf1yrvqt7lfeoVTXOYvCHo7GF0sOnqSWFMXdugjnlT3EIOcXv0F82Y'
});

// app.post('/pay', (req, res) => {
exports.paypal = (req, res) => {
      const create_payment_json = {
            "intent": "sale",
            "payer": {
                  "payment_method": "paypal"
            },
            "redirect_urls": {
                  "return_url": "http://localhost:8080/success",
                  "cancel_url": "http://localhost:8080/cancel"
            },
            "transactions": [{
                  "item_list": {
                        "items": [{
                              "name": "Red Sox Hat",
                              "sku": "001",
                              "price": "25.00",
                              "currency": "USD",
                              "quantity": 1
                        }]
                  },
                  "amount": {
                        "currency": "USD",
                        "total": "25.00"
                  },
                  "description": "Hat for the best team ever"
            }]
      };

      paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                  throw error;
            } else {
                  for (let i = 0; i < payment.links.length; i++) {
                        if (payment.links[i].rel === 'approval_url') {
                              // res.redirect(payment.links[i].href);
                              res.json({
                                    message: "paymenttttttedddeddd",
                                    response:
                                          payment.links[i].href

                              })
                        }
                  }
            }
      });

};
///////////////////////////////////

// app.get('/success', (req, res) => {
exports.Success = (req, res) => {
      const payerId = req.query.PayerID;
      const paymentId = req.query.paymentId;

      const execute_payment_json = {
            "payer_id": payerId,
            "transactions": [{
                  "amount": {
                        "currency": "USD",
                        "total": "25.00"
                  }
            }]
      };

      paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
            if (error) {
                  console.log(error.response);
                  throw error;
            } else {
                  console.log(JSON.stringify(payment));
                  res.json({ message: 'Success' });
            }
      });
};

exports.Cancel = (req, res) => res.send('Cancelled');