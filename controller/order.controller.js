const myDb = require("../models");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');


exports.orderProduct = async (req, res, next) => {
      try {
            const isUser = req.decoded.UserId;

            if (!isUser) {
                  return res.status(401).json({
                        status: 'UNAUTHORIZED',
                        StatusCodes
                              : StatusCodes
                                    .UNAUTHORIZED,
                        message: "You are not an user"
                  })
            }
            const addressData = await myDb.address.findAll({
                  where: {
                        id: req.params.id
                  }
            })

            const addressData1 = (addressData[0].address + " , "
                  + addressData[0].city + " , "
                  + addressData[0].pincode + " , ");

            const userData = await myDb.users.findAll({
                  where: {
                        UserId: isUser
                  }
            })

            const cartData = await myDb.addToCart.findAll({
                  where: {
                        UserId: isUser
                  }, raw: true
            })
            console.log(cartData.length);
            if (cartData.length == 0) {
                  return res.json({
                        message: "Nothing is present in Cart"
                  })
            }

            let total = 0;
            for (i = 0; i < cartData.length; i++) {
                  total = parseFloat(total) + parseFloat(cartData[i].totalAmount);
            }

            let shippingCharge = 0;
            if (total < 1000) {
                  total = (total + 100);
                  shippingCharge = 100;
            }

            const cartToOrders = await myDb.order.create({
                  address: addressData1,
                  UserId: req.decoded.UserId,
                  userName: userData[0].name,
                  TotalPayableAmount: total,
                  shippingCharge: shippingCharge
            })

            let length = cartData.length;
            let arrObj = [];
            let index = 0;

            while (length != 0) {
                  arrObj[index] = cartData[index];

                  const merchantData = await myDb.product.findAll({
                        where: {
                              ProductId: arrObj[index].ProductId
                        }
                  })
                  arrObj[index].MerchantId = merchantData[0].MerchantId
                  arrObj[index].OrderId = cartToOrders.OrderId

                  index++;
                  length--;
            }

            await myDb.orderItem.bulkCreate(arrObj);

            // await myDb.addToCart.destroy({
            //       where: {
            //             UserId: req.decoded.UserId
            //       }
            // })

            for (let i = 0; i < arrObj.length; i++) {
                  const productDetails = await myDb.product.findAll({
                        where: {
                              ProductId: arrObj[i].ProductId
                        }
                  })
                  let quantity = productDetails[0].stocks - arrObj[i].quantity
                  await myDb.product.update({ stocks: quantity }, {
                        where: {
                              ProductId: arrObj[i].ProductId
                        }
                  })
            }

            return res.status(200).json({
                  status: "OK",
                  StatusCodes: StatusCodes.OK,
                  message: "order placed",
            })


      } catch (error) {
            next(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
                  status: StatusCodes.INTERNAL_SERVER_ERROR,
                  error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                  response: error.message,
            })
      }
}
