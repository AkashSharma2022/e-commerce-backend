module.exports = (myDb, DataTypes) => {
      let product = myDb.define("product", {
            ProductId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true

            },
            productName: DataTypes.STRING,
            productPrice: DataTypes.DECIMAL(10, 2),
            discountPercent: DataTypes.DECIMAL(10, 2),
            originalPrice: DataTypes.DECIMAL(10, 2),
            productDescription: DataTypes.STRING,
            stocks: DataTypes.INTEGER,
            productStatus: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1
            },
            HSNCode: DataTypes.INTEGER
      })
      return product;

}