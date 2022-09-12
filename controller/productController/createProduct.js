const myDb = require("../../models");
const { StatusCodes
      , ReasonPhrases } = require('http-status-codes');


exports.createProduct = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
                              : StatusCodes
                                    .UNAUTHORIZED,
                        message: "you are not a merchant"
                  })
            }

            const originalPrice = req.body.originalPrice;
            const discountPercent = req.body.discountPercent;
            const MerchantId = req.decoded.MerchantId;

            const CategoryId = req.body.CategoryId;
            const checkCatId = await myDb.category.findAll({
                  where: {
                        CategoryId: CategoryId
                  }, raw: true
            })
            if (checkCatId.length == 0) {
                  return res.status(404).json({
                        status: "NOT_FOUND",
                        StatusCodes
                              : StatusCodes
                                    .NOT_FOUND,
                        message: "category not found plese generate category"
                  })
            }
            const Sub_categoryId = req.body.Sub_categoryId;
            const checkSubCatId = await myDb.sub_category.findAll({
                  where: {
                        Sub_categoryId: Sub_categoryId
                  }, raw: true
            })
            console.log(checkSubCatId.length);
            if (checkSubCatId.length == 0) {
                  return res.status(404).json({
                        status: "NOT_FOUND",
                        StatusCodes
                              : StatusCodes
                                    .NOT_FOUND,
                        message: "sub category not found plese generate category"
                  })
            }
            const name = req.body.productName;
            const obj = {
                  productName: name,
                  CategoryId: CategoryId,
                  Sub_categoryId: Sub_categoryId
            }
            const checkProduct = await myDb.product.findAll({
                  where: obj
                  , raw: true
            })
            if (checkProduct.length != 0) {
                  return res.status(409).json({
                        status: "CONFLICT",
                        StatusCodes
                              : StatusCodes
                                    .CONFLICT,
                        message: "product already exists"
                  })
            }

            const productData = await myDb.product.create({
                  productName: req.body.productName,
                  productPrice: originalPrice - (originalPrice * discountPercent) / 100,
                  originalPrice: originalPrice,
                  discountPercent: discountPercent,
                  productDescription: req.body.productDescription,
                  stocks: req.body.stocks,
                  CategoryId: CategoryId,
                  Sub_categoryId: Sub_categoryId,
                  MerchantId: MerchantId,
                  HSNCode: req.body.HSNCode
            })

            return res.status(200).json({
                  status: "OK",
                  StatusCodes
                        : StatusCodes
                              .OK,
                  message: "Product insertd successfully.",
            });
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

exports.createCategory = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
                              : StatusCodes
                                    .UNAUTHORIZED,
                        message: "you are not a merchant"
                  })
            }
            const findCategory = await myDb.category.findAll({
                  where: {
                        category: req.body.category
                  }, raw: true
            })
            if (findCategory.length != 0) {
                  return res.status(409).json({
                        status: "CONFLICT",
                        StatusCodes
                              : StatusCodes
                                    .CONFLICT,
                        message: "category already exists"
                  })
            }
            const catID = await myDb.category.create({
                  category: req.body.category
            });
            return res.status(200).json({
                  status: "OK",
                  StatusCodes
                        : StatusCodes
                              .OK,
                  message: "category inserted",
                  details: catID.category
            })
      } catch (error) {
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

exports.createSubCategory = async (req, res, next) => {
      try {
            if (!req.decoded.MerchantId) {
                  return res.status(401).json({
                        status: "UNAUTHORIZED",
                        StatusCodes
                              : StatusCodes
                                    .UNAUTHORIZED,
                        message: "you are not a merchant"
                  })
            }
            const findSubCategory = await myDb.sub_category.findAll({
                  where: {
                        sub_category: req.body.sub_category
                  }
            })
            if (findSubCategory.length != 0) {
                  return res.status(409).json({
                        status: "CONFLICT",
                        StatusCodes
                              : StatusCodes
                                    .CONFLICT,
                        message: "sub category already exists"
                  })
            }

            const subCatID = await myDb.sub_category.create({
                  sub_category: req.body.sub_category,
                  CategoryId: req.body.CategoryId
            });
            return res.status(200).json({
                  status: "OK",
                  StatusCodes
                        : StatusCodes
                              .OK,
                  message: "Sub category inserted",
                  details: subCatID.category
            })
      } catch (error) {
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