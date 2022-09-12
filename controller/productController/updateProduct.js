const { Op } = require('sequelize');
const myDb = require('../../models');
const { StatusCodes
      , ReasonPhrases } = require('http-status-codes');


exports.updateProduct = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes: StatusCodes.UNAUTHORIZED,
                        message: "you are not a merchant"
                  })
            }
            const productData = await myDb.product.findOne({
                  where: {
                        ProductId: req.params.id
                  }
            })

            let originalPrice = req.body.originalPrice;
            originalPrice = originalPrice || productData.originalPrice;

            let discountPercent = req.body.discountPercent;
            discountPercent = discountPercent || productData.discountPercent;
            let productPrice = parseInt(originalPrice) - parseInt((originalPrice * discountPercent) / 100)

            const products = await myDb.product.update(
                  {
                        stocks: req.body.stocks,
                        originalPrice: originalPrice,
                        discountPercent: discountPercent,
                        productPrice: productPrice
                  }, {
                  where: {
                        [Op.and]:
                              [{ MerchantId: req.decoded.MerchantId },
                              { ProductId: req.params.id }]
                  }
            });

            // const cartData = await myDb.addToCart.findAll({
            //       where: { 
            //             [Op.and]: [
            //             {ProductId: req.params.id} ]
            //       }
            // })
            // if (cartData) {

            //       await myDb.addToCart.update({
            //             price: originalPrice, totalAmount: (productPrice * cartData[0].quantity), discountPercent: discountPercent,
            //       }, {
            //             where: {
            //                   [Op.and]: [
            //                   {ProductId: req.params.id} ]
            //             }
            //       })
            // }


            if (products[0] === 1) {
                  return res.status(200).json({
                        status: "OK",
                        StatusCodes
                              : StatusCodes
                                    .OK,
                        message: "Product updated successfully.",
                  });
            } else {
                  return res.status(404).json({
                        status: "NOT_FOUND",
                        StatusCodes
                              : StatusCodes
                                    .NOT_FOUND,
                        message: "Merchant is not found for this product"
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
                        response: error.message
                        ,
                  });
      }
}