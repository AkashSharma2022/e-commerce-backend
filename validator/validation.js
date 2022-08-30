const Joi = require("joi");

const validationS1 = (req, res, next) => {
      const schema = Joi.object().keys({

            email: Joi.string().required().email({
                  minDomainSegments: 2,
                  tlds: { allow: ["com", "in"] }
            }),

            password: Joi.string().required(),
            contact: Joi.number().required(),
            age: Joi.number().required(),
            name: Joi.string()

      })
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
            res.status(200).json(error.message);
            console.log(error);
      }
      else {
            console.log("next");
            next();
      }
}
const validationS2 = (req, res, next) => {
      const schema = Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().required()
      })
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
            res.status(200).json(error.message);
            console.log(error);
      }
      else {
            console.log("next");
            next();
      }
}
const validationMerchant = (req, res, next) => {
      const schema = Joi.object().keys({
            email: Joi.string().required().email({
                  minDomainSegments: 2,
                  tlds: { allow: ["com", "in"] }
            }),

            contact: Joi.number().required(),
            ownerName: Joi.string().required(),
            address: Joi.string().required(),
            gstNumber: Joi.string().required(),
            companyName: Joi.string().required()
      })
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
            res.status(200).json(error.message);
            console.log(error);
      }
      else {
            console.log("next");
            next();
      }
}

const validationAddres = (req, res, next) => {
      const schema = Joi.object().keys({

            pincode: Joi.number().required(),
            city: Joi.string().required(),
            address: Joi.string().required(),
            state: Joi.string().required()
      })
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
            res.status(200).json(error.message);
            console.log(error);
      }
      else {
            console.log("next");
            next();
      }
}

const loginMerchant = (req, res, next) => {
      const schema = Joi.object().keys({

            email: Joi.string().required().email({
                  minDomainSegments: 2,
                  tlds: { allow: ["com", "in"] }
            }),

            password: Joi.string().required()

      })
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
            res.status(200).json(error.message);
            console.log(error);
      }
      else {
            console.log("next");
            next();
      }
}

const validateOtp = (req, res, next) => {
      const schema = Joi.object().keys({
            giveotp: Joi.number().required()
      })
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
            res.status(200).json(error.message);
            console.log(error);
      }
      else {
            console.log("next");
            next();
      }
}
const updateProductValid = (req, res, next) => {
      const schema = Joi.object().keys({
            stocks: Joi.number(),
            productPrice: Joi.number()
      })
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error) {
            res.status(200).json(error.message);
            console.log(error);
      }
      else {
            console.log("next");
            next();
      }
}

module.exports = {
      validationS1,
      validationS2,
      validationMerchant,
      validationAddres,
      loginMerchant,
      validateOtp,
      updateProductValid
};