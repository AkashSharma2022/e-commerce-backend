const { Op } = require('sequelize');
const myDb = require('../../models');

exports.deleteProduct = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(422).json({
                        message: "you are not a merchant"
                  })
            }
            const products = await myDb.product.destroy({
                  where: {
                        [Op.and]:
                              [{ MerchantId: req.decoded.MerchantId },
                              { ProductId: req.params.id }]
                  }
            });
            console.log(products);
            if (products) {
                  return res.status(201).json({
                        message: "Product deleted successfully.",
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