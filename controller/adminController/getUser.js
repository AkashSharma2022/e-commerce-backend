const myDb = require("../../models");

exports.getUsers = async (req, res, next) => {

      try {
            const isAdmin = req.decoded.AdminId;

            if (!isAdmin) {
                  return res.status(422).json({
                        message: "you are not an admin",
                  });
            }
            let offset = (req.params.page - 1) * 10;
            const row = await myDb.users.findAll({
                  limit: 10, offset: offset, 
                  attributes: {
                      exclude:  ['UserId', 'userType', 'password', 'createdAt', 'updatedAt']
                  }
            });

            return res.status(200).json({
                  message: "All users details",
                  Details: row
            })
      }
      catch (err) {
            next(err);
      }
}