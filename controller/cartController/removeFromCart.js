const myDb = require("../../models")

exports.removeFromCart = async (req, res, next) => {
      try {
            const delcart = await myDb.addToCart.destroy({
                  where: {
                        CartId: req.params.CartId
                  }
            })
            if (delcart) {
                  return res.status(200).json({
                        message: "Removed From Cart"
                  })
            } else {
                  return res.json({
                        message: "invalid CartId"
                  })
            }
      } catch (err) {
            next(err)
      }
}