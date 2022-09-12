const myDb = require("../../models");
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.merchantReg = async (req, res, next) => {

      try {
            const email = await myDb.merchant.findAll({
                  where: {
                        email: [req.body.email]
                  }
            });
            if (email.length != 0) {
                  return res.status(409).json({
                        status: "CONFLICT",
                        StatusCodes
: StatusCodes
.CONFLICT,
                        message: "The details already in use",
                  });
            }
            myDb.merchant.create(
                  {
                        email: req.body.email,
                        ownerName: req.body.ownerName,
                        contact: req.body.contact,
                        companyName: req.body.companyName,
                        address: req.body.address,
                        gstNumber: req.body.gstNumber
                  }
            );
            res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "verifivation under process will sent you mail soon",
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