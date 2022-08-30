const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('ecommerce', 'root', 'root', {
      host: 'localhost',
      dialect: 'mysql',
      logging: false
});

sequelize.authenticate()
      .then(() => {
            console.log("connected!");
      }).catch(err => {
            console.log("error" + err);
      });

const myDb = {};
myDb.Sequelize = Sequelize;
myDb.sequelize = sequelize;

myDb.users = require('./usersTable')(sequelize, DataTypes);
myDb.address = require('./addressTable')(sequelize, DataTypes);
myDb.otpTable = require('./otpTable')(sequelize, DataTypes);
myDb.merchant = require('./merchantTable')(sequelize, DataTypes);
myDb.admin = require('./adminTable')(sequelize, DataTypes);
myDb.category = require('./categoryTable')(sequelize, DataTypes);
myDb.sub_category = require('./sub-categoryTable')(sequelize, DataTypes);
myDb.product = require('./productTable')(sequelize, DataTypes);
myDb.order = require('./orderTable')(sequelize, DataTypes);
myDb.addToCart = require('./cartTable')(sequelize, DataTypes);
myDb.orderItem = require('./order-items')(sequelize, DataTypes);



myDb.sequelize.sync({ force: false })
      .then(() => {
            console.log("yes re-sync");
      })

myDb.users.hasMany(myDb.address, {
      foreignKey: 'Userid'
});
myDb.address.belongsTo(myDb.users, {
      foreignKey: 'Userid'
});



myDb.category.hasMany(myDb.sub_category, {
      foreignKey: 'CategoryId'
});
myDb.sub_category.belongsTo(myDb.category, {
      foreignKey: 'CategoryId'
});



myDb.category.hasMany(myDb.product, {
      foreignKey: 'CategoryId'
});
myDb.product.belongsTo(myDb.category, {
      foreignKey: 'CategoryId'
})



myDb.sub_category.hasMany(myDb.product, {
      foreignKey: 'Sub_categoryId'
});

myDb.product.belongsTo(myDb.sub_category, {
      foreignKey: 'Sub_categoryId'
})



myDb.merchant.hasMany(myDb.product, {
      foreignKey: 'MerchantId'
});
myDb.product.belongsTo(myDb.merchant, {
      foreignKey: 'MerchantId'
})



myDb.users.hasMany(myDb.orderItem, {
      foreignKey: "UserId"
})
myDb.orderItem.belongsTo(myDb.users, {
      foreignKey: "UserId"
})



myDb.product.hasMany(myDb.orderItem, {
      foreignKey: "ProductId"
})
myDb.orderItem.belongsTo(myDb.product, {
      foreignKey: "ProductId"
})



myDb.merchant.hasMany(myDb.orderItem, {
      foreignKey: "MerchantId"
})
myDb.orderItem.belongsTo(myDb.merchant, {
      foreignKey: "MerchantId"
})



myDb.users.hasMany(myDb.addToCart, { foreignKey: "UserId" })
myDb.addToCart.belongsTo(myDb.users, { foreignKey: "UserId" })
myDb.product.hasMany(myDb.addToCart, { foreignKey: "ProductId" })
myDb.addToCart.belongsTo(myDb.product, { foreignKey: "ProductId" })

myDb.order.hasMany(myDb.orderItem, { foreignKey: "OrderId" })
myDb.orderItem.belongsTo(myDb.order, { foreignKey: "OrderId" })
myDb.users.hasMany(myDb.order, { foreignKey: "UserId" })
myDb.order.belongsTo(myDb.users, { foreignKey: "UserId" })

module.exports = myDb;