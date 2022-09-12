const myDb = require("../../models");

exports.addTocartInBulk = async (req, res, next) => {

      try {

            let user_cart = [];
            let pro_count = 0;
            const cat_ids = await myDb.category.findAll({ raw: true })
            const merchant_ids = await myDb.merchant.findAll({ raw: true })
            for (const Melement of merchant_ids) {
                  for (const Celement of cat_ids) {
                        let produ = await myDb.product.findAll({ where: { CategoryId: Celement.CategoryId, MerchantId: Melement.MerchantId }, raw: true })
                        // console.log(produ);
                        console.log(produ);
                        for (let i = 0; i < 2; i++) {
                              let randNum = Math.floor(Math.random() * 9) + 1;
                              console.log("gggggggggggg");
                              const newCartItem = {
                                    productName: produ[randNum].name,
                                    UserId: req.decoded.UserId,
                                    ProductId: produ[randNum].id,
                                    price: produ[randNum].productPrice,
                                    quantity: 2,
                                    totalAmount: price * quantity,
                                    discountPercent: produ[randNum].discountPercent,
                              }
                              user_cart[pro_count++] = newCartItem;
                        }
                  };
            };
            await myDb.addToCart.bulkCreate(user_cart)
                  .then((created) => {
                        res.status(202).json({ success: true, status_code: '202', response: { message: 'created', data: created } })
                  })
                  .catch((err) => {
                        console.log(err);
                        res.status(500).json({ success: false, status_code: '500', response: { message: 'Internal Server Error' } })
                  })
      } catch (err) {
            res.status(500).json({ success: false, status_code: '500', response: { message: 'Internal Server Error' } })
      }
}






exports.addProductInBulk = async (req, res, next) => {

      try {
            const categoryId = await myDb.sub_category.findAll({ raw: true });
            const merchantId = await myDb.merchant.findAll({ raw: true });

            console.log(categoryId[0], "11111111");
            console.log(categoryId[1], "22222222222");
            console.log(categoryId[2], "333333333");
            let count = 0;
            let productData1 = {
                  productName: `category1 ${111}`,
                  productPrice: "90",
                  productDescription: "xyz",
                  stocks: "20",
                  discountPercent: "10",
                  originalPrice: "100",
                  HSNCode: "1000",
                  CategoryId: categoryId[0].CategoryId,
                  Sub_categoryId: categoryId[0].Sub_categoryId,
                  MerchantId: merchantId[9].MerchantId
            }

            let productData2 = {
                  productName: `category2 ${111}`,
                  productPrice: "90",
                  productDescription: "xyz",
                  stocks: "20",
                  discountPercent: "10",
                  originalPrice: "100",
                  HSNCode: "1000",
                  CategoryId: categoryId[1].CategoryId,
                  Sub_categoryId: categoryId[1].Sub_categoryId,
                  MerchantId: merchantId[9].MerchantId
            }

            let productData3 = {
                  productName: `category3 ${111}`,
                  productPrice: "90",
                  productDescription: "xyz",
                  stocks: "20",
                  discountPercent: "10",
                  originalPrice: "100",
                  HSNCode: "1000",
                  CategoryId: categoryId[2].CategoryId,
                  Sub_categoryId: categoryId[2].Sub_categoryId,
                  MerchantId: merchantId[9].MerchantId
            }


            let index = 10;

            while (index != 0) {
                  await myDb.product.bulkCreate([
                        productData1,
                        productData2,
                        productData3
                  ])
                  index--;
            }




            return res.json({
                  message: "data"
            })

      } catch (error) {
            next(error);
      }
}