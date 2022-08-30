const myDb = require("../../models");

exports.merchantReg = async (req, res, next) => {

      try {
            const email = await myDb.merchant.findAll({
                  where: {
                        email: [req.body.email]
                  }
            });
            if (email.length != 0) {
                  return res.status(201).json({
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
            res.status(201).json({
                  message: "verifivation under process will sent you mail soon",
            })
      }


      catch (err) {
            next(err);
      }
}