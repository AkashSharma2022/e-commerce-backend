module.exports = (mydb, DataTypes) => {
      let orderItems = mydb.define("orderIems", {
            orderItemsId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true
            },
            quantity: DataTypes.INTEGER,
            productName: DataTypes.STRING,
            price: DataTypes.DECIMAL(10, 2),
            totalAmount: DataTypes.INTEGER,
      })
      return orderItems
}