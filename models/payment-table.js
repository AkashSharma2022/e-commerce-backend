module.exports = (myDb, DataTypes) => {
      let paymentDetails = myDb.define("paymentDetails", {
            PaymentDetailId: {
                  type: DataTypes.UUID,
                  defaultValue: DataTypes.UUIDV4,
                  primaryKey: true

            },
            transactionId: DataTypes.STRING,
            paymentStatus: DataTypes.BOOLEAN,
      })
      return paymentDetails;

}