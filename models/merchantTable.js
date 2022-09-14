module.exports = (myDb, DataTypes) => {
      let merchant = myDb.define("merchant", {
            MerchantId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true

            },
            email: {
                  type: DataTypes.STRING,
            },
            ownerName: {
                  type: DataTypes.STRING,
                  allowNull: false
            },
            companyName: DataTypes.STRING,
            contact: {
                  type: DataTypes.BIGINT(10),
                  allowNull: false
            },
            address: {
                  type: DataTypes.STRING,
            },
            gstNumber: {
                  type: DataTypes.STRING,
                  uniqueKey: true
            },
            status: {
                  type: DataTypes.INTEGER,
                  defaultValue: 0
            },
            password: {
                  type: DataTypes.STRING,
            }
      })
      return merchant;
}