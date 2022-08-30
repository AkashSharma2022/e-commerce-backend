const myDb = require("../../models");

exports.createProduct = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(422).json({
                        message: "you are not a merchant"
                  })
            }
            const catID = await myDb.category.findOrCreate(
                  {
                        where: {
                              category: req.body.category
                        }
                  });
            // console.log(catID[0].CategoryId);

            const subCat = {
                  ub_category: req.body.ub_category,
                  CategoryId: catID[0].CategoryId
            }

            const subCatID = await myDb.sub_category.findOrCreate({
                  where: subCat
            })
            console.log(req.decoded.MerchantId, "1111111111111111111111111111");
            const products = {
                  productName: req.body.productName,
                  productPrice: req.body.productPrice,
                  productDescription: req.body.productDescription,
                  stocks: req.body.stocks,
                  CategoryId: catID[0].CategoryId,
                  Sub_categoryId: subCatID[0].Sub_categoryId,
                  MerchantId: req.decoded.MerchantId
            }
            // console.log(products.productDescription);
            await myDb.product.findOrCreate({
                  where: products
            })

            return res.status(201).json({
                  message: "Product insertd successfully.",
            });
      }
      catch (err) {
            next(err);
      }
}