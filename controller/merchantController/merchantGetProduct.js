const myDb = require("../../models");

exports.merchantGetProduct = async (req, res, next) => {

      try {
            const row = await myDb.product.findAll({
                  where: {
                        MerchantId: [req.decoded.MerchantId]
                  }
            });

            if (row.length === 0) {
                  return res.status(422).json({
                        message: "Invalid merchant",
                  });
            }

            const merchantAllProducts = await myDb.product.findAll({
                  where: {
                        MerchantId: req.decoded.MerchantId
                  }, attributes: {
                        exclude: ['ProductId', 'createdAt', 'updatedAt',
                              'CategoryId', 'Sub_categoryId', 'MerchantId']
                  }

            })
            return res.status(200).json({
                  message: "Merchant all products",
                  Details: merchantAllProducts
            })
      }
      catch (err) {
            next(err);
      }
}
