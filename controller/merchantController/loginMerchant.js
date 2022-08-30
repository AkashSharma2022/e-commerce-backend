const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const myDb = require('../../models');

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
                  return res.status(422).json({
                        message: "Invalid email or contact",
                  });
            }
            const passMatch = await bcrypt.compare(req.body.password, row[0].password);
            if (!passMatch) {
                  return res.status(422).json({
                        message: "Incorrect password",
                  });
            }

            const theToken = jwt.sign(
                  { MerchantId: row[0].MerchantId },
                  "secret_key",
                  { expiresIn: "1h" }
            );

            delete row.password;
            return res.json({
                  token: theToken,
                  Details: row,
            });
      }
      catch (err) {
            next(err);
      }
}