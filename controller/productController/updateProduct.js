const { Op } = require('sequelize');
const myDb = require('../../models');

exports.updateProduct = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(422).json({
                        message: "you are not a merchant"
                  })
            }

            const products = await myDb.product.update(
                  {
                        stocks: req.body.stocks,
                        productPrice: req.body.productPrice
                  }, {
                  where: {
                        [Op.and]:
                              [{ MerchantId: req.decoded.MerchantId },
                              { ProductId: req.params.id }]
                  }
            });
            console.log(products);
            if (products[0] === 1) {
                  return res.status(201).json({
                        message: "Product updated successfully.",
                  });
            } else {
                  return res.json({
                        message: "Merchant is not found for this product"
                  })
            }
      }
      catch (err) {
            next(err);
      }
}