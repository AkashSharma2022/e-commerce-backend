const myDb = require("../../models");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const { Op } = require("sequelize");

exports.getCart = async (req, res, next) => {
      try {
            if (!req.decoded.UserId) {
                  return res.status(401).json({
                        status: 'UNAUTHORIZED',
                        StatusCodes: StatusCodes.UNAUTHORIZED,
                        message: 'you are not a valid used'
                  })
            }
            const userCart = await myDb.addToCart.findAll({
                  where: {
                        UserId: req.decoded.UserId
                  }, attributes: {
                        exclude: ['CartId', 'status', 'createdAt',
                              'updatedAt', 'UserId']
                  }
            })
            if (userCart.length != 0) {
                  let length = userCart.length
                  let index = 0
                  let totalQuantity = 0
                  const arr = [];
                  while (length != 0) {
                        arr[index] = { ProductId: userCart[index].ProductId }
                        totalQuantity = totalQuantity + userCart[index].quantity
                        length--
                        index++
                  }
                  const cartProductDetails = await myDb.product.findAll({
                        attributes: ["originalPrice", "discountPercent"],
                        where: {
                              [Op.or]: arr
                        },
                        raw: true
                  })
                  console.log(cartProductDetails);
                  length = cartProductDetails.length
                  index = 0;
                  let totalCartValue = 0
                  while (length != 0) {
                        userCart[index].price = cartProductDetails[index].originalPrice
                        userCart[index].discountPercent = cartProductDetails[index].discountPercent
                        userCart[index].totalAmount = userCart[index].price * (100 - cartProductDetails[index].discountPercent) / 100
                        totalCartValue = totalCartValue + (userCart[index].price * userCart[index].quantity)
                        index++
                        length--
                  }

                  return res.status(200).json({
                        status: "OK",
                        StatusCodes
                              : StatusCodes
                                    .OK,
                        message: "Your all products are here",
                        totalCartValue: totalCartValue,
                        totalQuantity: totalQuantity,
                        details: userCart,
                  })

            }
            else {
                  return res.status(404).json({
                        status: ReasonPhrases.NOT_FOUND,
                        StatusCodes
                              : StatusCodes
                                    .NOT_FOUND,
                        message: "Nothing on your Cart"
                  })
            }
      }
      catch (error) {
            next(error);
            res.status(StatusCodes
                  .INTERNAL_SERVER_ERROR)
                  .send({
                        status: StatusCodes
                              .INTERNAL_SERVER_ERROR,
                        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                        response: error.message,
                  })
      }
}

