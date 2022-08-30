
module.exports = (myDb, DataTypes) => {
      let address = myDb.define("address", {
            address: DataTypes.STRING,
            city: DataTypes.STRING,
            state: DataTypes.STRING,
            pincode: DataTypes.INTEGER
      })
      return address;
      
}