const myDb = require("../../models");

exports.getProducts = async (req, res, next) => {
      try {
            let offset = (req.params.page - 1) * 10;

            const row = await myDb.product.findAll({
                  limit: 10, offset: offset,
                  where: {
                        productStatus: 1
                  },
                  attributes: {
                        exclude: ['ProductId', 'stocks',
                              'productStatus', 'createdAt', 'updatedAt',
                              'CategoryId', 'Sub_categoryId', 'MerchantId']
                  }
            }
            );

            return res.status(200).json({
                  message: "All products details",
                  Details: row
            })
      } catch (err) {
            next(err);
      }
}