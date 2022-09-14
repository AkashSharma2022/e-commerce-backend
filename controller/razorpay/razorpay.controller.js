const Razorpay = require('razorpay');
let instance = new Razorpay({
    key_id: 'rzp_test_3jZQGQrfapypWf',
    key_secret: 'lZ0I92bqKCWfQJfa1ssn6W7s',
})



// app.post('/create/orderId', (req, res) => {
exports.razorPayCreateOrder = (req, res) => {
    try {
        console.log("in orders");
        // console.log("create orderId request", req.body);'/create/orderId'
        var options = {
            amount: 50000, // amount in the smallest currency unit
            currency: "INR",
            receipt: "rcp1"
        };
        instance.orders.create(options, function (err, order) {
            console.log(order);
            res.send({
                orderId: order.id
            })
        });
    } catch (error) {
        console.log(error);
    }
}
// app.post("/api/payment/verify", (req, res) => {
exports.paymentVerify = (req, res) => {
    console.log("in verification");
    console.log(req.body.response.razorpay_order_id);
    let body = req.body.response.razorpay_order_id + "|" + req.body.response.razorpay_payment_id;
    var crypto = require("crypto");
    var expectedSignature = crypto.createHmac('sha256', 'lZ0I92bqKCWfQJfa1ssn6W7s')
        .update(body.toString())
        .digest('hex');
    console.log("sig received ", req.body.response.razorpay_signature);
    console.log("sig generated ", expectedSignature);
    var response = { "signatureIsValid": "false" }
    if (expectedSignature === req.body.response.razorpay_signature)
        response = { "signatureIsValid": "true" }
    res.send(response);
};

























// const Razorpay = require('razorpay');

// exports.razorPay = async (req, res) => {
//     try {
        // let instance = new Razorpay({
        //     key_id: 'rzp_test_3jZQGQrfapypWf',
        //     key_secret: 'lZ0I92bqKCWfQJfa1ssn6W7s',
        // })

//         let options = {
//             amount: 500,
//             currency: "INR",
//             receipt: "receipt1"
//         }

//         instance.orders.create(options, (error, order) => {
//             console.log(order.id);
//         });

//         // console.log(order.id);

//         // let customer = await instance.customers.create({
//         //     name: "Akash harma",
//         //     contact: 9876543212,
//         //     email: "akki12@gmail.com",
//         //     fail_existing: 0,
//         //     // gstin: "29XAbbA4369J1PA",
//         //     // notes: {
//         //     //     notes_key_1: "Tea, Earl Grey, Hot",
//         //     // }
//         // })
//         // console.log(customer.id);

//         const payment = await instance.paymentLink.create({
//             amount: 5000,
//             currency: "INR",
//             accept_partial: true,
//             first_min_partial_amount: 100,
//             description: "For XYZ purpose",
//             reminder_enable: true,
//             // customer: customer  ,
//             notes: {
//                 productName: "Product123"
//             },
//         })
//         res.json({ short_url: payment.short_url });
//     }
//     catch (error) {
//         return res.json({
//             error: error.message
//         })
//     }
// }



















