module.exports = (myDb, DataTypes) => {
      let category = myDb.define("category", {
            category: DataTypes.STRING,
            CategoryId : {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true
            }
      })
      return category;

}