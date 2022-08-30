const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const myDb = require('../../models');

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
                  return res.status(201).json({
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
            res.status(201).json({
                  message: "Admin data inserted successfully",
            })
      }


      catch (err) {
            next(err);
      }
}