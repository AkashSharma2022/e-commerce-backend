const myDb = require("../../models");
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.removeFromCart = async (req, res, next) => {
      try {
            const delcart = await myDb.addToCart.destroy({
                  where: {
                        CartId: req.params.CartId
                  }
            })
            if (delcart) {
                  return res.status(200).json({
                        status: "OK",
                        StatusCodes
: StatusCodes
.OK,
                        message: "Removed From Cart"
                  })
            } else {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "invalid CartId"
                  })
            }
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
                  })
      }
}