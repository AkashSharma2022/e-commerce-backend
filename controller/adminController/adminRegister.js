const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const myDb = require('../../models');
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.adminReg = async (req, res, next) => {

      try {
            const email = await myDb.admin.findAll({
                  where: {
                        [Op.or]:
                              [{ email: [req.body.email] },
                              { contact: req.body.contact }]
                  }
            });
            if (email.length != 0) {
                  return res.status(409).json({
                        status: 'CONFLICT',
                        StatusCodes
: StatusCodes
.CONFLICT,
                        message: "The details already in use",
                  });
            }
            const adminPass = await bcrypt.hash(req.body.password, 12);

            myDb.admin.create(
                  {
                        email: req.body.email,
                        Name: req.body.name,
                        contact: req.body.contact,
                        password: adminPass
                  }
            );
            res.status(200).json({
                  status: "OK",
                  StatusCodes
: StatusCodes
.OK,
                  message: "Admin data inserted successfully",
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