const bcrypt = require('bcryptjs');
const myDb = require('../../models');

exports.setPassword = async (req, res, next) => {
      try {
            const isMerchant = await myDb.merchant.findOne({
                  where: {
                        MerchantId: req.decoded.MerchantId
                  }
            })
            if(!isMerchant){
                  return res.status(422).json({
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
                  message: "merchant password inserted"
            })
      }
      catch (err) {
            next(err);
      }
}