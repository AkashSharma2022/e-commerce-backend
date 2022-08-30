module.exports = (mydb, DataTypes) => {
      let admin = mydb.define("admin", {
            AdminId : {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true
            },
            email: {
                  type: DataTypes.STRING,
            },
            Name: DataTypes.STRING,
            contact: {
                  type: DataTypes.BIGINT(10),
                  allowNull: false
            },
            password: {
                  type: DataTypes.STRING,
            }
      })
      return admin
}