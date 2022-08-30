module.exports = (myDb, DataTypes) => {
      let product = myDb.define("product", {
            ProductId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true

            },
            productName: DataTypes.STRING,
            productPrice: DataTypes.INTEGER,
            productDescription: DataTypes.STRING,
            stocks: DataTypes.INTEGER,
            productStatus: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1
            }
      })
      return product;

}