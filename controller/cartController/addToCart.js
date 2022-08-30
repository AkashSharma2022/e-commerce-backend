const { Op } = require("sequelize");
const myDb = require("../../models");

exports.addToCart = async (req, res, next) => {
      try {
            const isUser = req.decoded.UserId;
            console.log(isUser);
            if(!isUser){
                  return res.status(422).json({
                        message: "You are not an user"
                  })
            }

            const Product1 = await myDb.product.findAll({
                  where: { ProductId: req.body.ProductId },
            });
            if (Product1.length != 0) {
                  let quantity = req.body.quantity ?? 1;
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
                        if (exitInCart.length == 0) {

                              //currStock = Product1[0].stock-quantity
                              //let totalAmount = (quantity * (Product1[0].productPrice))

                              await myDb.addToCart.create({
                                    productName: Product1[0].productName,
                                    price: Product1[0].productPrice,
                                    quantity: quantity,
                                    totalAmount: quantity * Product1[0].productPrice,
                                    UserId: req.decoded.UserId,
                                    ProductId: req.body.ProductId,
                              })
                              return res.status(200).json({
                                    message: "Product is added to cart",
                              });
                        }
                        else {
                              quantity = parseInt(quantity) + parseInt(exitInCart[0].quantity);
                              await myDb.addToCart.update({
                                    quantity: quantity,
                                    totalAmount: quantity * Product1[0].productPrice
                              }, {
                                    where: {
                                          [Op.and]: [{ UserId: req.decoded.UserId }, { ProductId: req.body.ProductId }]
                                    }
                              })
                              return res.json({
                                    message: "Item is already present in cart, Quantity increased"
                              })
                        }
                  }
            } else {
                  return res.json({
                        message: "Product is not found"
                  })
            }
      } catch (err) {
            next(err);
      }
}