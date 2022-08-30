const myDb = require("../../models");

exports.getMerchants = async (req, res, next) => {
      try {
            const isAdmin = req.decoded.AdminId;

            if (!isAdmin) {
                  return res.status(422).json({
                        message: "you are not an Admin"
                  })
            }
          
            let offset = (req.params.page - 1) * 10;

            const row = await myDb.merchant.findAll({
                  limit: 10, offset: offset,

                  // for delete password filed in the output
                  attributes: { exclude: ['password', 'MerchantId', 'createdAt', 'updatedAt'] }
            });

            return res.status(200).json({
                  message: "All merchants details",
                  Details: row
            })
      } catch (err) {
            next(err);
      }
}