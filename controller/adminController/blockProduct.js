const myDb = require("../../models")

exports.blockProduct = async (req, res, next) => {
      try {
            if (!req.decoded.AdminId) {
                  return res.status(422).json({
                        message: "you are not an Admin"
                  })
            };

            const productStatus = await myDb.product.findOne({
                  where: {
                        ProductId: req.params.id
                  }
            })
            if (productStatus.status == -1) {
                  return res.status(422).json({
                        message: "Product already blocked"
                  })
            }
            await myDb.product.update({ productStatus: -1 },
                  {
                        where: {
                              ProductId: req.params.id
                        }
                  })

            return res.status(200).json({
                  message: "Product has been blocked"
            })
      } catch (err) {
            next(err);
      }
}