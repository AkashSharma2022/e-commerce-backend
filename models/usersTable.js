
module.exports = (myDb, DataTypes) => {
      let Users = myDb.define("users", {
            UserId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true

            },
            email: {
                  type: DataTypes.STRING,
                  uniquekey: true,
                  allowNull: false,
                  validate: {
                        isEmail: { msg: "It must be a valid email address" }
                  }
            },
            name: {
                  type: DataTypes.STRING,
            },
            contact: {
                  type: DataTypes.BIGINT(10),
            },
            age: {
                  type: DataTypes.INTEGER(3),
            },
            status: {
                  type: DataTypes.INTEGER,
                  defaultValue: 0
            },
            step: {
                  type: DataTypes.INTEGER,
                  defaultValue: 1
            },
            userType: {
                  type: DataTypes.STRING,
                  defaultValue: 'user'
            },
            password: {
                  type: DataTypes.STRING,
                  allowNull: false,
                  min: {
                        args: 4,
                        msg: "Minimum 4 characters required in password"
                  }
            }

      })
      return Users;
}





