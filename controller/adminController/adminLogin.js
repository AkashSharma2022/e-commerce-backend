const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const myDb = require('../../models');
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.adminLogin = async (req, res, next) => {
      try {
            const row = await myDb.admin.findAll({
                  where: {
                        email: req.body.email
                  }
            });

            if (row.length === 0) {
                  return res.status(406).json({
                        status: "NOT_ACCEPTABLE",
                        StatusCodes
: StatusCodes
.NOT_ACCEPTABLE,
                        message: "Invalid email or contact",
                  });
            }

            const passMatch = await bcrypt.compare(req.body.password, row[0].password);
            if (!passMatch) {
                  return res.status(502).json({
                        status: "FORBIDDEN",
                        StatusCodes
: StatusCodes
.FORBIDDEN,
                        message: "Incorrect password",
                  });
            }

            const theToken = jwt.sign(
                  { AdminId: row[0].AdminId },
                  "secret_key",
                  { expiresIn: "1h" }
            );

            delete row[0].password;

            return res.status(200).json({
                  status: 'OK',
                  StatusCodes
 : StatusCodes
.OK,
                  token: theToken,
                  Details: row,
            });
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
};