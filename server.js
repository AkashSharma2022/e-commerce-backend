const express = require('express');
const app = express();
port = 8080;
require('./models');
require('./models/usersTable');
require('./controller/razorpay/razorpay.controller')
const routerReg = require('./router/routes');
const bodyParser = require('body-parser');

app.use(
      bodyParser.urlencoded({
            extended: false,
      })
);


app.get('/', (req, res) => {
      res.send('Home page')
})




//swagger..........................................................................

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require('./router/routes');


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
      swaggerDefinition: {
            info: {
                  version: "1.0.0",
                  title: "Customer API",
                  description: "Customer API Information",
                  contact: {
                        name: "Amazing Developer"
                  },
                  servers: ["http://localhost:8080"]
            }
      },
      // ['.routes/*.js']
      apis: ['/home/user/ecommerce/server.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /customers:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/customers", (req, res) => {
      res.status(200).send("Customer results");
});

/**
 * @swagger
 * /customers:
 *    put:
 *      description: Use to return all customers
 *    parameters:
 *      - name: customer
 *        in: query
 *        description: Name of our customer
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
router.put("/customer", (req, res) => {
      res.status(200).send("Successfully updated customer");
});

/**
 * @swagger
 * /sendOtp:
 *    post:
 *      description: Use to send otp to user
 *    parameters:
 *      - name: name
 *      - email: test123@gmail.com
 *        in: email
 *        description: email 
 *        required: false
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '201':
 *        description: Successfully created user
 */
router.post("/sendOtp", (req, res) => {
      res.status(200).send("send otp to user");
});




app.listen(port, () => {
      console.log(`app is listening at port ${port}`);
})




app.use(routerReg);