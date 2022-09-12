const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const myDb = require('../../models');
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.merchantLogin = async (req, res, next) => {
      let email = [req.body.email];
      console.log(email);
      try {
            const row = await myDb.merchant.findAll({
                  where: {
                        email: email
                  }
            });
            console.log(row);

            if (row.length === 0) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "Invalid email or password",
                  });
            }
            const passMatch = await bcrypt.compare(req.body.password, row[0].password);
            if (!passMatch) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "Incorrect password",
                  });
            }

            const theToken = jwt.sign(
                  { MerchantId: row[0].MerchantId },
                  "secret_key",
                  { expiresIn: "1h" }
            );

            delete row.password;
            return res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  token: theToken,
                  Details: row,
            });
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