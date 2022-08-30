const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const myDb = require('../../models');

exports.login = async (req, res, next) => {
      try {

            const row = await myDb.users.findAll({
                  where: {
                        email: req.body.email
                  }, attributes: { exclude: [ 'userType', 'createdAt', 'updatedAt'] }
            });

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
                  { UserId: row[0].UserId },
                  "secret_key",
                  { expiresIn: "1h" }
            );
            delete row.password;

            return res.json({
                  token: theToken,
                  Details: row,
            });
      } catch (err) {
            next(err);
      }
};