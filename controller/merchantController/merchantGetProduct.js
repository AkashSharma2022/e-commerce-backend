const myDb = require("../../models");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');


exports.merchantGetProduct = async (req, res, next) => {

      try {
            const row = await myDb.product.findAll({
                  where: {
                        MerchantId: [req.decoded.MerchantId]
                  }
            });

            if (row.length === 0) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
                              : StatusCodes
                                    .UNAUTHORIZED,
                        message: "Invalid merchant",
                  });
            }

            const attributes = {
                  exclude: ['createdAt', 'updatedAt', 'CategoryId', 'Sub_categoryId', 'MerchantId']
            }
            let offset = (req.params.page - 1) * 10;

            const productCount = await myDb.product.count({
                  where: {
                        MerchantId: req.decoded.MerchantId
                  }
            });

            const merchantAllProducts = await myDb.product.findAll({
                  limit: 10, offset: offset,
                  where: {
                        MerchantId: req.decoded.MerchantId
                  },
                  include: [{ model: myDb.sub_category, attributes },
                  { model: myDb.category, attributes }], attributes

            })
            return res.status(200).json({
                  status: "OK",
                  StatusCodes: StatusCodes.OK,
                  message: "Merchant all products",
                  totalProduct: productCount,
                  currentPageProduct: merchantAllProducts.length,
                  Details: merchantAllProducts
            })
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
