const myDb = require("../../models")

exports.getCart = async (req, res, next) => {
      try {
            const cart = await myDb.addToCart.findAll({
                  where: {
                        UserId: req.decoded.UserId
                  }, attributes: {exclude: ['CartId', 'status', 'createdAt', 'updatedAt', 'UserId', 'ProductId']}
            })
            return res.status(200).json({
                  message: "Your all products are here",
                  details: cart
            })
      } catch (error) {
            next(error)
      }
}