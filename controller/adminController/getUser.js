const myDb = require("../../models");
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.getUsers = async (req, res, next) => {

      try {
            const isAdmin = req.decoded.AdminId;

            if (!isAdmin) {
                  return res.status(401).json({
                        status: 'UNAUTHORIZED',
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "you are not an admin",
                  });
            }
            let offset = (req.params.page - 1) * 10;
            const row = await myDb.users.findAll({
                  limit: 10, offset: offset,
                  attributes: {
                        exclude: ['UserId', 'userType', 'password', 'createdAt', 'updatedAt']
                  }
            });

            return res.status(200).json({
                  staus: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "All users details",
                  Details: row
            })
      }
      catch (error) {
            next(error);
            res.status(StatusCodes
.INTERNAL_SERVER_ERROR)
                  .send({
                        status: StatusCodes
.INTERNAL_SERVER_ERROR,
                        error: ReasonPhrases.INTERNAL_SERVER_ERROR,
                        response: error.message
,
                  });
      }
}