const { Op } = require("sequelize")
const myDb = require("../models")
const { StatusCodes
, ReasonPhrases }  = require('http-status-codes');


exports.searchProduct = async (req, res, next) => {
      try {

            let key = req.params.key;

            attributes = {
                  exclude: ['ProductId', 'createdAt', 'updatedAt',
                        'CategoryId', 'Sub_categoryId', 'MerchantId']
            }
            console.log(key);
            const data = await myDb.product.findAll({
                  where: {
                        [Op.or]: [{ productName: { [Op.regexp]: key } },
                        {
                              productDescription: { [Op.regexp]: key }
                        }]
                  }, attributes, include:
                        [{ model: myDb.category, attributes },
                        { model: myDb.sub_category, attributes }]

            })

            if (data.length) {
                  return res.status(200).json({
                        status: "OK",
                        StatusCodes
: StatusCodes
.OK,
                        message: "Searched product",
                        details: data
                  })
            }
            else {
                  return res.status(404).json({
                        status: "NOT_FOUND",
                        StatusCodes
: StatusCodes
.NOT_FOUND,
                        message: "not find anything"
                  })
            }
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
                  })
      }
}

















// const { Op } = require("sequelize")
// const myDb = require("../models")

// exports.searchProduct = async (req, res, next) => {
//       try {
//             let arrayOfCatId = [];
//             let arrayOfSubCatId = [];
//             let key = req.params.key;

//             console.log(key);

//             let attributes = {
//                   exclude: ['id', 'stocks', 'productStatus',
//                         'productStatus', 'createdAt', 'updatedAt',
//                         'categoryId', 'sub_categoryId', 'merchantId']
//             }

//             const data1 = await myDb.product.findAll({
//                   where: {
//                         [Op.or]: [{ productName: { [Op.regexp]: key } },
//                         {
//                               productDescription: { [Op.regexp]: key }
//                         }]
//                   }, attributes
//             })

//             const Catdata = await myDb.category.findAll({
//                   where: { category: { [Op.regexp]: key } }
//             })

//             for (let v of Catdata) {
//                   arrayOfCatId.push(v.id)
//             }

//             const data2 = await myDb.product.findAll({
//                   where: {
//                         categoryId: { [Op.in]: arrayOfCatId }
//                   }, attributes
//             })

//             const subCatdata = await myDb.sub_category.findAll({
//                   where: { sub_category: { [Op.regexp]: key } }
//             })

//             for (let z of subCatdata) {
//                   arrayOfSubCatId.push(z.dataValues.id)
//             }

//             const data3 = await myDb.product.findAll({
//                   where: {
//                         sub_categoryId: { [Op.in]: arrayOfSubCatId }
//                   }, attributes
//             })

//             let data = data1.concat(data2, data3);

//             let result = data.reduce((unique, o) => {
//                   if (!unique.some(obj => obj.id === o.id)) {
//                         unique.push(o);
//                   }
//                   return unique;
//             }, []);

//             if (result.length) {
//                   return res.status(200).json({
//                         message: "product searched",
//                         Details: result
//                   })
//             } else {
//                   return res.status(422).json({
//                         message: "Not find anything"
//                   })
//             }

//       } catch (error) {
//             next(error + error.message)
//       }
// }