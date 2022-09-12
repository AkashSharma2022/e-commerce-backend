module.exports = (mydb, DataTypes) => {
      let addToCart = mydb.define("addToCart", {
            CartId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true
            },
            productName: DataTypes.STRING,
            price: DataTypes.STRING,
            discountPercent: DataTypes.DECIMAL(10, 2),
            quantity: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1,
            },
            totalAmount: DataTypes.DECIMAL(10, 2),
            status: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1
            }
      })
      return addToCart
}