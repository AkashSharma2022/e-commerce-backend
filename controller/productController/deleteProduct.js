const { Op } = require('sequelize');
const myDb = require('../../models');
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.deleteProduct = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
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
                  return res.status(200).json({
                        status: "OK",
                        StatusCodes
: StatusCodes
.OK,
                        message: "Product deleted successfully.",
                  });
            } else {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
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