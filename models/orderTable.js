module.exports = (mydb, DataTypes) => {
      let order = mydb.define("order", {
            OrderId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,// Or DataTypes.UUIDV1,
                  primaryKey: true
            },
            address: {
                  type: DataTypes.STRING,
                  allowNull: false
            },
            userName: DataTypes.STRING,
            TotalPayableAmount: DataTypes.INTEGER,
            status: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1
            },
            shippingCharge: {
                  type: DataTypes.INTEGER,
                  defaultValue: 0
            }
      })
      return order
}