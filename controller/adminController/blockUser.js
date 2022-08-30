const myDb = require("../../models")

exports.blockUser = async (req, res, next) => {
      try {
            if (!req.decoded.AdminId) {
                  return res.status(422).json({
                        message: "you are not an Admin"
                  })
            };

            const userStatus = await myDb.users.findOne({
                  where: {
                        UserId: req.params.id
                  }
            })
            if (userStatus.status == -1) {
                  return res.status(422).json({
                        message: "User already blocked"
                  })
            }
            await myDb.users.update({ status: -1 },
                  {
                        where: {
                              UserId: req.params.id
                        }
                  })

            return res.status(200).json({
                  message: "User has been blocked"
            })
      } catch (err) {
            next(err);
      }
}