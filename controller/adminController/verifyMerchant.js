const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const myDb = require("../../models");

exports.verifyMerchant = async (req, res, next) => {
      let id = [req.params.id];

      const isAdmin = [req.decoded.AdminId];

      if (!isAdmin) {
            return res.status(201).json({
                  message: "You are not an admin",
            });
      }

      try {
            await myDb.merchant.update(
                  {
                        status: req.body.status,
                  },
                  {
                        where: {
                              MerchantId: id
                        },
                  }
            );
            const merchant = await myDb.merchant.findAll({
                  where: {
                        MerchantId: id,
                  },
            });
            console.log(merchant[0].email);
            let transporter = nodemailer.createTransport({
                  service: "gmail",
                  auth: {
                        user: "raichandresh554@gmail.com",
                        pass: "swbkubsfdgmzdnbn",
                  },
            });
            const theToken = jwt.sign(
                  {
                        MerchantId: merchant[0].MerchantId,
                        email: merchant[0].email,
                        status: merchant[0].status,
                  },
                  "secret_key",
                  {
                        expiresIn: "1h",
                  }
            );
            let mailOptions = {
                  from: "raichandresh554@gmail.com",
                  to: merchant[0].email,
                  subject: "password setting mail",
                  text: theToken,
            };
            console.log(theToken);

            transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                        console.log(error);
                  } else {
                        console.log("Email sent: " + merchant[0].email);
                        res.json(theToken);
                  }
            });
            return res.status(200).json({
                  message: `You are verified and set password link sent to your email ${merchant[0].email}`,
                  token: theToken
            })
      } catch (error) {
            next(error);
      }
};