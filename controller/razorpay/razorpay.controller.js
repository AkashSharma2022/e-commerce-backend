const Razorpay = require('razorpay');
let instance = new Razorpay({
    key_id: 'rzp_test_3jZQGQrfapypWf',
    key_secret: 'lZ0I92bqKCWfQJfa1ssn6W7s',
})

// app.post('/create/orderId', (req, res) => {
exports.razorPayCreateOrder = (req, res) => {
    try {
        console.log("in orders");
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




























