const myDb = require("../../models");
const { StatusCodes, ReasonPhrases } = require('http-status-codes');


exports.getProducts = async (req, res, next) => {
      try {
            let offset = (req.params.page - 1) * 10;

            const row = await myDb.product.findAll({
                  limit: 10, offset: offset,
                  where: {
                        productStatus: 1
                  }
            }
            );

            return res.status(200).json({
                  status: "OK",
                  StatusCodes: StatusCodes.OK,
                  message: "All products details",
                  Details: row
            })
      } catch (error) {
            next(error);
            res.status(StatusCodes
                  .INTERNAL_SERVER_ERROR).send({
                        status: StatusCodes.INTERNAL_SERVER_ERROR,
                        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                        response: error.message
                        ,
                  });
      }
}