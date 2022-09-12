const { Op } = require("sequelize");
const myDb = require("../../models");
const { StatusCodes
      , ReasonPhrases } = require('http-status-codes');


exports.addToCart = async (req, res, next) => {
      try {
            const isUser = req.decoded.UserId;
            console.log(isUser);
            if (!isUser) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
                              : StatusCodes
                                    .UNAUTHORIZED,
                        message: "You are not an user"
                  })
            }

            const Product1 = await myDb.product.findAll({
                  where: { ProductId: req.body.ProductId },
            });
            let quantity = req.body.quantity || 1;
            if (Product1.length != 0) {
                  if (quantity > Product1[0].stock) {
                        return res.status(200).json({
                              message: `only ${Product1[0].stock} available`
                        })
                  }
                  else {
                        //currStock = Product1[0].stock-quantity
                        const exitInCart = await myDb.addToCart.findAll({
                              where: {
                                    [Op.and]: [{ UserId: req.decoded.UserId }, { ProductId: req.body.ProductId }]
                              }
                        })

                        const price = Product1[0].originalPrice;
                        const price1 = price * quantity;
                        const discountPercent = Product1[0].discountPercent;
                        const totalAmount = (price1 - (price1 * discountPercent) / 100);

                        if (exitInCart.length == 0) {

                              await myDb.addToCart.create({
                                    productName: Product1[0].productName,
                                    price: price1,
                                    discountPercent: discountPercent,
                                    quantity: quantity,
                                    totalAmount: totalAmount,
                                    UserId: req.decoded.UserId,
                                    ProductId: req.body.ProductId,
                              })
                              return res.status(200).json({
                                    status: "OK",
                                    StatusCodes
                                          : StatusCodes
                                                .OK,
                                    message: "Product is added to cart",
                              });
                        }
                        else {

                              quantity = parseInt(quantity) + parseInt(exitInCart[0].quantity);
                              await myDb.addToCart.update({
                                    quantity: quantity,
                                    price: price,
                                    totalAmount: quantity * (price - (price * discountPercent) / 100)
                              }, {
                                    where: {
                                          [Op.and]: [{ UserId: req.decoded.UserId }, { ProductId: req.body.ProductId }]
                                    }
                              })
                              return res.status(200).json({
                                    status: "OK",
                                    StatusCodes
                                          : StatusCodes
                                                .OK,
                                    message: "Item is already present in cart, Quantity increased"
                              })
                        }
                  }
            } else {
                  return res.status(404).json({
                        status: "NOT_FOUND",
                        StatusCodes
                              : StatusCodes
                                    .NOT_FOUND,
                        message: "Product is not found"
                  })
            }
      } catch (error) {
            next(error);
            res.status(StatusCodes
                  .INTERNAL_SERVER_ERROR)
                  .send({
                        status: StatusCodes
                              .INTERNAL_SERVER_ERROR,
                        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                        response: error.message
                        ,
                  })
      }
}