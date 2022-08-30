const myDb = require("../../models");

exports.getUserAddress = async (req, res, next) => {
      try {
            const isUser = req.decoded.UserId;
            
            if(!isUser){
                  return res.status(422).json({
                        message: "You are not an user"
                  })
            }
            const address = await myDb.address.findAll({
                  where: {
                        UserId: [req.decoded.UserId]
                  }, attributes: {exclude: ['id', 'createdAt', 'updatedAt', 'Userid']}
            });
            return res.status(200).json({
                  message: "Your all addresses ",
                  Details: address
            });

      } catch (err) {
            next(err.message);
      }
}