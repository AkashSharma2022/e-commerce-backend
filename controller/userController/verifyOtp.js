const myDb = require("../../models");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.verifyOtp = async (req, res, next) => {

      try {
            let getOtp = await myDb.otpTable.findAll({
                  where: {
                        email: req.decoded.email
                  }
            })

            getOtp = getOtp[0].otp;
            console.log(getOtp);

            if (getOtp == "") {
                  res.status(422).json({
                        message: "you are already verified"
                  })
            };

            if (getOtp == '0') {
                  res.status(422).json({
                        message: "Please generate otp"
                  })
            };
            // console.log(getOtp);

            const token = getOtp;

            const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000

            if (isTokenExpired(token) == true) {

                  return res.json({
                        message: "OTP Expired! Please try again"
                  })
            }

            otp = req.body.giveotp;
            console.log(otp);

            const otpdecoded = jwt.verify(getOtp, 'secret_key');
            console.log(otpdecoded.otp);

            const hashPass = await bcrypt.hash(req.decoded.password, 12);

            if (otpdecoded.otp !== otp) {
                  return res.status(422).json({
                        message: "Incorrect otp",
                  });
            }
            else {
                  myDb.otpTable.destroy(
                        {
                              where: {},
                              truncate: true

                        }
                  );
                  myDb.users.create(
                        {
                              email: req.decoded.email,
                              name: req.decoded.name,
                              contact: req.decoded.contact,
                              age: req.decoded.age,
                              password: hashPass
                        }
                  );
                  res.status(201).json({
                        message: " Verified ",
                  })

            }


      } catch (err) {
            next(err);
      }
}