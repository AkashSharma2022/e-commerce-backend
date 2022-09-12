const myDb = require("../../models");
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.getMerchants = async (req, res, next) => {
      try {
            const isAdmin = req.decoded.AdminId;

            if (!isAdmin) {
                  return res.status(401).json({
                        status: 'UNAUTHORIZED',
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "you are not an Admin"
                  })
            }

            let offset = (req.params.page - 1) * 10;

            const row = await myDb.merchant.findAll({
                  limit: 10, offset: offset,

                  // for delete password filed in the output
                  attributes: { exclude: ['password', 'MerchantId', 'createdAt', 'updatedAt'] }
            });

            return res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "All merchants details",
                  Details: row
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