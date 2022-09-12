const myDb = require("../../models");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

exports.userGetOrderedProduct = async (req, res, next) => {
      try {
            if (!req.decoded.UserId) {
                  return res.status(401).json({
                        status: 'UNAUTHORIZED',
                        StatusCodes: StatusCodes.UNAUTHORIZED,
                        message: 'you are not a valid user'
                  })
            }

            const orderedData = await myDb.orderItem.findAll({
                  where: {
                        UserId: req.decoded.UserId
                  }, attributes: {
                        exclude: ['CartId', 'createdAt',
                              'updatedAt', 'UserId']
                  }
            })
            if (orderedData.length != 0) {
                  return res.status(200).json({
                        status: "OK",
                        StatusCode: StatusCodes.OK,
                        count: orderedData.length,
                        details: orderedData
                  })
            }
            else {
                  return res.status(404).json({
                        status: ReasonPhrases.NOT_FOUND,
                        StatusCodes
                              : StatusCodes
                                    .NOT_FOUND,
                        message: "Nothing ordered"
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
                        response: error.message,
                  })
      }
}

