const jwt = require("jsonwebtoken");
const nodemailer = require('../nodeMailer');
const { Op } = require('sequelize');
const myDb = require("../../models");
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


OTPFUN = () => {
      let numbers = "0123456789";
      let OTP = "";
      for (let i = 0; i < 4; i++) {
            OTP += numbers[Math.floor(Math.random() * 10)];
      }
      return OTP;
};

exports.sentOtp = async (req, res, next) => {
      try {
            const email = await myDb.users.findAll({
                  where: {
                        [Op.or]:
                              [{ email: [req.body.email] },
                              { contact: [req.body.contact] }]
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

            let sentEmail = req.body.email;
            console.log(sentEmail);


            let theOTP = OTPFUN();
            console.log(theOTP);


            const otpToken = jwt.sign({ otp: theOTP }, 'secret_key', { expiresIn: '60000s' });

            nodemailer.sendOTP(theOTP, sentEmail);

            await myDb.otpTable.create(
                  {
                        otp: otpToken,
                        email: sentEmail
                  }
            );

            const theToken = jwt.sign(
                  {
                        email: req.body.email,
                        name: req.body.name,
                        password: req.body.password,
                        age: req.body.age,
                        contact: req.body.contact
                  },
                  'secret_key',
                  { expiresIn: "1h" }
            );
            return res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  token: theToken,
                  message: "OTP sent successfully.",
            });



      } catch (error) {
            console.log(error)
;
      }
}