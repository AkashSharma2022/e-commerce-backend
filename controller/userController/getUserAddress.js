const myDb = require("../../models");
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.getUserAddress = async (req, res, next) => {
      try {
            const isUser = req.decoded.UserId;
            
            if(!isUser){
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
: StatusCodes
.UNAUTHORIZED,
                        message: "You are not an user"
                  })
            }
            const address = await myDb.address.findAll({
                  where: {
                        UserId: [req.decoded.UserId]
                  }, attributes: {exclude: ['id', 'createdAt', 'updatedAt', 'Userid']}
            });
            return res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "Your all addresses ",
                  Details: address
            });

      } catch (error) {
            next(error.message);
      }
}