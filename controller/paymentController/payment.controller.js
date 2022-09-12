const myDb = require('../../models');

const stripe = require('stripe')('sk_test_51LeeJJSAlzMVDLyp4jFWfgdBgQdMMpBsx8aX3j2a530BoKeq98u7HJuRL43js1RSSUsSHhmVjqAN3E29rfoCR56l00l823e3yY');

exports.payment = async function (req, res, next) {
      console.log(req.body);
      try {
            if (!req.decoded.UserId) {
                  return res.status(401).json({
                        message: "you are not a valid user"
                  })
            }
            const userData = await myDb.users.findAll({
                  where: {
                        UserId: req.decoded.UserId
                  }, raw: true
            })

            const orderData = await myDb.order.findAll({
                  where: {
                        OrderId: req.body.OrderId
                  }, raw: true
            })
            console.log(req.decoded.UserId, ".......................");
            if (orderData[0].paymentStatus != 0) {
                  return res.status(200).json({
                        status: "Ok",
                        message: "Payment already done"
                  })
            }

            const customer = await stripe.customers.create({
                  name: userData[0].name,
                  email: userData[0].email
            })

            console.log(orderData[0].TotalPayableAmount, "aaaaaaaaaaaaaaaaaaaaaaaaaa");
            let paymentMethod = await stripe.paymentMethods.create({
                  type: 'card',
                  card: {
                        number: req.body.number,
                        exp_month: req.body.exp_month,
                        exp_year: req.body.exp_year,
                        cvc: req.body.cvc,
                  },
            });

            let paymentIntent = await stripe.paymentIntents.create({
                  payment_method: paymentMethod.id,
                  amount: parseInt(orderData[0].TotalPayableAmount) * 100, // USD*100
                  currency: 'inr',
                  confirm: true,
                  payment_method_types: ['card'],
                  off_session: true,
                  customer: customer.id
            });

            if (!paymentIntent.amount_received) {
                  return res.status(402).json({
                        status: "payment required",
                        message: "payment failed"
                  })
            }
            // console.log(paymentIntent.id);
            // const { PaymentDetailId } = await myDb.paymentDetails.create({
            //       paymentStatus: true,
            //       transactionId: paymentIntent.id
            // })
            // await myDb.order.update({
            //       paymentStatus: true,
            //       PaymentDetailId: paymentIntent.id
            // },
            //       {
            //             where: {
            //                   OrderId: req.body.OrderId
            //             }
            //       })

            res.json({
                  message: "Payment done",
                  details: paymentIntent
            })

      } catch (error) {
            next(error);
            return res.json({
                  message: error.message
            })
      }
};