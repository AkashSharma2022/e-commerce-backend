const bcrypt = require('bcryptjs');
const myDb = require('../../models');
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.setPassword = async (req, res, next) => {
      try {
            const isMerchant = await myDb.merchant.findOne({
                  where: {
                        MerchantId: req.decoded.MerchantId
                  }
            })
            if(!isMerchant){
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "You are not a merchant"
                  })
            }
            const hashPass = await bcrypt.hash(req.body.password, 12);

            await myDb.merchant.update({
                  password: hashPass
            }, {
                  where: {
                        email: req.decoded.email
                  }
            })
            return res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "merchant password inserted"
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