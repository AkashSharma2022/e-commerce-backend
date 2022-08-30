const myDb = require("../../models");

exports.addUserAddress = async (req, res, next) => {
      try {
            const isUser = req.decoded.UserId;
            
            if(!isUser){
                  return res.status(422).json({
                        message: "You are not an user"
                  })
            }
            const step = await myDb.users.findAll({
                  where: {
                        UserId: [req.decoded.UserId]
                  }
            });

            console.log(req.decoded.UserId);

            if (step[0].step == 0) {
                  return res.status(422).json({
                        message: "You have completed your profile",
                  });
            }
            if (step[0].step == 1) {
                  await myDb.address.create(
                        {
                              address: req.body.address,
                              city: req.body.city,
                              pincode: req.body.pincode,
                              state: req.body.state,
                              Userid: req.decoded.UserId
                        });
                  return res.status(201).json({
                        message: "Address insertd successfully.",
                  });
            } else {
                  return res.status(422).json({
                        message: "You have already completed this step ",
                  });
            }
      } catch (err) {
            next(err.message);
      }
}