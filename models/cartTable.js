module.exports = (mydb, DataTypes) => {
      let addToCart = mydb.define("addToCart", {
            CartId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true
            },
            productName: DataTypes.STRING,
            price: DataTypes.INTEGER,
            quantity: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1,
            },
            totalAmount: DataTypes.INTEGER,
            status: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1
            }
      })
      return addToCart
}