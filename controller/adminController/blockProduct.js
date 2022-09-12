const myDb = require("../../models");
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.blockProduct = async (req, res, next) => {
      try {
            if (!req.decoded.AdminId) {
                  return res.status(401).json({
                        status: 'UNAUTHORIZED',
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "you are not an Admin"
                  })
            };

            const productStatus = await myDb.product.findOne({
                  where: {
                        ProductId: req.params.id
                  }
            })
            if (productStatus.status == -1) {
                  return res.status(403).json({
                        status: "FORBIDDEN",
                        StatusCodes
: StatusCodes
.FORBIDDEN,
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
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "Product has been blocked"
            })
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
                  });
      }
}