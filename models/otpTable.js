module.exports = (myDb, DataTypes) => {
      let OTP = myDb.define("OTP", {
            otp: {
                  type: DataTypes.STRING
            },
            email: {
                  type: DataTypes.STRING
            }

      })
      return OTP;
}


