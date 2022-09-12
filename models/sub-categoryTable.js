module.exports = (myDb, DataTypes) => {
      let sub_category = myDb.define("sub_category", {
            sub_category: DataTypes.STRING,
            Sub_categoryId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true

            }
      })
      return sub_category;

}