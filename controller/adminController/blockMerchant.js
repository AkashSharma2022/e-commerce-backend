const myDb = require("../../models")

exports.blockMerchant = async (req, res, next) => {
      try {
            if (!req.decoded.AdminId) {
                  return res.status(422).json({
                        message: "you are not an Admin"
                  })
            };

            const merchantStatus = await myDb.merchant.findOne({
                  where: {
                        MerchantId: req.params.id
                  }
            })
            if (merchantStatus.status == -1) {
                  return res.status(422).json({
                        message: "Merchant already blocked"
                  })
            }
            await myDb.merchant.update({ status: -1 },
                  {
                        where: {
                              MerchantId: req.params.id
                        }
                  })

            return res.status(200).json({
                  message: "Merchant has been blocked"
            })
      } catch (err) {
            next(err);
      }
}