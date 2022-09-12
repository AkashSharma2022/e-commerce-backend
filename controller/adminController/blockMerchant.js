const myDb = require("../../models")
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.blockMerchant = async (req, res, next) => {
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

            const merchantStatus = await myDb.merchant.findOne({
                  where: {
                        MerchantId: req.params.id
                  }
            })
            if (merchantStatus.status == -1) {
                  return res.status(403).json({
                        status: "FORBIDDEN",
                        StatusCodes
: StatusCodes
.FORBIDDEN,
                        message: "Merchant already blocked"
                  })
            }
            await myDb.merchant.update({ status: -1 },
                  {
                        where: {
                              MerchantId: req.params.id
                        }
                  })

            return res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "Merchant has been blocked"
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